import {
  Controller,
  Post,
  Body,
    ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ClientsService } from './clients.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';

@ApiTags('Клиенты')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать клиента' })
  @ApiCreatedResponse({ description: 'Клиент создан.' })
  @ApiBadRequestResponse({ description: 'Не заполнены обязательные поля.' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }
}
