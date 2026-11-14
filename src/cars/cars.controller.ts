import { Body, Controller, Post } from '@nestjs/common';
import { CarsService } from './cars.service.js';
import { CreateCarDto } from './dto/create-client.dto.js';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }
}
