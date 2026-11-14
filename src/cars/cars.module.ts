import { Module } from '@nestjs/common';
import { CarsService } from './cars.service.js';

@Module({
  providers: [CarsService]
})
export class CarsModule {}
