export type ForecastClient = 'accuWeather' | 'openWeather' | 'weatherGov';

export class Forecast {
  time: string;
  temperature: [number, number] | number; // either tuple of min/max or set number
  feelsLike?: number;
  wind?: string;
  icon: string;
  description?: string;
  link?: string;
}

export class ForecastResponseBody {
  type: 'success' | 'error';
  message?: string;
  data: Forecast[] | null;
  client?: ForecastClient;
  progress: number;
}

export class ForecastFormBody {
  q?: string;
  lat?: string;
  long?: string;
  key?: string;
}

export class WeatherGovPointsResponse {
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
          '@id': string;
          '@type': string;
        };
        city?: string;
        state?: string;
        distance?: {
          '@id': string;
          '@type'?: string;
        };
        bearing?: {
          '@id': string;
          '@type'?: string;
        };
        value?: {
          '@id': string;
          '@type'?: string;
        };
        unitCode?: {
          '@id': string;
          '@type'?: string;
        };
        forecastOffice?: string;
        forecastGridData?: string;
        publicZone?: string;
        county?: string;
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

export class WeatherGovForecastResponse {
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
