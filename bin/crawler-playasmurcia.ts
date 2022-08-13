#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CrawlerPlayasMurciaStack } from '../lib/crawler-playasmurcia-stack';

const app = new cdk.App();
new CrawlerPlayasMurciaStack(app, 'CrawlerPlayasMurciaStack');
