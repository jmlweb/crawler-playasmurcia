import * as https from 'https';
import { BeachPosition, RawPOI } from '../shared/types';

const API_KEY = process.env.API_KEY;
const URL = `https://api.tomtom.com/search/2/nearbySearch/.json?lat=%LAT%&lon=%LNG%&countrySet=ES&radius=10000&language=es-ES&view=Unified&relatedPois=off&key=${API_KEY}`;

const fetchPOIs = (beachPosition: BeachPosition): Promise<ReadonlyArray<RawPOI>> =>
  new Promise((resolve, reject) => {
    const url = URL.replace('%LAT%', `${beachPosition.position[0]}`).replace('%LNG%', `${beachPosition.position[1]}`);
    console.log(`url: ${url}`);

    const req = https.get(url, (res) => {
      let rawData = '';

      res.on('data', (chunk) => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(rawData.replace(/[\ufeff|\t|\n]/g, ''));
          resolve(response.results);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });
  });

export default fetchPOIs;
