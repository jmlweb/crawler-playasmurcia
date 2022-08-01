#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaPlayasmurciaStack } from '../lib/lambda-playasmurcia-stack';

const app = new cdk.App();
new LambdaPlayasmurciaStack(app, 'LambdaPlayasmurciaStack');
