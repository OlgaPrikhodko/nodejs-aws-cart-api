import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as dotenv from 'dotenv';

dotenv.config();

export class Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const server = new NodejsFunction(this, 'server', {
      functionName: 'nodejs-aws-cart-api',
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: 'dist/main.lambda.js',
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      bundling: {
        minify: true,
        target: 'node20',
        externalModules: [
          '@nestjs/microservices',
          '@nestjs/websockets',
          'class-transformer',
          'class-validator',
        ],
      },
      environment: {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
      },
    });

    // lambda via HTTP URL
    const { url } = server.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
        allowedMethods: [lambda.HttpMethod.ALL],
        maxAge: cdk.Duration.days(1),
      },
    });

    new cdk.CfnOutput(this, 'Url', {
      value: url,
    });
  }
}
