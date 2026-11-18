import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import type { EditStatusDto, Status } from './dto/edit-status.dto.js';
import { OrderEventsService } from '../order-events/order-events.service.js';
import { CreateOrderEventDto } from '../order-events/create-order-event.dto.js';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderEventsService: OrderEventsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Найти заказы по дате и статусу' })
  @ApiQuery({
    name: 'scheduledFrom',
    required: false,
    example: '2026-10-01T00:00:00.000Z',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['new', 'in_progress', 'closed'],
  })
  @ApiOkResponse({ description: 'Список заказов.' })
  findFilter(
    @Query('scheduledFrom') scheduledFrom?: string,
    @Query('status') status?: Status,
  ) {
    return this.ordersService.findFilter({ scheduledFrom, status });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить заказ' })
  @ApiParam({ name: 'id', type: Number, example: 15 })
  @ApiOkResponse({ description: 'Данные заказа.' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать заказ' })
  @ApiCreatedResponse({
    description: 'Заказ создан; событие created записано в журнал.',
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Изменить статус заказа' })
  @ApiParam({ name: 'id', type: Number, example: 15 })
  @ApiOkResponse({
    description: 'Статус изменён; событие записано, если статус изменился.',
  })
  editStatus(@Param('id') id: string, @Body() editStatusDto: EditStatusDto) {
    return this.ordersService.editStatus(+id, editStatusDto);
  }

  @Get('events/monthly')
  @ApiTags('События заказа')
  @ApiOperation({ summary: 'Посчитать события по типам за месяц' })
  @ApiQuery({
    name: 'month',
    required: true,
    example: '2026-10',
    description: 'Месяц в формате YYYY-MM.',
  })
  @ApiOkResponse({ description: 'Количество событий по каждому типу.' })
  @ApiBadRequestResponse({ description: 'Некорректный формат месяца.' })
  monthlyEventCounts(@Query('month') month: string) {
    return this.orderEventsService.countByTypeForMonth(month ?? '');
  }

  @Post(':id/close')
  @ApiOperation({ summary: 'Закрыть заказ' })
  @ApiParam({ name: 'id', type: Number, example: 15 })
  @ApiCreatedResponse({
    description: 'Заказ закрыт; событие смены статуса записано в журнал.',
  })
  @ApiNotFoundResponse({ description: 'Заказ не найден.' })
  close(@Param('id') id: string) {
    return this.ordersService.close(+id);
  }

  @Get(':id/events')
  @ApiTags('События заказа')
  @ApiOperation({ summary: 'Получить историю событий заказа' })
  @ApiParam({ name: 'id', type: Number, example: 15 })
  @ApiOkResponse({ description: 'События от новых к старым.' })
  @ApiNotFoundResponse({ description: 'Заказ не найден.' })
  events(@Param('id') id: string) {
    return this.orderEventsService.findForOrder(+id);
  }

  @Post(':id/events')
  @ApiTags('События заказа')
  @ApiOperation({ summary: 'Добавить комментарий или дефектный лист' })
  @ApiParam({ name: 'id', type: Number, example: 15 })
  @ApiCreatedResponse({ description: 'Событие добавлено.' })
  @ApiBadRequestResponse({
    description: 'Некорректный тип события или payload.',
  })
  @ApiNotFoundResponse({ description: 'Заказ не найден.' })
  createEvent(@Param('id') id: string, @Body() body: CreateOrderEventDto) {
    return this.orderEventsService.createForOrder(+id, body);
  }
}
