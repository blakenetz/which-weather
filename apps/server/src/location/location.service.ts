import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AccuWeatherResponseItem, WeatherLocation } from '@server/types';
import { locationData } from '@test/data';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError, of, map } from 'rxjs';

type LocationClientURLComponents = {
  url: string;
  search: Record<string, string>;
};

type LocationClientType = 'accuweather' | 'openweather';
class LocationClient {
  type: LocationClientType;
  client: LocationClientURLComponents;

  constructor(type: LocationClientType) {
    this.type = type;
    this.client = this.clients[type];
  }

  private clients: Record<LocationClientType, LocationClientURLComponents> = {
    accuweather: {
      url: 'http://dataservice.accuweather.com/locations/v1/cities/search',
      search: { q: '', limit: '5', apikey: process.env.ACCUWEATHER_KEY! },
    },
    openweather: {
      url: 'http://api.openweathermap.org/geo/1.0/direct',
      search: { q: '', limit: '5', appid: process.env.OPEN_WEATHER_KEY! },
    },
  };

  generateUrl(q: string) {
    // create new URL interface
    const url = new URL(this.client.url);
    const search = new URLSearchParams(this.client.search);

    search.set('q', q);
    url.search = search.toString();

    return url.toString();
  }
}

@Injectable()
export class LocationService {
  client: LocationClient;

  constructor(private readonly httpService: HttpService) {
    this.client = new LocationClient('accuweather');
  }

  // todo uncouple from accuweather
  private formatResponse(data: AccuWeatherResponseItem[]): WeatherLocation[] {
    return data.map((d) => ({
      key: d.Key,
      city: d.EnglishName,
      state: d.AdministrativeArea.EnglishName,
      country: d.Country.EnglishName,
      lat: d.GeoPosition.Latitude,
      long: d.GeoPosition.Longitude,
    }));
  }

  async getLocations(q: string): Promise<WeatherLocation[] | null> {
    if (process.env.NODE_ENV === 'development') return locationData;

    const url = this.client.generateUrl(q);

    const data = await firstValueFrom(
      this.httpService.get<AccuWeatherResponseItem[]>(url).pipe(
        map((res) => this.formatResponse(res.data)),
        catchError((error: AxiosError) => {
          // todo: implement logger
          console.log('axios error!', error.response?.data);

          return of(null);
        }),
      ),
    );

    return data ?? null;
  }
}
