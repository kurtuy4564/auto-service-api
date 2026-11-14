import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ClientsModule } from './clients/clients.module.js';
import { PrismaService } from './prisma/prisma.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CarsController } from './cars/cars.controller.js';
import { CarsModule } from './cars/cars.module.js';
import { OrdersModule } from './orders/orders.module.js';

@Module({
  imports: [ClientsModule, PrismaModule, CarsModule, OrdersModule],
  controllers: [AppController, CarsController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
