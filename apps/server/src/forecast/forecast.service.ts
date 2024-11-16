import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  OpenWeatherForecastResponse,
  WeatherGovPointsResponse,
  ForecastFormBody,
  Forecast,
  WeatherGovForecastResponse,
  AccuweatherForecastResponse,
} from '@server/types';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError, of, map } from 'rxjs';

type ClientURL = [url: URL | string, base?: URL | string];
type ClientSearch = Record<string, string>;
type Formatter<T, R = Forecast[]> = (data: T) => R;

@Injectable()
export class ForecastService {
  constructor(private readonly httpService: HttpService) {}

  async fetchFromService<T, R = Forecast[]>(
    [url, base]: ClientURL,
    search: ClientSearch,
    formatter: Formatter<T, R>,
  ): Promise<R | null> {
    const endpoint = new URL(url, base);
    endpoint.search = new URLSearchParams(search).toString();

    console.log('fetching', endpoint.toString());

    return firstValueFrom(
      this.httpService.get<T>(endpoint.toString()).pipe(
        map((res) => formatter(res.data)),
        catchError((error: AxiosError) => {
          // todo: implement logger
          console.log('error!', error.response?.data);
          return of(null);
        }),
      ),
    );
  }

  async fetchWeatherGov(params: ForecastFormBody): Promise<Forecast[] | null> {
    type R = WeatherGovPointsResponse;
    type RR = WeatherGovForecastResponse;

    const foreCastUrl = await this.fetchFromService<R, string>(
      [`${params.lat},${params.long}`, 'https://api.weather.gov/points'],
      {},
      (data) => data.properties.forecast,
    );

    if (!foreCastUrl) return null;

    const formatter: Formatter<RR> = (data) => {
      return data.properties.periods.map((item) => ({
        time: item.startTime,
        temperature: item.temperature,
        wind: [item.windSpeed, item.windDirection].join(' '),
        icon: item.icon,
        description: item.detailedForecast,
      }));
    };

    return this.fetchFromService<RR>([foreCastUrl], {}, formatter);
  }

  async fetchOpenWeather(params: ForecastFormBody): Promise<Forecast[] | null> {
    type R = OpenWeatherForecastResponse;

    console.log('openWeather');

    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const search = {
      lat: params.lat!,
      lon: params.long!,
      appid: process.env.OPEN_WEATHER_KEY!,
      units: 'imperial',
    };

    const formatter: Formatter<R> = (data) => {
      return data.list.map((item) => ({
        time: item.dt_txt,
        temperature: [item.main.temp_min, item.main.temp_max],
        feelsLike: item.main.feels_like,
        wind: `${item.wind.speed}mph @ ${item.wind.deg}°`,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      }));
    };

    return this.fetchFromService<R>([url], search, formatter);
  }

  async fetchAccuWeather(params: ForecastFormBody): Promise<Forecast[] | null> {
    type R = AccuweatherForecastResponse;

    const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';

    const numberFormatter = new Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    const formatter: Formatter<R> = (data) => {
      return data.DailyForecasts.map((item) => ({
        time: item.Date,
        temperature: [
          item.Temperature.Minimum.Value,
          item.Temperature.Maximum.Value,
        ],
        icon: `https://developer.accuweather.com/sites/default/files/${numberFormatter.format(item.Day.Icon)}-s.png`,
        link: item.Link,
      }));
    };

    return this.fetchFromService<R>(
      [params.key!, base],
      { apikey: process.env.ACCUWEATHER_KEY! },
      formatter,
    );
  }
}
