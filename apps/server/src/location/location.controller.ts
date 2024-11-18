import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from '@server/app.service';
import { LocationFormBody, WeatherLocation } from '@server/types';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly appService: AppService,
  ) {}

  @Post()
  async findAll(@Body() body: LocationFormBody): Promise<WeatherLocation[]> {
    if (!body.q) {
      throw new HttpException('Incomplete', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const cached = await this.appService.fetchFromCache<WeatherLocation[]>(
      body.q,
    );
    if (cached) return cached;

    const locations = await this.locationService.getLocations(body);
    if (locations) {
      this.appService.setCache(body.q, locations);
      return locations;
    }

    throw new HttpException('Client Error', HttpStatus.SERVICE_UNAVAILABLE);
  }
}
