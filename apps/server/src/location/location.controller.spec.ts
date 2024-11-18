import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { HttpService } from '@nestjs/axios';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AppService } from '@server/app.service';
import { WeatherLocation } from '@server/types';

describe('LocationController', () => {
  let controller: LocationController;
  let service: DeepMocked<LocationService>;
  let appService: DeepMocked<AppService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        { provide: AppService, useValue: createMock<AppService>() },
        { provide: LocationService, useValue: createMock<LocationService>() },
        { provide: HttpService, useValue: createMock<HttpService>() },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get(LocationService);
    appService = module.get(AppService);
    appService.fetchFromCache.mockReturnValue(Promise.resolve(null));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(appService).toBeDefined();
  });

  describe('findAll', () => {
    it('should error when "q" is not falsy', () => {
      expect(controller.findAll({})).rejects.toThrow('Incomplete');
      expect(controller.findAll({ q: '' })).rejects.toThrow('Incomplete');
    });

    it('should error when service returns null', () => {
      service.getLocations.mockReturnValueOnce(Promise.resolve(null));
      expect(controller.findAll({ q: 'test' })).rejects.toThrow('Client Error');
    });

    it('should return from cache when found', () => {
      const expected = 'YEHAA';
      appService.fetchFromCache.mockReturnValueOnce(Promise.resolve(expected));

      expect(controller.findAll({ q: 'test' })).resolves.toBe(expected);
    });

    it('should return from service when successful', () => {
      const expected: WeatherLocation[] = [];
      service.getLocations.mockReturnValueOnce(Promise.resolve(expected));

      expect(controller.findAll({ q: 'test' })).resolves.toBe(expected);
    });
  });
});
