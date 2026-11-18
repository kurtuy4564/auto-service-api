import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service.js';

@ApiTags('Система')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Проверить доступность API' })
  @ApiOkResponse({ description: 'API доступно.', type: String })
  getHello(): string {
    return this.appService.getHello();
  }
}
