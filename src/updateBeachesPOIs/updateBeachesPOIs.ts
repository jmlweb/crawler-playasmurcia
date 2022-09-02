import { BeachesPositions, BeachPosition } from '../shared/types';
import extractChunks from './extractChunks';
import fetchPOIs from './fetchPOIs';
import parsePOI from './parsePOI';
import s3Service from '../shared/s3Service';

const PERIOD = 1000;
const MAX_REQUESTS = 4;

const fetchAndSavePOIs = async (beachPosition: BeachPosition) => {
  const rawPOIs = await fetchPOIs(beachPosition);
  const pois = rawPOIs.filter((rawPOI) => !rawPOI.poi.categories.includes('beach')).map(parsePOI);
  await s3Service.savePois(beachPosition.slug, pois);
};

const processChunk = (beachesPositions: BeachesPositions) => {
  const start = Date.now();
  return new Promise(async (resolve, reject) => {
    try {
      await Promise.all(beachesPositions.map(fetchAndSavePOIs));
      const remaining = PERIOD - (Date.now() - start);
      if (remaining <= 0) {
        resolve(true);
      }
      setTimeout(() => {
        resolve(true);
      }, remaining);
    } catch (e) {
      reject(e);
    }
  });
};

const updateBeachesPOIS = async (beachesPositions: BeachesPositions) => {
  let currentChunkIndex = 0;
  const chunks = extractChunks(beachesPositions, MAX_REQUESTS);

  const processChunks = async () => {
    const currentChunk = chunks[currentChunkIndex];
    if (currentChunk) {
      await processChunk(currentChunk);
      currentChunkIndex += 1;
      await processChunks();
    }
  };

  await processChunks();
};

export default updateBeachesPOIS;
