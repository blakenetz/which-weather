import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ClientApi, ClientService } from '@server/client/client.service';
import {
  AccuWeatherResponseItem,
  LocationFormBody,
  WeatherLocation,
} from '@server/types';
import { locationData } from '@test/data';

type _ClientType = 'accuWeather' | 'openWeather';

const accuWeatherClient: ClientApi<
  AccuWeatherResponseItem[],
  WeatherLocation[],
  LocationFormBody,
  _ClientType
> = {
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

const openWeatherClient: ClientApi<
  [],
  WeatherLocation[],
  LocationFormBody,
  _ClientType
> = {
  name: 'openWeather',
  baseUrl: 'http://api.openweathermap.org/geo/1.0/direct',
  getSearchParams: () => ({
    q: '',
    limit: '5',
    appid: process.env.OPEN_WEATHER_KEY!,
  }),
  formatter: (v) => v,
};

@Injectable()
export class LocationService {
  #clients: {
    accuWeather: ClientService<
      AccuWeatherResponseItem[],
      WeatherLocation[],
      LocationFormBody,
      _ClientType
    >;
    openWeather: ClientService<
      [],
      WeatherLocation[],
      LocationFormBody,
      _ClientType
    >;
  };

  constructor(private readonly httpService: HttpService) {
    this.#clients = {
      accuWeather: new ClientService(
        this.httpService,
        accuWeatherClient,
        locationData,
      ),
      openWeather: new ClientService(this.httpService, openWeatherClient),
    };
  }

  async getLocations(
    params: LocationFormBody,
  ): Promise<WeatherLocation[] | null> {
    return this.#clients.accuWeather.fetchFromService(params);
  }
}
