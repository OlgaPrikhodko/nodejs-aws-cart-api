import * as cdk from 'aws-cdk-lib';
import { Stack } from './Stack';

const app = new cdk.App();

new Stack(app, 'NodejsAwsCartApiStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
  },
});
