import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReceivePartDto } from './dto/receive-part.dto.js';
import { PartsService } from './parts.service.js';

@ApiTags('Запчасти')
@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post(':id/receive')
  @ApiOperation({ summary: 'Принять запчасти на склад' })
  @ApiParam({ name: 'id', type: Number, example: 3 })
  @ApiCreatedResponse({ description: 'Остаток запчасти увеличен.' })
  @ApiNotFoundResponse({ description: 'Запчасть не найдена.' })
  receive(
    @Param('id', ParseIntPipe) id: number,
    @Body() receivePartDto: ReceivePartDto,
  ) {
    return this.partsService.receive(id, receivePartDto);
  }
}
