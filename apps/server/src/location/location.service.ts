import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ClientService } from '@server/client/client.service';
import {
  AccuWeatherResponseItem,
  LocationFormBody,
  WeatherLocation,
} from '@server/types';
import { locationData } from '@test/data';

class AccuWeatherClient extends ClientService<
  AccuWeatherResponseItem[],
  WeatherLocation[],
  LocationFormBody,
  'accuWeather' | 'openWeather'
> {
  constructor(httpService: HttpService) {
    super(httpService);
    this.client = {
      name: 'accuWeather',
      baseUrl: 'http://dataservice.accuweather.com/locations/v1/cities/search',
      getSearchParams: (body) => ({
        q: body.q!,
        apikey: process.env.ACCUWEATHER_KEY!,
      }),
      formatter: (data) => {
        return data.slice(0, 5).map((d) => ({
          key: d.Key,
          city: d.EnglishName,
          state: d.AdministrativeArea.EnglishName,
          country: d.Country.EnglishName,
          lat: d.GeoPosition.Latitude,
          long: d.GeoPosition.Longitude,
        }));
      },
    };
    this.testData = locationData;
  }
}

class OpenWeatherClient extends ClientService<
  [],
  WeatherLocation[],
  LocationFormBody,
  'accuWeather' | 'openWeather'
> {
  constructor(httpService: HttpService) {
    super(httpService);
    this.client = {
      name: 'openWeather',
      baseUrl: 'http://api.openweathermap.org/geo/1.0/direct',
      getSearchParams: () => ({
        q: '',
        limit: '5',
        appid: process.env.OPEN_WEATHER_KEY!,
      }),
    };
  }
}

@Injectable()
export class LocationService {
  #clients: { accuWeather: AccuWeatherClient; openWeather: OpenWeatherClient };

  constructor(private readonly httpService: HttpService) {
    this.#clients = {
      accuWeather: new AccuWeatherClient(this.httpService),
      openWeather: new OpenWeatherClient(this.httpService),
    };
  }

  async getLocations(
    params: LocationFormBody,
  ): Promise<WeatherLocation[] | null> {
    return this.#clients.accuWeather.fetchFromService(params);
  }
}
