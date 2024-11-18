import { ApiProperty } from '@nestjs/swagger';

export class WeatherLocation {
  @ApiProperty()
  key: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  long: number;
}

export class LocationFormBody {
  @ApiProperty({ required: false })
  q?: string;
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
