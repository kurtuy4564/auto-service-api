import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service.js';
import { CreateCarDto } from './dto/create-client.dto.js';

@ApiTags('Автомобили')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiOperation({ summary: 'Добавить автомобиль клиента' })
  @ApiCreatedResponse({ description: 'Автомобиль создан.' })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }
}
