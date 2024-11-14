import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  findAll(@Body() body: { q?: string }): object {
    if (body.q) return this.locationService.getLocation(body.q);

    throw new HttpException('Incomplete', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
