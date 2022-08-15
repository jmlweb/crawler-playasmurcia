import parseOccupation from './parseOccupation';
import { Beach, RawBeach } from '../../shared/types';
import utmToLatLng from './utmToLatLng';
import excludedPics from './excludedPics';

const capitalize = (x: string) => (x.length === 0 ? x : `${x[0].toUpperCase()}${x.slice(1).toLowerCase()}`);

const EXCLUDED_WORDS = ['el', 'la', 'los', 'las', 'de', 'del', 'y'];

export const slugify = (x: string) => {
  const parts = x
    .normalize('NFD')
    .toLowerCase()
    .replace(/[\u0300-\u036f()]/g, '')
    .replace(/[.,-]/g, '')
    .replace(/\s+/g, ' ')
    .split(' ');
  return parts.filter((part) => !EXCLUDED_WORDS.includes(part)).join('-');
};

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
    blueFlag: rawBeach['Bandera Azul'] === 'Sí',
    pics: [],
  };

  Object.keys(rawBeach).forEach((key) => {
    if (key.match(/^Foto/)) {
      const value = rawBeach[key as `Foto${number}`];
      beach.pics = excludedPics.includes(value) ? beach.pics : [...beach.pics, value];
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
