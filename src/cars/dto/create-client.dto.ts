import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ example: 1 })
  clientId: number;

  @ApiProperty({ example: 'Toyota' })
  brand: string;

  @ApiProperty({ example: 'Camry' })
  model: string;

  @ApiProperty({ example: 'A123BC77' })
  plate: string;

  @ApiProperty({ example: 2022 })
  year: number;

  @ApiPropertyOptional({ example: 45000 })
  mileage?: number;
}
