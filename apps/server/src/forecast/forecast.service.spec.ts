import { Test, TestingModule } from '@nestjs/testing';
import { ForecastService } from './forecast.service';
import { HttpService } from '@nestjs/axios';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ClientService } from '@server/client/client.service';

type _ClientService = ClientService<object, object[], object>;

describe('ForecastService', () => {
  let service: DeepMocked<ForecastService>;
  let clientService: DeepMocked<_ClientService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForecastService,
        { provide: HttpService, useValue: createMock<HttpService>() },
        { provide: ClientService, useValue: createMock<_ClientService>() },
      ],
    }).compile();

    service = module.get(ForecastService);
    clientService = module.get(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch from client', () => {
    const length = 5;
    clientService.fetchFromService.mockReturnValueOnce(
      Promise.resolve(Array.from({ length })),
    );
    expect(service.fetchFromClient('accuWeather', {})).resolves.toHaveLength(
      length,
    );
  });
});
