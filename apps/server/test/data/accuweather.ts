import { AccuweatherForecastResponse } from '@server/types';

export const accuweatherData: AccuweatherForecastResponse = {
  Headline: {
    EffectiveDate: '2024-11-16T07:00:00-07:00',
    EffectiveEpochDate: 1731765600,
    Severity: 7,
    Text: 'Noticeably cooler today',
    Category: 'cooler',
    EndDate: '2024-11-16T19:00:00-07:00',
    EndEpochDate: 1731808800,
    MobileLink:
      'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?lang=en-us',
    Link: 'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?lang=en-us',
  },
  DailyForecasts: [
    {
      Date: '2024-11-16T07:00:00-07:00',
      EpochDate: 1731765600,
      Temperature: {
        Minimum: { Value: 38.0, Unit: 'F', UnitType: 18 },
        Maximum: { Value: 61.0, Unit: 'F', UnitType: 18 },
      },
      Day: { Icon: 3, IconPhrase: 'Partly sunny', HasPrecipitation: false },
      Night: { Icon: 38, IconPhrase: 'Mostly cloudy', HasPrecipitation: false },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?day=1&lang=en-us',
      Link: 'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?day=1&lang=en-us',
    },
    {
      Date: '2024-11-17T07:00:00-07:00',
      EpochDate: 1731852000,
      Temperature: {
        Minimum: { Value: 34.0, Unit: 'F', UnitType: 18 },
        Maximum: { Value: 57.0, Unit: 'F', UnitType: 18 },
      },
      Day: { Icon: 6, IconPhrase: 'Mostly cloudy', HasPrecipitation: false },
      Night: { Icon: 34, IconPhrase: 'Mostly clear', HasPrecipitation: false },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?day=2&lang=en-us',
      Link: 'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?day=2&lang=en-us',
    },
    {
      Date: '2024-11-18T07:00:00-07:00',
      EpochDate: 1731938400,
      Temperature: {
        Minimum: { Value: 34.0, Unit: 'F', UnitType: 18 },
        Maximum: { Value: 63.0, Unit: 'F', UnitType: 18 },
      },
      Day: { Icon: 1, IconPhrase: 'Sunny', HasPrecipitation: false },
      Night: { Icon: 33, IconPhrase: 'Clear', HasPrecipitation: false },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?day=3&lang=en-us',
      Link: 'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?day=3&lang=en-us',
    },
    {
      Date: '2024-11-19T07:00:00-07:00',
      EpochDate: 1732024800,
      Temperature: {
        Minimum: { Value: 36.0, Unit: 'F', UnitType: 18 },
        Maximum: { Value: 65.0, Unit: 'F', UnitType: 18 },
      },
      Day: { Icon: 1, IconPhrase: 'Sunny', HasPrecipitation: false },
      Night: { Icon: 33, IconPhrase: 'Clear', HasPrecipitation: false },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?day=4&lang=en-us',
      Link: 'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?day=4&lang=en-us',
    },
    {
      Date: '2024-11-20T07:00:00-07:00',
      EpochDate: 1732111200,
      Temperature: {
        Minimum: { Value: 44.0, Unit: 'F', UnitType: 18 },
        Maximum: { Value: 71.0, Unit: 'F', UnitType: 18 },
      },
      Day: { Icon: 1, IconPhrase: 'Sunny', HasPrecipitation: false },
      Night: { Icon: 33, IconPhrase: 'Clear', HasPrecipitation: false },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?day=5&lang=en-us',
      Link: 'http://www.accuweather.com/en/us/vail-az/85641/daily-weather-forecast/346918?day=5&lang=en-us',
    },
  ],
};
