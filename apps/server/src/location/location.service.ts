import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { WeatherLocation } from '@server/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocationService {
  url: string;
  search: Record<string, string>;

  constructor(private readonly httpService: HttpService) {
    this.url = 'http://api.openweathermap.org/geo/1.0/direct';
    this.search = { q: '', limit: '5', appid: process.env.OPEN_WEATHER_KEY! };
  }

  private generateUrl(q: string) {
    const url = new URL(this.url);
    const search = new URLSearchParams(this.search);

    search.set('q', q);
    url.search = search.toString();

    return url.toString();
  }

  private async queryOpenWeather(q: string): Promise<WeatherLocation[] | null> {
    const url = this.generateUrl(q);

    const res = await firstValueFrom(
      this.httpService.get<WeatherLocation[]>(url),
    );
    if (res.status === 200 && res.data.length) return res.data;

    return null;
  }

  async getLocations(q: string): Promise<WeatherLocation[] | null> {
    return this.queryOpenWeather(q);
  }
}
