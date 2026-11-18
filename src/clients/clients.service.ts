import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    if (!createClientDto.fullName || !createClientDto.phone) {
      throw new BadRequestException(
        'ФИО и телефон клиента должны быть заполнены',
      );
    }

    const phoneExists = await this.prisma.client.findUnique({
      where: { phone: createClientDto.phone },
    });

    if (phoneExists) {
      throw new ConflictException(
        'Клиент с таким номером телефона уже существует',
      );
    }

    return this.prisma.client.create({
      data: createClientDto,
    });
  }
}
