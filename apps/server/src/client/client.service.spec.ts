import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { HttpService } from '@nestjs/axios';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { of } from 'rxjs';
import { AxiosHeaders, AxiosResponse } from 'axios';

type _ClientService = ClientService<object, object, object>;

describe('ClientService', () => {
  let service: DeepMocked<_ClientService>;
  let httpService: DeepMocked<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        { provide: HttpService, useValue: createMock<HttpService>() },
      ],
    }).compile();

    service = module.get(ClientService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('url', () => {
    const baseUrl = 'https://foo.com/';

    afterEach(() => {
      service.client = {};
    });

    it('should use baseUrl', () => {
      service.client = { baseUrl };
      const url = service['getUrlPath']({});
      expect(url).toBe(baseUrl);
    });
    it('should use getUrlPath', () => {
      const path = 'hi';
      service.client = { baseUrl, getUrlPath: () => path };
      const url = service['getUrlPath']({});
      expect(url).toBe(baseUrl + path);
    });
    it('should use getSearchparams', () => {
      service.client = {
        baseUrl,
        getSearchParams: () => ({ foo: 'bar' }),
      };
      const url = service['getUrlPath']({});
      expect(url).toBe(baseUrl + `?foo=bar`);
    });
  });

  describe('fetch', () => {
    const data = { foo: 'bar' };
    const res: AxiosResponse = {
      status: 200,
      statusText: '',
      headers: {},
      config: { headers: new AxiosHeaders() },
      data,
    };

    beforeEach(() => {
      service.client = { baseUrl: 'https://localhost:3000' };

      httpService.get.mockImplementation(() => of(res));
    });

    afterAll(() => {
      service.client = {};
    });

    it('should return array', () => {
      service.client.formatter = (p) => p;
      expect(service.fetchFromService({})).resolves.toEqual(data);
    });
    it('should return format the array', () => {
      service.client.formatter = (p) => ({
        ...p,
        test: 1,
      });
      expect(service.fetchFromService({})).resolves.toMatchObject({
        ...data,
        test: 1,
      });
    });
  });
});
