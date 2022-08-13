import fetchBeaches from './fetchBeaches';
import parseBeach from './parseBeach';
import injectFallbacks from './injectFallbacks';
import { BeachesMap } from '../../shared/types';

const getBeaches = async () => {
  const rawBeaches = await fetchBeaches();
  return rawBeaches.reduce((acc, rawBeach) => {
    const beach = parseBeach(injectFallbacks(rawBeach));
    acc[beach.slug] = beach;
    return acc;
  }, {} as BeachesMap);
};

export default getBeaches;
