import { ApiProperty } from '@nestjs/swagger';

export class ReceivePartDto {
  @ApiProperty({ example: 5, minimum: 1 })
  qty: number;
}
