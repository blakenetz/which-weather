import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForecastController } from './forecast/forecast.controller';
import { ForecastService } from './forecast/forecast.service';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register(), HttpModule],
  controllers: [AppController, LocationController, ForecastController],
  providers: [AppService, LocationService, ForecastService],
})
export class AppModule {}
