import assert = require('assert');
import { RawBeach } from '../../shared/types';

const validateRawBeach = (x: RawBeach) => {
  try {
    assert(typeof x === 'object');
    assert(typeof x.Nombre === 'string');
    assert(typeof x.Municipio === 'string');
    assert(typeof x.Latitud === 'string');
    assert(typeof x.Longitud === 'string');
    assert(typeof x['Tipo Suelo'] === 'string');
    assert(typeof x.Mar === 'string');
    return true;
  } catch (e) {
    const key = x && (x.Nombre || x.Código);
    const msg = key ? `Error validating beach: ${x.Código || x.Nombre}` : 'Invalid object';
    console.log(msg);
    return false;
  }
};

const validateRawBeaches = (x: unknown): boolean => {
  try {
    assert(x && Array.isArray(x));
    assert(x.length > 10);
    assert(x.every(validateRawBeach));
    return true;
  } catch (e) {
    return false;
  }
};

export default validateRawBeaches;
