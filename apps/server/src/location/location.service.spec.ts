import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { HttpService } from '@nestjs/axios';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('LocationService', () => {
  let service: DeepMocked<LocationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: LocationService, useValue: createMock<LocationService>() },
        { provide: HttpService, useValue: createMock<HttpService>() },
      ],
    }).compile();

    service = module.get(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch from client', () => {
    const length = 5;
    service.getLocations.mockReturnValue(
      Promise.resolve(Array.from({ length })),
    );
    expect(service.getLocations({})).resolves.toHaveLength(length);
  });
});
