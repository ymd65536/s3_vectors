import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vectorsLayer = new lambda.LayerVersion(this, 'VectorsLayer',{
      code: lambda.Code.fromAsset('lambda/layers'),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_12],
      description: 'Layer for vector operations',
      layerVersionName: 'VectorsLayer',
    });

    const createIndexFunction = new lambda.Function(this, 'CreateIndexFunction', {
      runtime: lambda.Runtime.PYTHON_3_12,
      code: lambda.Code.fromAsset('lambda/function'),
      handler: 'lambda_function.lambda_handler',
      layers: [vectorsLayer],
      environment: {
        VECTOR_ENGINE_BUCKET: 'your-bucket-name', // Replace with your actual bucket name
      },
      timeout: cdk.Duration.minutes(5),
      memorySize: 512,
    });

  }
}
