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
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly appService: AppService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Fetch locations' })
  @ApiResponse({ status: 422, description: 'Incomplete body one Request' })
  @ApiResponse({ status: 503, description: '3rd party API is down' })
  @ApiOkResponse({
    description: 'The Location records',
    type: WeatherLocation,
    isArray: true,
  })
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
