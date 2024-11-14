import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { ForecastController } from './forecast/forecast.controller';
import { ForecastService } from './forecast/forecast.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, LocationController, ForecastController],
  providers: [AppService, LocationService, ForecastService],
})
export class AppModule {}
