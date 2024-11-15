export class WeatherLocation {
  key: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  long: number;
}

export class AccuWeatherResponseItem {
  Key: string;
  EnglishName: string;
  Country: {
    EnglishName: string;
  };
  AdministrativeArea: {
    EnglishName: string;
  };
  GeoPosition: {
    Latitude: number;
    Longitude: number;
  };
}
