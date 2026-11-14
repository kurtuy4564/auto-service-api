import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: createClientDto,
    });
  }
}
