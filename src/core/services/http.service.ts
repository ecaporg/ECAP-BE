import { Axios } from 'axios';

import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService extends Axios {}
