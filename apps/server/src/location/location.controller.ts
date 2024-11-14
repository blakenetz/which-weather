import { Controller, Get, Req } from '@nestjs/common';

@Controller('location')
export class LocationController {
  @Get()
  findAll(@Req() request: Request): string {
    console.log(request);
    return 'This action returns all cats';
  }
}
