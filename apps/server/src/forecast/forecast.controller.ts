import { CacheKey } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import {
  Forecast,
  ForecastClient,
  ForecastFormBody,
  ForecastResponseBody,
} from '@server/types';
import { ForecastService } from './forecast.service';
import { AppService } from '@server/app.service';
import { Response } from 'express';
import { LocationService } from '@server/location/location.service';

@Controller('forecast')
@CacheKey('forecast')
export class ForecastController {
  constructor(
    private readonly forecastService: ForecastService,
    private readonly locationService: LocationService,
    private readonly appService: AppService,
  ) {}

  @Post(':client')
  @UseInterceptors(NoFilesInterceptor())
  async find(
    @Body() body: ForecastFormBody,
    @Param() params: { client: ForecastClient },
  ): Promise<Forecast[] | null> {
    const empty = !Object.keys(body).every(Boolean);
    if (empty) {
      throw new HttpException('Incomplete', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (body.key) {
      const cacheKey = [body.key, params.client].join('-');
      const cached = await this.appService.fetchFromCache<Forecast[]>(cacheKey);
      if (cached) return cached;

      const data = await this.forecastService.fetchFromClient(
        params.client,
        body,
      );

      if (data) {
        this.appService.setCache(cacheKey, data);
        return data;
      }

      throw new HttpException('Client Error', HttpStatus.SERVICE_UNAVAILABLE);
    } else if (body.q) {
      const cacheKey = [body.q, params.client].join('-');
      const cached = await this.appService.fetchFromCache<Forecast[]>(cacheKey);
      if (cached) return cached;

      const locations = await this.locationService.getLocations(body);
      if (!locations) {
        throw new HttpException('Client Error', HttpStatus.SERVICE_UNAVAILABLE);
      }

      // pluck off first location match
      const data = await this.forecastService.fetchFromClient(params.client, {
        lat: locations[0].lat.toString(),
        long: locations[0].long.toString(),
        key: locations[0].key,
      });

      if (data) {
        this.appService.setCache(cacheKey, data);
        return data;
      }

      throw new HttpException('Client Error', HttpStatus.SERVICE_UNAVAILABLE);
    }

    throw new HttpException('Incomplete', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  // todo make this work
  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async findAll(
    @Body() body: ForecastFormBody,
    @Res() response: Response,
  ): Promise<Forecast[]> {
    const empty = !Object.keys(body).every(Boolean);
    if (empty) {
      throw new HttpException('Incomplete', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    // check cache
    if (body.key || body.q) {
      const cached = await this.appService.fetchFromCache<Forecast[]>(
        body.key || body.q!,
      );
      if (cached) return cached;
    }

    // Set headers for SSE
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');

    // fetch by location data
    if (body.key && body.lat && body.long) {
      const promises: Record<ForecastClient, Promise<Forecast[] | null>> = {
        accuWeather: this.forecastService.fetchFromClient('accuWeather', body),
        openWeather: this.forecastService.fetchFromClient('openWeather', body),
        weatherDotGov: this.forecastService.fetchFromClient(
          'weatherDotGov',
          body,
        ),
      };

      const completed = new Set<string>();

      await Promise.allSettled(
        Object.entries(promises).map(async ([forecastClient, promise]) => {
          const client = forecastClient as ForecastClient;
          const progress =
            (completed.size / Object.keys(promises).length) * 100;

          const incomplete = !completed.has(client);

          try {
            // resolve the promise
            const data = await promise;

            if (incomplete) {
              completed.add(client);

              const responseBody: ForecastResponseBody = {
                type: 'chunk',
                client,
                data,
                progress,
              };

              response.write(JSON.stringify(responseBody) + '\n\n');
            }
            // return data
            return data;
          } catch (error) {
            // Stream error result
            if (incomplete) {
              completed.add(client);
              const responseBody: ForecastResponseBody = {
                type: 'error',
                client,
                data: null,
                message: error.message,
                progress,
              };

              response.write(JSON.stringify(responseBody) + '\n\n');
            }
          }
        }),
      ).catch((error) => {
        const responseBody: ForecastResponseBody = {
          type: 'error',
          message: 'Stream processing failed: ' + error.message,
          data: null,
          progress: 100,
        };

        response.write(JSON.stringify(responseBody) + '\n\n');
        response.end();
      });

      const responseBody: ForecastResponseBody = {
        type: 'success',
        data: null,
        progress: 100,
      };

      response.write(JSON.stringify(responseBody) + '\n\n');
      response.end();
    }
    // check query
    if (body.q) {
    }

    throw new HttpException(
      'Unable to process results',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
