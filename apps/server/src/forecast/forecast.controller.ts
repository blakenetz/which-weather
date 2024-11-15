import { CACHE_MANAGER, CacheKey } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { Forecast, ForecastFormBody } from '@server/types';
import { ForecastService } from './forecast.service';
import { AppService } from '@server/app.service';

@Controller('forecast')
@CacheKey('forecast')
export class ForecastController {
  constructor(
    private readonly forecastService: ForecastService,
    private readonly appService: AppService,
  ) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async findAll(@Body() body: ForecastFormBody): Promise<Forecast[]> {
    const empty = !Object.keys(body).every(Boolean);
    if (empty) {
      throw new HttpException('Incomplete', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    // check location data
    if (body.key && body.lat && body.long) {
      const cached = await this.appService.fetchFromCache<Forecast[]>(body.key);
      if (cached) return cached;

      throw new HttpException('Client Error', HttpStatus.SERVICE_UNAVAILABLE);
    }
    // check query
    if (body.q) {
    }
    // const cached = await this.cacheManager.get<WeatherLocation[]>(body.q);
    // if (cached) {
    //   console.log(`🌞 successfully fetched "${body.q}" from cache`);
    //   return cached;
    // }

    // const locations = await this.locationService.getLocations(body.q);
    // if (locations) {
    //   this.cacheManager.set(body.q, locations);
    //   return locations;
    // }

    throw new HttpException('Client Error', HttpStatus.SERVICE_UNAVAILABLE);
    // throw new HttpException('Unable to process results', HttpStatus.SERVICE_UNAVAILABLE);
  }
}
