import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Status } from './edit-status.dto.js';

export class CreateOrderPartDto {
  @ApiProperty({ example: 7 })
  id: number;

  @ApiProperty({ example: 2, description: 'Количество запчастей.' })
  stockQty: number;

  @ApiProperty({ example: 1250.5 })
  price: number;
}

export class CreateOrderServiceDto {
  @ApiProperty({ example: 4 })
  id: number;

  @ApiProperty({ example: 3500 })
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 1 })
  carId: number;

  @ApiProperty({ enum: ['new', 'in_progress', 'closed'], example: 'new' })
  status: Status;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2026-10-21T09:30:00.000Z',
  })
  scheduledAt: Date;

  @ApiPropertyOptional({ type: [CreateOrderPartDto] })
  part?: CreateOrderPartDto[];

  @ApiPropertyOptional({ type: [CreateOrderServiceDto] })
  services?: CreateOrderServiceDto[];
}
