import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiCreatedResponse } from "@nestjs/swagger";

@ApiTags('health')
@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiCreatedResponse({
      description: 'Check if the application is running',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
