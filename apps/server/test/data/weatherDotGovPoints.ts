import { WeatherDotGovPointsResponse } from '@server/types';

export const weatherDotGovPointsData: WeatherDotGovPointsResponse = {
  '@context': [
    'https://geojson.org/geojson-ld/geojson-context.jsonld',
    {
      '@version': '1.1',
      wx: 'https://api.weather.gov/ontology#',
      s: 'https://schema.org/',
      geo: 'http://www.opengis.net/ont/geosparql#',
      unit: 'http://codes.wmo.int/common/unit/',
      '@vocab': 'https://api.weather.gov/ontology#',
      geometry: {
        '@id': 's:GeoCoordinates',
        '@type': 'geo:wktLiteral',
      },
      city: 's:addressLocality',
      state: 's:addressRegion',
      distance: {
        '@id': 's:Distance',
        '@type': 's:QuantitativeValue',
      },
      bearing: {
        '@type': 's:QuantitativeValue',
      },
      value: {
        '@id': 's:value',
      },
      unitCode: {
        '@id': 's:unitCode',
        '@type': '@id',
      },
      forecastOffice: {
        '@type': '@id',
      },
      forecastGridData: {
        '@type': '@id',
      },
      publicZone: {
        '@type': '@id',
      },
      county: {
        '@type': '@id',
      },
    },
  ],
  id: 'https://api.weather.gov/points/39.7456,-97.0892',
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [-97.089200000000005, 39.745600000000003],
  },
  properties: {
    '@id': 'https://api.weather.gov/points/39.7456,-97.0892',
    '@type': 'wx:Point',
    cwa: 'TOP',
    forecastOffice: 'https://api.weather.gov/offices/TOP',
    gridId: 'TOP',
    gridX: 32,
    gridY: 81,
    forecast: 'https://api.weather.gov/gridpoints/TOP/32,81/forecast',
    forecastHourly:
      'https://api.weather.gov/gridpoints/TOP/32,81/forecast/hourly',
    forecastGridData: 'https://api.weather.gov/gridpoints/TOP/32,81',
    observationStations:
      'https://api.weather.gov/gridpoints/TOP/32,81/stations',
    relativeLocation: {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-97.086661000000007, 39.679375999999998],
      },
      properties: {
        city: 'Linn',
        state: 'KS',
        distance: {
          unitCode: 'wmoUnit:m',
          value: 7366.9851976443997,
        },
        bearing: {
          unitCode: 'wmoUnit:degree_(angle)',
          value: 358,
        },
      },
    },
    forecastZone: 'https://api.weather.gov/zones/forecast/KSZ009',
    county: 'https://api.weather.gov/zones/county/KSC201',
    fireWeatherZone: 'https://api.weather.gov/zones/fire/KSZ009',
    timeZone: 'America/Chicago',
    radarStation: 'KTWX',
  },
};
