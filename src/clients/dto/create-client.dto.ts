import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Иван Иванов' })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  fullName: string;

  @ApiProperty({ example: '+79991234567' })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  phone: string;
}
