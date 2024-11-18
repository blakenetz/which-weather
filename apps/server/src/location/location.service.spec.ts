import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { HttpService } from '@nestjs/axios';
import { createMock } from '@golevelup/ts-jest';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        { provide: HttpService, useValue: createMock<HttpService>() },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
