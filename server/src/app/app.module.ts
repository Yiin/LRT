import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AxiosProvider } from '../providers/axios';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AxiosProvider, AppService],
})
export class AppModule {}
