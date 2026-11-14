import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ReceivePartDto } from './dto/receive-part.dto.js';

@Injectable()
export class PartsService {
  constructor(private readonly prisma: PrismaService) {}

  async receive(id: number, { qty }: ReceivePartDto) {
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new BadRequestException('Part id must be a positive integer');
    }

    if (!Number.isSafeInteger(qty) || qty <= 0) {
      throw new BadRequestException('qty must be a positive integer');
    }

    return this.prisma.$transaction(async (tx) => {
      const result = await tx.part.updateMany({
        where: { id },
        data: { stockQty: { increment: qty } },
      });

      if (result.count === 0) {
        throw new NotFoundException(`Part ${id} not found`);
      }

      const stockMove = await tx.stockMove.create({
        data: { partId: id, qty },
      });

      const part = await tx.part.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          sku: true,
          name: true,
          stockQty: true,
        },
      });

      return { part, stockMove };
    });
  }
}
