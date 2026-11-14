import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCarDto } from './dto/create-client.dto.js';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCarDto: CreateCarDto) {
    return this.prisma.car.create({
      data: createCarDto,
    });
  }
}
