#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TodoAppStack } from '../infrastructure/todo-app-stack';

const app = new cdk.App();
new TodoAppStack(app, 'TodoAppStack', {
  env: {
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION
  }
});

cdk.Tags.of(app).add("Project", "todo-cdk-hexagonal-architecture")
