import express from 'express';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from '../src/app.module';

const expressServer = express();
let app: any;

async function createNestApp() {
  if (!app) {
    app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressServer),
    );
    app.setGlobalPrefix('api');
    await app.init();
  }
  return expressServer;
}

export default async (req: any, res: any) => {
  await createNestApp();
  expressServer(req, res);
};
