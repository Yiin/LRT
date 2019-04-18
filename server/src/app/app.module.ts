import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AxiosProvider } from '../providers/axios';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 1,
    }),
  ],
  controllers: [AppController],
  providers: [AxiosProvider, AppService],
})
export class AppModule {}
