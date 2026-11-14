import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }
}
