import {
  Controller,
  Get,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('live')
  async live() {
    return this.appService.getCurrentTvShows();
  }
}
