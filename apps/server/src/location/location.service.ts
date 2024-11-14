import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { WeatherLocation } from '@server/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocationService {
  url: URL;
  search: URLSearchParams;
  cacheKey = 'location';

  constructor(private readonly httpService: HttpService) {
    this.url = new URL('http://api.openweathermap.org/geo/1.0/direct');
    this.search = new URLSearchParams({
      q: '',
      limit: '5',
      appid: process.env.OPEN_WEATHER_KEY!,
    });
  }

  private async queryOpenWeather(q: string): Promise<WeatherLocation[]> {
    this.search.set('q', q);
    this.url.search = this.search.toString();

    const { data } = await firstValueFrom(
      this.httpService.get<WeatherLocation[]>(this.url.toString()),
    );
    return data;
  }

  async getLocations(q: string): Promise<WeatherLocation[]> {
    return this.queryOpenWeather(q);
  }
}
