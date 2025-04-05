import { Handler, Context, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { createServer, proxy } from 'aws-serverless-express';

let cachedServer: any;

async function bootstrapServer(): Promise<any> {
  try {
    console.log('Bootstrapping Nest app...');
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    await app.init();
    console.log('Nest app initialized');
    return createServer(expressApp);
  } catch (error) {
    console.error('Error during bootstrapServer:', error);
    throw error;
  }
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log('Lambda invoked with event:', JSON.stringify(event));
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
