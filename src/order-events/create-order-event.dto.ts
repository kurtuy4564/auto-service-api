import { OrderEventType } from './order-event.schema.js';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderEventDto {
  @ApiProperty({ enum: [OrderEventType.Comment, OrderEventType.Defect] })
  type: OrderEventType.Comment | OrderEventType.Defect;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    example: {
      items: [
        { part: 'тормозные колодки', wear: 0.8, photos: ['/files/a.jpg'] },
      ],
      mechanic: 'Иванов',
    },
  })
  payload: Record<string, unknown>;
}
