import { S3 } from 'aws-sdk';
import { BeachesMap, BeachesPositions, POIs } from '../types';

const makeS3Service = () => {
  const s3 = new S3();
  const bucketName = process.env.BUCKET_NAME;
  if (!bucketName) {
    throw new Error('bucketName not found');
  }

  let beachesMapCache: Promise<BeachesMap> | undefined = undefined;
  const poisCache: Record<string, Promise<POIs>> = {};

  const save = <V>(key: string, value: V) =>
    s3
      .putObject({
        Bucket: bucketName,
        Key: key,
        ContentType: 'application/json',
        Body: JSON.stringify(value),
      })
      .promise();

  const get = <V>(key: string): Promise<V> =>
    s3
      .getObject({
        Bucket: bucketName,
        Key: key,
      })
      .promise()
      .then((data) => {
        if (!data.Body) {
          throw new Error('no body found');
        }
        return JSON.parse(data.Body.toString('utf-8'));
      });

  const getBeachesMap = () => {
    if (!beachesMapCache) {
      beachesMapCache = get<BeachesMap>('beaches.json');
    }
    return beachesMapCache;
  };

  const getBeaches = async () => {
    const beachesMap = await getBeachesMap();
    return Object.values(beachesMap);
  };

  const getBeachesPositions = async (): Promise<BeachesPositions> => {
    const beaches = await getBeaches();
    return beaches.map(({ slug, position }) => ({
      slug,
      position,
    }));
  };

  return {
    getBeachesMap,
    getBeaches,
    getBeachesPositions,
    getPois: (slug: string) => {
      if (!poisCache[slug]) {
        poisCache[slug] = get<POIs>(`pois/${slug}.json`);
      }
      return poisCache[slug];
    },
    saveBeachesMap: (value: BeachesMap) => save('beaches.json', value),
    savePois: (slug: string, value: POIs) => save(`pois/${slug}.json`, value),
  };
};

const s3Service = makeS3Service();

export default s3Service;
