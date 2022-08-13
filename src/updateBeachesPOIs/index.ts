import { Handler } from 'aws-cdk-lib/aws-lambda';

import s3Service from '../shared/s3Service';
import updateBeachesPOIS from './updateBeachesPOIs';

export const handler: Handler = async () => {
  const positions = await s3Service.getBeachesPositions();

  await updateBeachesPOIS(positions);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/json' },
    body: JSON.stringify({ success: true }),
  };
};
