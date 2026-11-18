import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { OrderEventsModule } from '../order-events/order-events.module.js';

@Module({
  imports: [OrderEventsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
