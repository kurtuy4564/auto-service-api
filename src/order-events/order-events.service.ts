import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrderEventDto } from './create-order-event.dto.js';
import { OrderEvent, OrderEventType } from './order-event.schema.js';

type OrderEventDocument = HydratedDocument<OrderEvent>;

export interface OrderEventTypeCount {
  _id: OrderEventType;
  count: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isCreateOrderEventDto(value: unknown): value is CreateOrderEventDto {
  if (!isRecord(value) || !isRecord(value.payload)) {
    return false;
  }

  return (
    value.type === OrderEventType.Comment ||
    value.type === OrderEventType.Defect
  );
}

@Injectable()
export class OrderEventsService {
  constructor(
    @InjectModel(OrderEvent.name)
    private readonly orderEventModel: Model<OrderEventDocument>,
    private readonly prisma: PrismaService,
  ) {}

  async recordCreated(orderId: number, status: string) {
    return this.orderEventModel.create({
      orderId,
      type: OrderEventType.Created,
      payload: { status },
      at: new Date(),
    });
  }

  async recordStatusChanged(
    orderId: number,
    previousStatus: string,
    status: string,
  ) {
    return this.orderEventModel.create({
      orderId,
      type: OrderEventType.StatusChanged,
      payload: { from: previousStatus, to: status },
      at: new Date(),
    });
  }

  async createForOrder(orderId: number, body: unknown) {
    this.validateOrderId(orderId);
    if (!isCreateOrderEventDto(body)) {
      throw new BadRequestException(
        'Event type must be comment or defect, and payload must be an object.',
      );
    }

    await this.ensureOrderExists(orderId);

    return this.orderEventModel.create({
      orderId,
      type: body.type,
      payload: body.payload,
      at: new Date(),
    });
  }

  async findForOrder(orderId: number) {
    this.validateOrderId(orderId);
    await this.ensureOrderExists(orderId);

    return this.orderEventModel
      .find({ orderId })
      .sort({ at: -1, _id: -1 })
      .lean()
      .exec();
  }

  async countByTypeForMonth(month: string) {
    const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(month);
    if (!match || Number(match[1]) === 0) {
      throw new BadRequestException('month must use the YYYY-MM format.');
    }

    const year = Number(match[1]);
    const monthNumber = Number(match[2]);
    const start = new Date(Date.UTC(year, monthNumber - 1, 1));
    const end = new Date(Date.UTC(year, monthNumber, 1));

    return this.orderEventModel
      .aggregate<OrderEventTypeCount>([
        { $match: { at: { $gte: start, $lt: end } } },
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } },
      ])
      .exec();
  }

  private validateOrderId(orderId: number) {
    if (!Number.isSafeInteger(orderId) || orderId <= 0) {
      throw new BadRequestException('orderId must be a positive integer.');
    }
  }

  private async ensureOrderExists(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true },
    });

    if (!order) {
      throw new NotFoundException(`Order ${orderId} was not found.`);
    }
  }
}
