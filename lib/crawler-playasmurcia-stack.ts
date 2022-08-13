import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { NodejsFunction, SourceMapMode } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

const bundling = {
  minify: true, // minify code, defaults to false
  sourceMap: true, // include source map, defaults to false
  sourceMapMode: SourceMapMode.INLINE, // defaults to SourceMapMode.DEFAULT
  sourcesContent: false, // do not include original source into source map, defaults to true
  target: 'es2020', // target environment for the generated JavaScript code
  // define: { // Replace strings during build time
  //   'process.env.COUNTRY': JSON.stringify('France'),
  // },
};

const defaultLambdaOptions = {
  handler: 'handler',
  runtime: Runtime.NODEJS_16_X,
  timeout: Duration.minutes(2),
  bundling,
};

export class CrawlerPlayasMurciaStack extends Stack {
  private dataBucket: Bucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.dataBucket = new Bucket(this, 'DataBucket', {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    this.configUpdateBeaches = this.configUpdateBeaches.bind(this);
    this.configUpdatePOIs = this.configUpdatePOIs.bind(this);

    this.configUpdateBeaches();
    this.configUpdatePOIs();
  }

  configUpdateBeaches() {
    const updateBeachesLambda = new NodejsFunction(this, 'UpdateBeaches', {
      ...defaultLambdaOptions,
      entry: './src/updateBeaches/index.ts',
      environment: {
        BUCKET_NAME: this.dataBucket.bucketName,
      },
    });

    this.dataBucket.grantWrite(updateBeachesLambda);

    const eventRule = new Rule(this, 'updateBeachesRule', {
      schedule: Schedule.rate(Duration.days(7)),
    });

    eventRule.addTarget(new LambdaFunction(updateBeachesLambda));
  }

  configUpdatePOIs() {
    const secret = Secret.fromSecretAttributes(this, 'TomTomKey', {
      secretCompleteArn: 'arn:aws:secretsmanager:eu-west-3:692484306373:secret:TomTomKey-3xO8nd',
    });

    const updatePOIsLambda = new NodejsFunction(this, 'UpdatePOIs', {
      ...defaultLambdaOptions,
      entry: './src/updateBeachesPOIs/index.ts',
      environment: {
        BUCKET_NAME: this.dataBucket.bucketName,
        API_KEY: secret.secretValue.unsafeUnwrap(),
      },
    });

    this.dataBucket.grantReadWrite(updatePOIsLambda);

    const eventRule = new Rule(this, 'updatePOIsRule', {
      schedule: Schedule.rate(Duration.hours(12)),
    });

    eventRule.addTarget(new LambdaFunction(updatePOIsLambda));
  }
}
