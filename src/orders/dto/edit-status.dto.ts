import { ApiProperty } from '@nestjs/swagger';

export class EditStatusDto {
  @ApiProperty({
    enum: ['new', 'in_progress', 'closed'],
    example: 'in_progress',
  })
  status: Status;
}

export type Status = 'new' | 'in_progress' | 'closed';
