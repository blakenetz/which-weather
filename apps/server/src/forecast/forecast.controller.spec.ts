import { Test, TestingModule } from '@nestjs/testing';
import { ForecastController } from './forecast.controller';
import { AppService } from '@server/app.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { LocationService } from '@server/location/location.service';
import { HttpService } from '@nestjs/axios';
import { ForecastService } from './forecast.service';
import { Forecast, ForecastClient, WeatherLocation } from '@server/types';
import each from 'jest-each';

describe('ForecastController', () => {
  let controller: ForecastController;
  let service: DeepMocked<ForecastService>;
  let appService: DeepMocked<AppService>;
  let locationService: DeepMocked<LocationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForecastController],
      providers: [
        { provide: AppService, useValue: createMock<AppService>() },
        { provide: ForecastService, useValue: createMock<ForecastService>() },
        { provide: LocationService, useValue: createMock<LocationService>() },
        { provide: HttpService, useValue: createMock<HttpService>() },
      ],
    }).compile();

    controller = module.get<ForecastController>(ForecastController);
    service = module.get(ForecastService);

    appService = module.get(AppService);
    appService.fetchFromCache.mockReturnValue(Promise.resolve(null));

    const weatherReturn: WeatherLocation = {
      lat: 1,
      long: 2,
      key: 'key',
      city: 'city',
      state: 'state',
      country: 'country',
    };
    locationService = module.get(LocationService);
    locationService.getLocations.mockReturnValue(
      Promise.resolve([weatherReturn]),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('post - :client', () => {
    const params: { client: ForecastClient } = { client: 'accuWeather' };
    it('should error when body is falsy', () => {
      expect(controller.find({}, params)).rejects.toThrow('Incomplete');
      expect(
        controller.find({ q: '', lat: '', long: '', key: '' }, params),
      ).rejects.toThrow('Incomplete');
    });

    describe('form body', () => {
      const table = [[{ q: 'foo' }], [{ key: 'foo' }]];
      each(table).test(
        'should error when service returns null with body: %s',
        (body) => {
          service.fetchFromClient.mockReturnValueOnce(Promise.resolve(null));
          expect(controller.find(body, params)).rejects.toThrow('Client Error');
        },
      );
      each(table).test(
        'should return from cache when found with body: %s',
        (body) => {
          const expected = 'YEHAA';
          appService.fetchFromCache.mockReturnValueOnce(
            Promise.resolve(expected),
          );
          expect(controller.find(body, params)).resolves.toBe(expected);
        },
      );
      each(table).test(
        'should return from service when successful with body: %s',
        (body) => {
          const expected: Forecast[] = [];
          service.fetchFromClient.mockReturnValueOnce(
            Promise.resolve(expected),
          );
          expect(controller.find(body, params)).resolves.toBe(expected);
        },
      );
    });

    describe('location', () => {
      each([
        [1, { q: 'foo' }],
        [0, { key: 'foo' }],
      ]).test(
        'should search by location %s times when formBody is %s',
        async (count, body) => {
          const spied = jest.spyOn(locationService, 'getLocations');
          await controller.find(body, params);
          expect(spied).toHaveBeenCalledTimes(count);
        },
      );
    });
  });
});
