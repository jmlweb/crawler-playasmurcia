import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CrawlerPlayasMurcia from '../lib/crawler-playasmurcia-stack';

test('SQS Queue and SNS Topic Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CrawlerPlayasMurcia.CrawlerPlayasMurciaStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::S3::Bucket', {
    Tags: [
      {
        Key: 'aws-cdk:auto-delete-objects',
        Value: 'true',
      },
    ],
  });

  template.hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        BUCKET_NAME: {
          Ref: 'DataBucketE3889A50',
        },
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      },
    },
    Handler: 'index.handler',
    Runtime: 'nodejs16.x',
  });

  template.hasResourceProperties('AWS::Events::Rule', {
    ScheduleExpression: 'rate(7 days)',
    State: 'ENABLED',
  });

  template.hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        BUCKET_NAME: {
          Ref: 'DataBucketE3889A50',
        },
        API_KEY:
          '{{resolve:secretsmanager:arn:aws:secretsmanager:eu-west-3:692484306373:secret:TomTomKey-3xO8nd:SecretString:::}}',
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      },
    },
    Handler: 'index.handler',
    Runtime: 'nodejs16.x',
  });

  template.hasResourceProperties('AWS::Events::Rule', {
    ScheduleExpression: 'rate(12 hours)',
    State: 'ENABLED',
  });

  // template.hasResourceProperties('AWS::Lambda::Function', {
  //   FunctionName: 'dataUpdater',
  //   Handler: 'index.handler',
  //   Runtime: 'nodejs16.x',
  // });

  // template.resourceCountIs('AWS::SNS::Topic', 1);
});
