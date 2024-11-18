import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ClientService } from '@server/client/client.service';
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

const testData: Record<_ForecastClient, object> = {
  accuWeather: accuWeatherData,
  openWeather: openWeatherData,
  weatherDotGov: weatherDotGovData,
  weatherDotGovPoints: weatherDotGovPointsData,
};

class _ClientService<T, R = Forecast[]> extends ClientService<
  T,
  R,
  ForecastFormBody,
  _ForecastClient
> {
  async fetchFromService(p: ForecastFormBody): Promise<R | null> {
    if (process.env.NODE_ENV === 'development') {
      return (
        super.client.formatter?.(testData[super.client.name!] as T) ?? null
      );
    }

    return super.fetchFromService(p);
  }
}

class OpenWeatherClient extends _ClientService<OpenWeatherForecastResponse> {
  constructor(httpService: HttpService) {
    super(httpService);
    this.client = {
      name: 'openWeather',
      baseUrl: 'https://api.openweathermap.org/data/2.5/forecast',
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
        }));
      },
    };
  }
}

class AccuWeatherClient extends _ClientService<AccuweatherForecastResponse> {
  constructor(httpService: HttpService) {
    super(httpService);
    this.client = {
      name: 'accuWeather',
      baseUrl: 'http://dataservice.accuweather.com/forecasts/v1/daily/5day',
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
  }
}

class WeatherDotGovClient extends _ClientService<WeatherDotGovForecastResponse> {
  pointsClient: _ClientService<WeatherDotGovPointsResponse, string>;

  constructor(httpService: HttpService) {
    super(httpService);
    this.client = {
      name: 'weatherDotGov',
      baseUrl: '', // updated in this `fetchFromService` method
      formatter: (data) => {
        return data.properties.periods.map((item) => ({
          time: item.startTime,
          temperature: item.temperature,
          wind: [item.windSpeed, item.windDirection].join(' '),
          icon: item.icon,
          description: item.detailedForecast,
        }));
      },
    };

    // add additional client for "points" endpoint
    const pointsClient = new _ClientService<
      WeatherDotGovPointsResponse,
      string
    >(httpService);
    pointsClient.client = {
      name: 'weatherDotGovPoints',
      baseUrl: 'https://api.weather.gov/points',
      getUrlPath: (p) => `${p.lat},${p.long}`,
      formatter: (data) => data.properties.forecast,
    };
    this.pointsClient = pointsClient;
  }

  fetchFromService = async (p: ForecastFormBody) => {
    const url = await this.pointsClient.fetchFromService(p);
    if (!url) return null;

    // update client url
    this.client = { baseUrl: url };
    return super.fetchFromService(p);
  };
}

@Injectable()
export class ForecastService {
  #clients: {
    openWeather: OpenWeatherClient;
    accuWeather: AccuWeatherClient;
    weatherDotGov: WeatherDotGovClient;
  };

  constructor(httpService: HttpService) {
    this.#clients = {
      openWeather: new OpenWeatherClient(httpService),
      accuWeather: new AccuWeatherClient(httpService),
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
