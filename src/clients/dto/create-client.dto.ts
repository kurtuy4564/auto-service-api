import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Иван Иванов' })
  fullName: string;

  @ApiProperty({ example: '+79991234567' })
  phone: string;
}
