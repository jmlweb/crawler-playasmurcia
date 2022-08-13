import * as http from 'http';

import { RawBeaches } from '../../shared/types';
import validateRawBeaches from './validateRawBeaches';

const URL = 'http://nexo.carm.es/nexo/archivos/recursos/opendata/json/Playas.json';

const fetchBeaches = (): Promise<RawBeaches> =>
  new Promise((resolve, reject) => {
    const req = http.get(URL, (res) => {
      let rawData = '';

      res.on('data', (chunk) => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(rawData.replace(/[\ufeff|\t|\n]/g, ''));

          // TODO: Replace by schema validation
          if (!validateRawBeaches(result)) {
            throw new Error('Error fetching beaches, invalid response');
          }
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });
  });

export default fetchBeaches;
