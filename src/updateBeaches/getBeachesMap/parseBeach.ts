import parseOccupation from './parseOccupation';
import { Beach, RawBeach } from '../../shared/types';
import utmToLatLng from './utmToLatLng';

const capitalize = (x: string) => (x.length === 0 ? x : `${x[0].toUpperCase()}${x.slice(1).toLowerCase()}`);
const slugify = (x: string) =>
  x
    .toLowerCase()
    .normalize('NFD')
    .replace(' del ', ' ')
    .replace(' de ', ' ')
    .replace(/[\u0300-\u036f()]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[.,]/g, '');

const parseBeach = (rawBeach: RawBeach) => {
  const beach: Beach = {
    slug: slugify(rawBeach.Nombre),
    name: rawBeach.Nombre,
    locality: rawBeach.Municipio,
    position: [Number(rawBeach.Longitud), Number(rawBeach.Latitud)],
    anchoringSpot: rawBeach['Zona Fondeo'] === 'Sí',
    nudist: rawBeach.Nudista === 'Sí',
    sea: rawBeach.Mar === 'Mar Menor' ? 1 : 0,
    promenade: rawBeach['Paseo Marítimo'] === 'Sí',
    accesible: rawBeach.Accesible === 'Sí',
    pics: [],
  };

  Object.keys(rawBeach).forEach((key) => {
    if (key.match(/^Foto/)) {
      beach.pics = [...beach.pics, rawBeach[key as `Foto${number}`]];
    }
  });

  if (rawBeach.Dirección) {
    beach.address = rawBeach.Dirección;
  }

  if (rawBeach['C.P.']) {
    beach.zipCode = rawBeach['C.P.'];
  }

  if (rawBeach.Pedanía) {
    beach.parish = capitalize(rawBeach.Pedanía);
  }

  if (rawBeach.Teléfono) {
    beach.phone = rawBeach.Teléfono;
  }

  if (rawBeach.Email) {
    beach.email = rawBeach.Email;
  }

  const url = rawBeach['URL Real'] || rawBeach['URL Corta'];
  if (url) {
    beach.url = url;
  }

  if (rawBeach.Oleaje) {
    beach.swell = capitalize(rawBeach.Oleaje);
  }

  const occupation = parseOccupation(rawBeach.Ocupación);
  if (occupation) {
    beach.occupation = occupation;
  }

  if (rawBeach['Tipo Suelo']) {
    beach.soilType = capitalize(rawBeach['Tipo Suelo']);
  }

  if (rawBeach['Tipo Acceso']) {
    beach.accessType = rawBeach['Tipo Acceso'];
  }

  if (beach.position[0] > 0) {
    const parsedCoordinates = utmToLatLng(beach.position[0], beach.position[1]);
    beach.position = [parsedCoordinates.lat, parsedCoordinates.lng];
  }

  return beach;
};

export default parseBeach;
