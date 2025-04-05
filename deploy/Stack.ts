import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';
// import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'; // Add this import

dotenv.config();

export class Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const server = new NodejsFunction(this, 'server', {
      functionName: 'nodejs-aws-cart-api',
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: 'dist/main.lambda.js',
      // entry: path.join(__dirname, '../dist/main.lambda.js'), // Using compiled file
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      environment: {},
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
    });

    // lambda via HTTP URL
    const { url } = server.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedMethods: [lambda.HttpMethod.ALL],
        allowedHeaders: ['*'],
        maxAge: cdk.Duration.days(1),
      },
    });

    new cdk.CfnOutput(this, 'Url', {
      value: url,
    });
  }
}
