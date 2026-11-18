import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ClientsModule } from './clients/clients.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CarsModule } from './cars/cars.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { PartsModule } from './parts/parts.module.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.MONGODB_URL;
        if (!uri) {
          throw new Error(
            'MONGODB_URL is not set. Add it to the environment or the project root .env file.',
          );
        }

        return { uri };
      },
    }),
    ClientsModule,
    PrismaModule,
    CarsModule,
    OrdersModule,
    PartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
