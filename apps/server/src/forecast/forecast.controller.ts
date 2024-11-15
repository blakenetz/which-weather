import { CACHE_MANAGER, CacheKey } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { Forecast } from '@server/types';
import { ForecastService } from './forecast.service';

@Controller('forecast')
@CacheKey('forecast')
export class ForecastController {
  constructor(
    private readonly locationService: ForecastService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async findAll(@Body() body: { q?: string }): Promise<Forecast[]> {
    if (!body.q) {
      throw new HttpException('Incomplete', HttpStatus.UNPROCESSABLE_ENTITY);
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
  }
}
