import { Controller, Post, Body, Patch, Param, Get, Query } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import type { EditStatusDto, Status } from './dto/edit-status.dto.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findFilter(
    @Query('scheduledFrom') scheduledFrom?: string,
    @Query('status') status?: Status,
  ) {
    return this.ordersService.findFilter({ scheduledFrom, status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id/status')
  editStatus(@Param('id') id: string, @Body() editStatusDto: EditStatusDto) {
    return this.ordersService.editStatus(+id, editStatusDto);
  }

  @Post(':id/close')
  close(@Param('id') id: string, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.close(+id, createOrderDto);
  }

  @Get(':id/events')
  events(@Param('id') id: string) {
    return this.ordersService.events(+id);
  }
}
