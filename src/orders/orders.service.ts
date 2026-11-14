import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { EditStatusDto } from './dto/edit-status.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findFilter({
    scheduledFrom,
    status,
  }: {
    scheduledFrom?: string;
    status?: string;
  }) {
    const date = new Date(scheduledFrom || new Date());

    const where = {
      scheduledAt: { gte: date },
      status: status,
    };

    return this.prisma.order.findMany({ where });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        carId: true,
        status: true,
        scheduledAt: true,
      },
    });
  }

  async create(createOrderDto: CreateOrderDto) {
    return this.prisma.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          carId: createOrderDto.carId,
          status: createOrderDto.status,
          scheduledAt: createOrderDto.scheduledAt,
        },
        select: {
          id: true,
          carId: true,
          status: true,
        },
      });

      if (
        createOrderDto.part?.length !== 0 &&
        createOrderDto.part !== undefined
      ) {
        await prisma.orderPart.createMany({
          data: createOrderDto.part.map((part) => ({
            orderId: order.id,
            partId: part.id,
            qty: part.stockQty,
            price: part.price,
          })),
        });

        if (
          createOrderDto.services?.length !== 0 &&
          createOrderDto.services !== undefined
        ) {
          await prisma.orderService.createMany({
            data: createOrderDto.services.map((service) => ({
              orderId: order.id,
              serviceId: service.id,
              price: service.price,
            })),
          });
        }
      }

      return order;
    });
  }

  async close(id: number, createOrderDto: CreateOrderDto) {
    return this.prisma.$transaction(async (prisma) => {
      const order = await prisma.order.update({
        where: { id },
        data: { status: 'closed' },
      });

      const orderParts = await prisma.orderPart.findMany({
        where: { orderId: id },
      });

      const orderServices = await prisma.orderService.findMany({
        where: { orderId: id },
      });

      for (const part of orderParts) {
        const result = await prisma.part.updateMany({
          where: {
            id: part.partId,
            stockQty: {
              gte: part.qty,
            },
          },
          data: {
            stockQty: {
              decrement: part.qty,
            },
          },
        });

        if (result.count === 0) {
          throw new UnprocessableEntityException({
            message: 'Недостаточно запчастей на складе',
            shortages: result,
          });
        }
      }
    });
  }

  async editStatus(id: number, editStatusDto: EditStatusDto) {
    const res = this.prisma.order.update({
      where: { id },
      data: { status: editStatusDto.status },
      select: { id: true, status: true },
    });

    return res;
  }

  events(id: number) {
    return `This action returns events of a #${id} order`;
  }
}
