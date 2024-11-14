import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  getLocation(q: string) {
    console.log(q);
    return {};
  }
}
