import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReceivePartDto } from './dto/receive-part.dto.js';
import { PartsService } from './parts.service.js';

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post(':id/receive')
  receive(
    @Param('id', ParseIntPipe) id: number,
    @Body() receivePartDto: ReceivePartDto,
  ) {
    return this.partsService.receive(id, receivePartDto);
  }
}
