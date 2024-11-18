import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ForecastClient } from '@server/types';

import { AxiosError, AxiosResponse } from 'axios';
import { firstValueFrom, catchError, of, map, Observable } from 'rxjs';

export interface ClientApi<T, R = any, P = any, C = any> {
  name: C;
  baseUrl: string;
  getUrlPath?: (p: P) => string;
  getSearchParams?: (p: P) => Record<string, string>;
  formatter: (data: T) => R;
}

@Injectable()
export class ClientService<Type, Return, Params, Client = ForecastClient> {
  #client: ClientApi<Type, Return, Params, Client>;
  fetch: (url: string) => Observable<AxiosResponse<Type>>;

  constructor(private readonly httpService: HttpService) {
    this.fetch = httpService.get<Type>;
  }

  private getUrlPath(p: Params) {
    const url = new URL(
      this.#client.getUrlPath?.(p) ?? '/',
      this.#client.baseUrl,
    );

    const search = new URLSearchParams(this.#client.getSearchParams?.(p));

    url.search = search.toString();

    return url.toString();
  }

  async fetchFromService(p: Params): Promise<Return | null> {
    const url = this.getUrlPath(p);

    return firstValueFrom(
      this.fetch(url).pipe(
        map((res) => this.#client.formatter(res.data)),
        catchError((error: AxiosError) => {
          // todo: implement logger
          console.log('error!', error.response?.data);
          return of(null);
        }),
      ),
    );
  }

  set client(clientApi: Partial<ClientApi<Type, Return, Params, Client>>) {
    this.#client = {
      ...this.#client,
      ...clientApi,
    };
  }

  get client() {
    return this.#client;
  }
}
