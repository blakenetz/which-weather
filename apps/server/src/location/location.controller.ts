import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CACHE_MANAGER, CacheKey } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { WeatherLocation } from '@server/types';
import { AppService } from '@server/app.service';

@Controller('location')
@CacheKey('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async findAll(@Body() body: { q?: string }): Promise<WeatherLocation[]> {
    if (!body.q) {
      throw new HttpException('Incomplete', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const cached = await this.appService.fetchFromCache<WeatherLocation[]>(
      body.q,
    );
    if (cached) return cached;

    const locations = await this.locationService.getLocations(body.q);
    if (locations) {
      this.cacheManager.set(body.q, locations);
      return locations;
    }

    throw new HttpException('Client Error', HttpStatus.SERVICE_UNAVAILABLE);
  }
}
