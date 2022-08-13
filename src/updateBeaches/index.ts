import { Handler } from 'aws-cdk-lib/aws-lambda';

import s3Service from '../shared/s3Service';
import getBeachesMap from './getBeachesMap';

export const handler: Handler = async () => {
  const beachesMap = await getBeachesMap();

  await s3Service.saveBeachesMap(beachesMap);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/json' },
    body: JSON.stringify({ success: true }),
  };
};
