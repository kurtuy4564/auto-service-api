import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientsService } from './clients.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';

@ApiTags('Клиенты')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать клиента' })
  @ApiCreatedResponse({ description: 'Клиент создан.' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }
}
