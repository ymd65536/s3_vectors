#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

const AccountId = app.node.tryGetContext('AWS_ACCOUNT_ID');
const Stage = app.node.tryGetContext('STAGE');

if (Stage == undefined)
  throw new Error(`Please specify environment with context option. ex) cdk deploy -c STAGE=dev`);
