export interface RawBeach {
  Código: string;
  Nombre: string;
  Dirección: string;
  'C.P.': string;
  Municipio: string;
  Pedanía: string;
  Teléfono: string;
  Fax: string;
  Email: string;
  'URL Real': string;
  'URL Corta': string;
  Latitud: string;
  Longitud: string;
  'Tipo Suelo': string;
  Oleaje: string;
  Ocupación: 'Bajo' | 'Medio' | 'Alto';
  'Zona Fondeo': 'No' | 'Sí' | boolean;
  Nudista: 'No' | 'Sí' | boolean;
  Mar: 'Mar Mediterráneo' | 'Mar Menor';
  'Paseo Marítimo': 'No' | 'Sí' | boolean;
  'Tipo Acceso': string;
  'Bandera Azul': 'No' | 'Sí' | boolean;
  Acceso: string;
  Accesible: 'No' | 'Sí' | boolean;
  [fotoKey: `Foto${number}`]: string;
}

export type RawBeaches = ReadonlyArray<RawBeach>;

export interface Beach {
  name: string;
  slug: string;
  address?: string;
  zipCode?: string;
  locality: string;
  parish?: string;
  phone?: string;
  email?: string;
  url?: string;
  position: [number, number];
  soilType?: string;
  swell?: string;
  occupation?: 'l' | 'm' | 'h';
  anchoringSpot: boolean;
  nudist: boolean;
  sea: 1 | 0;
  promenade: boolean;
  accessType?: string;
  blueFlag: boolean;
  accesible: boolean;
  pics: ReadonlyArray<string>;
}

export type BeachesMap = Record<string, Beach>;

export type Beaches = ReadonlyArray<Beach>;

export type BeachPosition = Pick<Beach, 'slug' | 'position'>;

export type BeachesPositions = ReadonlyArray<BeachPosition>;

export interface RawPOI {
  poi: {
    categories: ReadonlyArray<string>;
    name: string;
    phone?: string;
    url?: string;
  };
  address: {
    freeFormAddress: string;
  };
  position: {
    lat: string;
    lon: string;
  };
}

export interface POI {
  name: RawPOI['poi']['name'];
  contact: {
    phone: RawPOI['poi']['phone'];
    url: RawPOI['poi']['url'];
  };
  categories: RawPOI['poi']['categories'];
  address: RawPOI['address']['freeFormAddress'];
  location: [RawPOI['position']['lat'], RawPOI['position']['lon']];
}

export type POIs = ReadonlyArray<POI>;
