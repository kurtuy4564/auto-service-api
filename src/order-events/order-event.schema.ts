import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export enum OrderEventType {
  Created = 'created',
  StatusChanged = 'status_changed',
  Comment = 'comment',
  Defect = 'defect',
}

@Schema({ collection: 'order_events' })
export class OrderEvent {
  @Prop({ required: true })
  orderId!: number;

  @Prop({ required: true, enum: Object.values(OrderEventType) })
  type!: OrderEventType;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  payload!: Record<string, unknown>;

  @Prop({ required: true })
  at!: Date;
}

export const OrderEventSchema = SchemaFactory.createForClass(OrderEvent);

OrderEventSchema.index({ orderId: 1, at: -1 });
OrderEventSchema.index({ at: 1 }, { expireAfterSeconds: 63072000 });
