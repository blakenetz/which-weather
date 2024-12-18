import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ClientApi, ClientService } from '@server/client/client.service';
import {
  OpenWeatherForecastResponse,
  WeatherDotGovPointsResponse,
  ForecastFormBody,
  Forecast,
  WeatherDotGovForecastResponse,
  AccuweatherForecastResponse,
  ForecastClient,
} from '@server/types';
import {
  accuWeatherData,
  openWeatherData,
  weatherDotGovData,
  weatherDotGovPointsData,
} from '@test/data';

type _ForecastClient = ForecastClient | 'weatherDotGovPoints';

const openWeatherClient: ClientApi<
  OpenWeatherForecastResponse,
  Forecast[],
  ForecastFormBody,
  _ForecastClient
> = {
  name: 'openWeather',
  baseUrl: 'https://api.openweathermap.org/data/2.5/forecast/',
  getSearchParams: (p) => ({
    lat: p.lat!,
    lon: p.long!,
    appid: process.env.OPEN_WEATHER_KEY!,
    units: 'imperial',
  }),
  formatter: (data) => {
    return data.list.map((item) => ({
      time: item.dt_txt,
      temperature: [item.main.temp_min, item.main.temp_max],
      feelsLike: item.main.feels_like,
      wind: `${item.wind.speed}mph @ ${item.wind.deg}°`,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      description: item.weather[0].description,
      link: `https://openweathermap.org/city/${data.city.id}`,
    }));
  },
};

const accuWeatherClient: ClientApi<
  AccuweatherForecastResponse,
  Forecast[],
  ForecastFormBody,
  _ForecastClient
> = {
  name: 'accuWeather',
  baseUrl: 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/',
  getUrlPath: (p) => p.key!,
  getSearchParams: () => ({ apikey: process.env.ACCUWEATHER_KEY! }),
  formatter: (data) => {
    const numberFormatter = new Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    return data.DailyForecasts.map((item) => ({
      time: item.Date,
      temperature: [
        item.Temperature.Minimum.Value,
        item.Temperature.Maximum.Value,
      ],
      icon: `https://developer.accuweather.com/sites/default/files/${numberFormatter.format(item.Day.Icon)}-s.png`,
      link: item.Link,
    }));
  },
};

const weatherDotGovClient: ClientApi<
  WeatherDotGovForecastResponse,
  Forecast[],
  ForecastFormBody,
  _ForecastClient
> = {
  name: 'weatherDotGov',
  baseUrl: '', // updated in this `fetchFromService` method
  formatter: (data) => {
    return data.properties.periods.map((item) => ({
      time: item.startTime,
      temperature: item.temperature,
      wind: [item.windSpeed, item.windDirection].join(' '),
      icon: item.icon,
      description: item.detailedForecast,
      link: `https://forecast.weather.gov/MapClick.php?lat=${data.geometry.coordinates[0][0][1]}&lon=${data.geometry.coordinates[0][0][0]}`,
    }));
  },
};

const weatherDotGovPointsClient: ClientApi<
  WeatherDotGovPointsResponse,
  string,
  ForecastFormBody,
  _ForecastClient
> = {
  name: 'weatherDotGovPoints',
  baseUrl: 'https://api.weather.gov/points/',
  getUrlPath: (p) => `${p.lat},${p.long}`,
  formatter: (data) => data.properties.forecast,
};

class WeatherDotGovClient extends ClientService<
  WeatherDotGovForecastResponse,
  Forecast[],
  ForecastFormBody,
  _ForecastClient
> {
  pointsClient: ClientService<
    WeatherDotGovPointsResponse,
    string,
    ForecastFormBody,
    _ForecastClient
  >;

  constructor(httpService: HttpService) {
    super(httpService, weatherDotGovClient, { data: weatherDotGovData });

    // add additional client for "points" endpoint
    const pointsClient = new ClientService<
      WeatherDotGovPointsResponse,
      string,
      ForecastFormBody,
      _ForecastClient
    >(httpService, weatherDotGovPointsClient, {
      data: weatherDotGovPointsData,
    });

    this.pointsClient = pointsClient;
  }

  async fetchFromService(p: ForecastFormBody) {
    const url = await this.pointsClient.fetchFromService(p);
    console.log({ url });
    if (!url) return null;

    // update client url
    this.client = { baseUrl: url };
    return super.fetchFromService(p);
  }
}

@Injectable()
export class ForecastService {
  #clients: {
    openWeather: ClientService<
      OpenWeatherForecastResponse,
      Forecast[],
      ForecastFormBody,
      _ForecastClient
    >;
    accuWeather: ClientService<
      AccuweatherForecastResponse,
      Forecast[],
      ForecastFormBody,
      _ForecastClient
    >;
    weatherDotGov: WeatherDotGovClient;
  };

  constructor(httpService: HttpService) {
    this.#clients = {
      openWeather: new ClientService(httpService, openWeatherClient, {
        data: openWeatherData,
      }),
      accuWeather: new ClientService(httpService, accuWeatherClient, {
        data: accuWeatherData,
      }),
      weatherDotGov: new WeatherDotGovClient(httpService),
    };
  }

  async fetchFromClient(
    client: ForecastClient,
    params: ForecastFormBody,
  ): Promise<Forecast[] | null> {
    return this.#clients[client].fetchFromService(params);
  }
}
