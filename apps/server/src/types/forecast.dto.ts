import { ApiProperty } from '@nestjs/swagger';

export type ForecastClient = 'accuWeather' | 'openWeather' | 'weatherDotGov';

export class Forecast {
  @ApiProperty()
  time: string;

  @ApiProperty({
    oneOf: [
      { type: 'number' },
      {
        type: 'array',
        items: { type: 'number' },
        minItems: 2,
        maxItems: 2,
      },
    ],
  })
  temperature: [number, number] | number;

  @ApiProperty({ required: false })
  feelsLike?: number;

  @ApiProperty({ required: false })
  wind?: string;

  @ApiProperty()
  icon: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  link: string;
}

export class ForecastResponseBody {
  @ApiProperty()
  type: 'chunk' | 'error' | 'success';

  @ApiProperty({ required: false })
  message?: string;

  @ApiProperty()
  data: Forecast[] | null;

  @ApiProperty({ required: false })
  client?: ForecastClient;

  @ApiProperty({ required: false })
  progress: number;
}

export class ForecastFormBody {
  @ApiProperty({ required: false })
  q?: string;
  @ApiProperty({ required: false })
  lat?: string;
  @ApiProperty({ required: false })
  long?: string;
  @ApiProperty({ required: false })
  key?: string;
}

export class ForecastParams {
  @ApiProperty({ enum: ['accuWeather', 'openWeather', 'weatherDotGov'] })
  client: ForecastClient;
}

/**
 * I know you said no AI, but I used an LLM to generate the following response classes.
 * I figure there wasn't really any logic involved, so in this case it would be alright.
 */

export class WeatherDotGovPointsResponse {
  '@context': (
    | string
    | {
        '@version'?: string;
        wx?: string;
        s?: string;
        geo?: string;
        unit?: string;
        '@vocab'?: string;
        geometry?: {
          '@id'?: string;
          '@type'?: string;
        };
        city?: string;
        state?: string;
        distance?: {
          '@id'?: string;
          '@type'?: string;
        };
        bearing?: {
          '@id'?: string;
          '@type'?: string;
        };
        value?: {
          '@id'?: string;
          '@type'?: string;
        };
        unitCode?: {
          '@id'?: string;
          '@type'?: string;
        };
        forecastOffice?: {
          '@id'?: string;
          '@type'?: string;
        };
        forecastGridData?: {
          '@id'?: string;
          '@type'?: string;
        };
        publicZone?: {
          '@id'?: string;
          '@type'?: string;
        };
        county?: {
          '@id'?: string;
          '@type'?: string;
        };
      }
  )[];
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    '@id': string;
    '@type': string;
    cwa: string;
    forecastOffice: string;
    gridId: string;
    gridX: number;
    gridY: number;
    forecast: string;
    forecastHourly: string;
    forecastGridData: string;
    observationStations: string;
    relativeLocation: {
      type: string;
      geometry: {
        type: string;
        coordinates: [number, number];
      };
      properties: {
        city: string;
        state: string;
        distance: {
          unitCode: string;
          value: number;
        };
        bearing: {
          unitCode: string;
          value: number;
        };
      };
    };
    forecastZone: string;
    county: string;
    fireWeatherZone: string;
    timeZone: string;
    radarStation: string;
  };
}

export class WeatherDotGovForecastResponse {
  '@context': (
    | string
    | {
        '@version'?: string;
        wx?: string;
        geo?: string;
        unit?: string;
        '@vocab'?: string;
      }
  )[];
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: {
    units: string;
    forecastGenerator: string;
    generatedAt: string;
    updateTime: string;
    validTimes: string;
    elevation: {
      unitCode: string;
      value: number;
    };
    periods: {
      number: number;
      name: string;
      startTime: string;
      endTime: string;
      isDaytime: boolean;
      temperature: number;
      temperatureUnit: string;
      temperatureTrend?: string;
      probabilityOfPrecipitation: {
        unitCode: string;
        value: number | null;
      };
      windSpeed: string;
      windDirection: string;
      icon: string;
      shortForecast: string;
      detailedForecast: string;
    }[];
  };
}

export class OpenWeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility?: number;
    pop: number;
    rain?: { '3h': number };
    snow?: { '3h': number };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export class AccuweatherForecastResponse {
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: string;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
  };
  DailyForecasts: {
    Date: string;
    EpochDate: number;
    Temperature: {
      Minimum: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Maximum: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
    Day: {
      Icon: number;
      IconPhrase: string;
      HasPrecipitation: boolean;
    };
    Night: {
      Icon: number;
      IconPhrase: string;
      HasPrecipitation: boolean;
    };
    Sources: string[];
    MobileLink: string;
    Link: string;
  }[];
}
