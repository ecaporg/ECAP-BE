import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SisResourcesService {
  constructor(private readonly httpService: HttpService) {}

  //   TODO: Implement SisResourcesService after we have a SIS API documentation
}

