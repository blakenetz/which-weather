import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async fetchFromCache<T>(key: string): Promise<T | null> {
    const cached = await this.cacheManager.get<T>(key);
    if (cached) {
      console.log(`🌞 successfully fetched "${key}" from cache`);
      return cached;
    }
    return null;
  }
}
