import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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
} from '@test/data';
import { AxiosError, AxiosResponse } from 'axios';
import { firstValueFrom, catchError, of, map, Observable } from 'rxjs';

const testData: Record<ForecastClient, object> = {
  accuWeather: accuWeatherData,
  openWeather: openWeatherData,
  weatherDotGov: weatherDotGovData,
};

type Formatter<T, R> = (data: T) => R;

type ForecastReturn = Promise<Forecast[] | null>;

interface ClientApi<T, R> {
  name: ForecastClient;
  baseUrl: string;
  generateUrl?: (p: ForecastFormBody) => URL;
  generateSearchParams?: (p: ForecastFormBody) => URLSearchParams;
  formatter: Formatter<T, R>;
}

class ClientService<T, R = Forecast[]> {
  #client: ClientApi<T, R>;
  fetch: (url: string) => Observable<AxiosResponse<T>>;

  constructor(private readonly httpService: HttpService) {
    this.fetch = httpService.get<T>;
  }

  private generateUrl(p: ForecastFormBody) {
    const url = new URL(
      this.#client.generateUrl?.(p) ?? '/',
      this.#client.baseUrl,
    );
    const search =
      this.#client.generateSearchParams?.(p) ?? new URLSearchParams();

    url.search = search.toString();

    return url.toString();
  }

  async fetchFromService(p: ForecastFormBody): Promise<R | null> {
    if (process.env.NODE_ENV === 'development') {
      return this.client.formatter(testData[this.#client.name] as T);
    }

    const url = this.generateUrl(p);

    return firstValueFrom(
      this.fetch(url).pipe(
        map((res) => this.#client.formatter(res.data)),
        catchError((error: AxiosError) => {
          // todo: implement logger
          console.log('error!', error.response?.data);
          return of(null);
        }),
      ),
    );
  }

  set client(clientApi: ClientApi<T, R>) {
    this.client = clientApi;
  }
}

class OpenWeatherClient extends ClientService<OpenWeatherForecastResponse> {
  constructor(httpService: HttpService) {
    super(httpService);
    this.client = {
      name: 'openWeather',
      baseUrl: 'https://api.openweathermap.org/data/2.5/forecast',
      generateSearchParams: (p) =>
        new URLSearchParams({
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

class AccuWeatherClient extends ClientService<AccuweatherForecastResponse> {
  constructor(httpService: HttpService) {
    super(httpService);
    this.client = {
      name: 'accuWeather',
      baseUrl: 'http://dataservice.accuweather.com/forecasts/v1/daily/5day',
      generateUrl: (p) => new URL(p.key!),
      generateSearchParams: () =>
        new URLSearchParams({ apikey: process.env.ACCUWEATHER_KEY! }),
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

class WeatherDotGovClient extends ClientService<WeatherDotGovForecastResponse> {
  pointsClient: ClientService<WeatherDotGovPointsResponse, string>;

  constructor(httpService: HttpService) {
    super(httpService);

    const pointsClient = new ClientService<WeatherDotGovPointsResponse, string>(
      httpService,
    );
    pointsClient.client = {
      name: 'weatherDotGov',
      baseUrl: 'https://api.weather.gov/points',
      generateUrl: (p) => new URL(`${p.lat},${p.long}`),
      formatter: (data) => data.properties.forecast,
    };

    this.pointsClient = pointsClient;

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
  }

  async fetchFromService(p: ForecastFormBody): ForecastReturn {
    const url = await this.pointsClient.fetchFromService(p);
    if (!url) return null;

    // update client url
    this.client.baseUrl = url;
    return super.fetchFromService(p);
  }
}

@Injectable()
export class ForecastService {
  clients: {
    openWeather: OpenWeatherClient;
    accuWeather: AccuWeatherClient;
    weatherDotGov: WeatherDotGovClient;
  };

  constructor(httpService: HttpService) {
    this.clients = {
      openWeather: new OpenWeatherClient(httpService),
      accuWeather: new AccuWeatherClient(httpService),
      weatherDotGov: new WeatherDotGovClient(httpService),
    };
  }

  async fetchFromClient(
    client: ForecastClient,
    params: ForecastFormBody,
  ): ForecastReturn {
    return this.clients[client].fetchFromService(params);
  }
}
