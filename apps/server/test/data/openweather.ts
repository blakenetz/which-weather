import { OpenWeatherForecastResponse } from '@server/types';

export const openWeatherData: OpenWeatherForecastResponse = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1731780000,
      main: {
        temp: 54.73,
        feels_like: 52.83,
        temp_min: 54.73,
        temp_max: 59.97,
        pressure: 1006,
        sea_level: 1006,
        grnd_level: 956,
        humidity: 62,
        temp_kf: -2.91,
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
      ],
      clouds: { all: 58 },
      wind: { speed: 21.54, deg: 188, gust: 34.9 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-16 18:00:00',
    },
    {
      dt: 1731790800,
      main: {
        temp: 58.78,
        feels_like: 57.27,
        temp_min: 58.78,
        temp_max: 62.11,
        pressure: 1004,
        sea_level: 1004,
        grnd_level: 954,
        humidity: 62,
        temp_kf: -1.85,
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
      ],
      clouds: { all: 84 },
      wind: { speed: 18.3, deg: 192, gust: 29.8 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-16 21:00:00',
    },
    {
      dt: 1731801600,
      main: {
        temp: 57.67,
        feels_like: 56.8,
        temp_min: 57.67,
        temp_max: 57.67,
        pressure: 1004,
        sea_level: 1004,
        grnd_level: 955,
        humidity: 78,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 13.98, deg: 186, gust: 31.94 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-17 00:00:00',
    },
    {
      dt: 1731812400,
      main: {
        temp: 56.57,
        feels_like: 56.21,
        temp_min: 56.57,
        temp_max: 56.57,
        pressure: 1005,
        sea_level: 1005,
        grnd_level: 956,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 13.31, deg: 194, gust: 35.19 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-17 03:00:00',
    },
    {
      dt: 1731823200,
      main: {
        temp: 53.62,
        feels_like: 53.29,
        temp_min: 53.62,
        temp_max: 53.62,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 958,
        humidity: 98,
        temp_kf: 0,
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' },
      ],
      clouds: { all: 62 },
      wind: { speed: 6.46, deg: 279, gust: 11.79 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-17 06:00:00',
    },
    {
      dt: 1731834000,
      main: {
        temp: 46.8,
        feels_like: 42.55,
        temp_min: 46.8,
        temp_max: 46.8,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 959,
        humidity: 51,
        temp_kf: 0,
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' },
      ],
      clouds: { all: 58 },
      wind: { speed: 8.75, deg: 2, gust: 22.7 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-17 09:00:00',
    },
    {
      dt: 1731844800,
      main: {
        temp: 45.73,
        feels_like: 41.63,
        temp_min: 45.73,
        temp_max: 45.73,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 960,
        humidity: 53,
        temp_kf: 0,
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' },
      ],
      clouds: { all: 80 },
      wind: { speed: 7.87, deg: 10, gust: 18.75 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-17 12:00:00',
    },
    {
      dt: 1731855600,
      main: {
        temp: 48.76,
        feels_like: 45.14,
        temp_min: 48.76,
        temp_max: 48.76,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 962,
        humidity: 53,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      clouds: { all: 85 },
      wind: { speed: 8.28, deg: 35, gust: 13.13 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-17 15:00:00',
    },
    {
      dt: 1731866400,
      main: {
        temp: 56.98,
        feels_like: 54.27,
        temp_min: 56.98,
        temp_max: 56.98,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 961,
        humidity: 40,
        temp_kf: 0,
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
      ],
      clouds: { all: 61 },
      wind: { speed: 5.77, deg: 75, gust: 5.99 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-17 18:00:00',
    },
    {
      dt: 1731877200,
      main: {
        temp: 59.76,
        feels_like: 57.22,
        temp_min: 59.76,
        temp_max: 59.76,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 960,
        humidity: 38,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      clouds: { all: 88 },
      wind: { speed: 3.94, deg: 77, gust: 3.65 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-17 21:00:00',
    },
    {
      dt: 1731888000,
      main: {
        temp: 52.18,
        feels_like: 49.59,
        temp_min: 52.18,
        temp_max: 52.18,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 961,
        humidity: 53,
        temp_kf: 0,
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' },
      ],
      clouds: { all: 70 },
      wind: { speed: 5.01, deg: 88, gust: 5.08 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-18 00:00:00',
    },
    {
      dt: 1731898800,
      main: {
        temp: 51.17,
        feels_like: 48.81,
        temp_min: 51.17,
        temp_max: 51.17,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 960,
        humidity: 60,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 5.21, deg: 76, gust: 5.39 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-18 03:00:00',
    },
    {
      dt: 1731909600,
      main: {
        temp: 51.06,
        feels_like: 49.21,
        temp_min: 51.06,
        temp_max: 51.06,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 959,
        humidity: 71,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 4.14, deg: 120, gust: 4.14 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-18 06:00:00',
    },
    {
      dt: 1731920400,
      main: {
        temp: 50.85,
        feels_like: 49.44,
        temp_min: 50.85,
        temp_max: 50.85,
        pressure: 1006,
        sea_level: 1006,
        grnd_level: 956,
        humidity: 81,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.74, deg: 75, gust: 13.87 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-18 09:00:00',
    },
    {
      dt: 1731931200,
      main: {
        temp: 52.03,
        feels_like: 51.49,
        temp_min: 52.03,
        temp_max: 52.03,
        pressure: 1004,
        sea_level: 1004,
        grnd_level: 954,
        humidity: 97,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10n' },
      ],
      clouds: { all: 98 },
      wind: { speed: 6.98, deg: 51, gust: 12.17 },
      visibility: 5961,
      pop: 0.61,
      rain: { '3h': 0.81 },
      sys: { pod: 'n' },
      dt_txt: '2024-11-18 12:00:00',
    },
    {
      dt: 1731942000,
      main: {
        temp: 53.31,
        feels_like: 52.99,
        temp_min: 53.31,
        temp_max: 53.31,
        pressure: 1001,
        sea_level: 1001,
        grnd_level: 951,
        humidity: 99,
        temp_kf: 0,
      },
      weather: [
        { id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' },
      ],
      clouds: { all: 100 },
      wind: { speed: 7.63, deg: 34, gust: 15.26 },
      pop: 1,
      rain: { '3h': 5.85 },
      sys: { pod: 'd' },
      dt_txt: '2024-11-18 15:00:00',
    },
    {
      dt: 1731952800,
      main: {
        temp: 55.35,
        feels_like: 55.18,
        temp_min: 55.35,
        temp_max: 55.35,
        pressure: 994,
        sea_level: 994,
        grnd_level: 945,
        humidity: 98,
        temp_kf: 0,
      },
      weather: [
        {
          id: 502,
          main: 'Rain',
          description: 'heavy intensity rain',
          icon: '10d',
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 13.27, deg: 29, gust: 27.51 },
      visibility: 162,
      pop: 1,
      rain: { '3h': 20.14 },
      sys: { pod: 'd' },
      dt_txt: '2024-11-18 18:00:00',
    },
    {
      dt: 1731963600,
      main: {
        temp: 52.88,
        feels_like: 52.43,
        temp_min: 52.88,
        temp_max: 52.88,
        pressure: 987,
        sea_level: 987,
        grnd_level: 938,
        humidity: 97,
        temp_kf: 0,
      },
      weather: [
        {
          id: 502,
          main: 'Rain',
          description: 'heavy intensity rain',
          icon: '10d',
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 20.94, deg: 4, gust: 32.7 },
      visibility: 524,
      pop: 1,
      rain: { '3h': 15.64 },
      sys: { pod: 'd' },
      dt_txt: '2024-11-18 21:00:00',
    },
    {
      dt: 1731974400,
      main: {
        temp: 52.52,
        feels_like: 51.98,
        temp_min: 52.52,
        temp_max: 52.52,
        pressure: 989,
        sea_level: 989,
        grnd_level: 940,
        humidity: 96,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10n' },
      ],
      clouds: { all: 100 },
      wind: { speed: 16.44, deg: 273, gust: 23.44 },
      visibility: 10000,
      pop: 1,
      rain: { '3h': 1.03 },
      sys: { pod: 'n' },
      dt_txt: '2024-11-19 00:00:00',
    },
    {
      dt: 1731985200,
      main: {
        temp: 52.65,
        feels_like: 51.6,
        temp_min: 52.65,
        temp_max: 52.65,
        pressure: 991,
        sea_level: 991,
        grnd_level: 942,
        humidity: 85,
        temp_kf: 0,
      },
      weather: [
        { id: 500, main: 'Rain', description: 'light rain', icon: '10n' },
      ],
      clouds: { all: 74 },
      wind: { speed: 20.02, deg: 306, gust: 39.3 },
      visibility: 10000,
      pop: 1,
      rain: { '3h': 2.32 },
      sys: { pod: 'n' },
      dt_txt: '2024-11-19 03:00:00',
    },
    {
      dt: 1731996000,
      main: {
        temp: 48.97,
        feels_like: 43.32,
        temp_min: 48.97,
        temp_max: 48.97,
        pressure: 996,
        sea_level: 996,
        grnd_level: 946,
        humidity: 89,
        temp_kf: 0,
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' },
      ],
      clouds: { all: 55 },
      wind: { speed: 15.03, deg: 259, gust: 30.98 },
      visibility: 10000,
      pop: 0.8,
      sys: { pod: 'n' },
      dt_txt: '2024-11-19 06:00:00',
    },
    {
      dt: 1732006800,
      main: {
        temp: 45.57,
        feels_like: 39.07,
        temp_min: 45.57,
        temp_max: 45.57,
        pressure: 999,
        sea_level: 999,
        grnd_level: 949,
        humidity: 78,
        temp_kf: 0,
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' },
      ],
      clouds: { all: 0 },
      wind: { speed: 14.63, deg: 260, gust: 35.72 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-19 09:00:00',
    },
    {
      dt: 1732017600,
      main: {
        temp: 45.52,
        feels_like: 38.97,
        temp_min: 45.52,
        temp_max: 45.52,
        pressure: 1002,
        sea_level: 1002,
        grnd_level: 952,
        humidity: 61,
        temp_kf: 0,
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' },
      ],
      clouds: { all: 0 },
      wind: { speed: 14.74, deg: 300, gust: 36.08 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-19 12:00:00',
    },
    {
      dt: 1732028400,
      main: {
        temp: 46.15,
        feels_like: 40.06,
        temp_min: 46.15,
        temp_max: 46.15,
        pressure: 1006,
        sea_level: 1006,
        grnd_level: 955,
        humidity: 70,
        temp_kf: 0,
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
      clouds: { all: 0 },
      wind: { speed: 13.71, deg: 311, gust: 30.56 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-19 15:00:00',
    },
    {
      dt: 1732039200,
      main: {
        temp: 51.06,
        feels_like: 48.54,
        temp_min: 51.06,
        temp_max: 51.06,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 956,
        humidity: 57,
        temp_kf: 0,
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
      clouds: { all: 0 },
      wind: { speed: 13.85, deg: 330, gust: 18.01 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-19 18:00:00',
    },
    {
      dt: 1732050000,
      main: {
        temp: 52.05,
        feels_like: 49.35,
        temp_min: 52.05,
        temp_max: 52.05,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 957,
        humidity: 51,
        temp_kf: 0,
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
      clouds: { all: 3 },
      wind: { speed: 13.11, deg: 330, gust: 15.86 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-19 21:00:00',
    },
    {
      dt: 1732060800,
      main: {
        temp: 46.38,
        feels_like: 42.1,
        temp_min: 46.38,
        temp_max: 46.38,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 959,
        humidity: 59,
        temp_kf: 0,
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n',
        },
      ],
      clouds: { all: 27 },
      wind: { speed: 8.59, deg: 347, gust: 21.65 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-20 00:00:00',
    },
    {
      dt: 1732071600,
      main: {
        temp: 45.72,
        feels_like: 40.39,
        temp_min: 45.72,
        temp_max: 45.72,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 961,
        humidity: 51,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 10.94, deg: 322, gust: 22.55 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-20 03:00:00',
    },
    {
      dt: 1732082400,
      main: {
        temp: 39.61,
        feels_like: 32.63,
        temp_min: 39.61,
        temp_max: 39.61,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 963,
        humidity: 69,
        temp_kf: 0,
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' },
      ],
      clouds: { all: 100 },
      wind: { speed: 11.3, deg: 334, gust: 27.92 },
      visibility: 10000,
      pop: 0.2,
      snow: { '3h': 0.14 },
      sys: { pod: 'n' },
      dt_txt: '2024-11-20 06:00:00',
    },
    {
      dt: 1732093200,
      main: {
        temp: 40.44,
        feels_like: 31.91,
        temp_min: 40.44,
        temp_max: 40.44,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 964,
        humidity: 47,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 16.69, deg: 327, gust: 29.33 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-20 09:00:00',
    },
    {
      dt: 1732104000,
      main: {
        temp: 38.05,
        feels_like: 28.49,
        temp_min: 38.05,
        temp_max: 38.05,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 966,
        humidity: 48,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: { all: 100 },
      wind: { speed: 17.83, deg: 317, gust: 33.8 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-20 12:00:00',
    },
    {
      dt: 1732114800,
      main: {
        temp: 38.95,
        feels_like: 30,
        temp_min: 38.95,
        temp_max: 38.95,
        pressure: 1020,
        sea_level: 1020,
        grnd_level: 968,
        humidity: 48,
        temp_kf: 0,
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
      ],
      clouds: { all: 65 },
      wind: { speed: 16.6, deg: 305, gust: 32.79 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-20 15:00:00',
    },
    {
      dt: 1732125600,
      main: {
        temp: 44.55,
        feels_like: 36.03,
        temp_min: 44.55,
        temp_max: 44.55,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 967,
        humidity: 33,
        temp_kf: 0,
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d',
        },
      ],
      clouds: { all: 33 },
      wind: { speed: 22.03, deg: 305, gust: 35.86 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-20 18:00:00',
    },
    {
      dt: 1732136400,
      main: {
        temp: 45.61,
        feels_like: 37.83,
        temp_min: 45.61,
        temp_max: 45.61,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 965,
        humidity: 33,
        temp_kf: 0,
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
      clouds: { all: 6 },
      wind: { speed: 20.04, deg: 304, gust: 40.94 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-20 21:00:00',
    },
    {
      dt: 1732147200,
      main: {
        temp: 41.92,
        feels_like: 32.94,
        temp_min: 41.92,
        temp_max: 41.92,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 965,
        humidity: 30,
        temp_kf: 0,
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n',
        },
      ],
      clouds: { all: 32 },
      wind: { speed: 20.29, deg: 308, gust: 34.29 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-21 00:00:00',
    },
    {
      dt: 1732158000,
      main: {
        temp: 35.94,
        feels_like: 24.75,
        temp_min: 35.94,
        temp_max: 35.94,
        pressure: 1019,
        sea_level: 1019,
        grnd_level: 967,
        humidity: 46,
        temp_kf: 0,
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' },
      ],
      clouds: { all: 70 },
      wind: { speed: 21.61, deg: 325, gust: 38.43 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-21 03:00:00',
    },
    {
      dt: 1732168800,
      main: {
        temp: 33.4,
        feels_like: 22.78,
        temp_min: 33.4,
        temp_max: 33.4,
        pressure: 1021,
        sea_level: 1021,
        grnd_level: 968,
        humidity: 56,
        temp_kf: 0,
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n',
        },
      ],
      clouds: { all: 35 },
      wind: { speed: 16.8, deg: 326, gust: 34.54 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-21 06:00:00',
    },
    {
      dt: 1732179600,
      main: {
        temp: 32.16,
        feels_like: 22.21,
        temp_min: 32.16,
        temp_max: 32.16,
        pressure: 1021,
        sea_level: 1021,
        grnd_level: 968,
        humidity: 58,
        temp_kf: 0,
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' },
      ],
      clouds: { all: 2 },
      wind: { speed: 13.91, deg: 316, gust: 32.35 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-21 09:00:00',
    },
    {
      dt: 1732190400,
      main: {
        temp: 30.24,
        feels_like: 21.36,
        temp_min: 30.24,
        temp_max: 30.24,
        pressure: 1022,
        sea_level: 1022,
        grnd_level: 968,
        humidity: 62,
        temp_kf: 0,
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' },
      ],
      clouds: { all: 2 },
      wind: { speed: 10.36, deg: 306, gust: 25.26 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'n' },
      dt_txt: '2024-11-21 12:00:00',
    },
    {
      dt: 1732201200,
      main: {
        temp: 33.64,
        feels_like: 23.83,
        temp_min: 33.64,
        temp_max: 33.64,
        pressure: 1023,
        sea_level: 1023,
        grnd_level: 970,
        humidity: 52,
        temp_kf: 0,
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
      clouds: { all: 3 },
      wind: { speed: 14.61, deg: 302, gust: 26.8 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2024-11-21 15:00:00',
    },
  ],
  city: {
    id: 4281253,
    name: 'Washington',
    coord: { lat: 39.7456, lon: -97.0892 },
    country: 'US',
    population: 1131,
    timezone: -21600,
    sunrise: 1731762889,
    sunset: 1731798716,
  },
};
