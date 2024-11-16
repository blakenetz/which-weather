import { CacheKey } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
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

@Controller('forecast')
@CacheKey('forecast')
export class ForecastController {
  constructor(
    private readonly forecastService: ForecastService,
    private readonly appService: AppService,
  ) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async findAll(
    @Body() body: ForecastFormBody,
    @Res() response: Response,
  ): Promise<Forecast[]> {
    console.log(body);
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
        accuWeather: this.forecastService.fetchAccuWeather(body),
        openWeather: this.forecastService.fetchOpenWeather(body),
        weatherDotGov: this.forecastService.fetchWeatherDotGov(body),
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
            console.log(client, data);
            if (incomplete) {
              completed.add(client);

              const responseBody: ForecastResponseBody = {
                type: 'success',
                client,
                data,
                progress,
              };

              response.write(JSON.stringify(responseBody));
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

              response.write(JSON.stringify(responseBody));
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

        response.write(JSON.stringify(responseBody));
        response.end();
      });
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
