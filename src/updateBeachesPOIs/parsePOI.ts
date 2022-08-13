import { POI, RawPOI } from '../shared/types';

const parseURL = (url?: string) => (!url || url.slice(0, 3) === 'http' ? url : `http://${url}`);

const parsePOI = (rawPOI: RawPOI): POI => ({
  name: rawPOI.poi.name,
  contact: {
    phone: rawPOI.poi.phone,
    url: parseURL(rawPOI.poi.url),
  },
  categories: rawPOI.poi.categories,
  address: rawPOI.address.freeFormAddress,
  location: [rawPOI.position.lat, rawPOI.position.lon],
});

export default parsePOI;
