import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderEvent, OrderEventSchema } from './order-event.schema.js';
import { OrderEventsService } from './order-events.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderEvent.name, schema: OrderEventSchema },
    ]),
  ],
  providers: [OrderEventsService],
  exports: [OrderEventsService],
})
export class OrderEventsModule {}
