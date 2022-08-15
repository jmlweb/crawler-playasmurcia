import parseBeach, { slugify } from './parseBeach';
import { RawBeach } from '../../shared/types';

describe('parseBeach', () => {
  test('slugify must work properly', () => {
    expect(slugify('Cala Abierta')).toBe('cala-abierta');
    expect(slugify('Cala Abellán')).toBe('cala-abellan');
    expect(slugify('Cala de Calnegre')).toBe('cala-calnegre');
    expect(slugify('Cala de La Herradura')).toBe('cala-herradura');
    expect(slugify('Cala de Las Melvas')).toBe('cala-melvas');
    expect(slugify('Cala de los Abejorros')).toBe('cala-abejorros');
    expect(slugify('Playa de la Azohía - El Cuartel')).toBe('playa-azohia-cuartel');
    expect(slugify('Cala Túnez (Cala Cuna)')).toBe('cala-tunez-cala-cuna');
  });
  // test('must work when there are no images', () => {
  //   const mock: RawBeach = {
  //     Código: '575',
  //     Nombre: 'Cala Abierta',
  //     Dirección: '',
  //     'C.P.': '',
  //     Municipio: 'Cartagena',
  //     Pedanía: '',
  //     Teléfono: '',
  //     Fax: '',
  //     Email: '',
  //     'URL Real': '',
  //     'URL Corta': '',
  //     Latitud: '4156810',
  //     Longitud: '663618',
  //     'Tipo Suelo': 'ARENA MEDIA Y GRIS',
  //     Oleaje: '',
  //     Ocupación: 'Bajo',
  //     'Zona Fondeo': 'No',
  //     Nudista: 'No',
  //     Mar: 'Mar Mediterráneo',
  //     'Paseo Marítimo': 'No',
  //     'Tipo Acceso': '',
  //     'Bandera Azul': 'No',
  //     Acceso: 'Carretera comarcal Cartagena - Mazarrón. Acceso por sendero PR.Acceso en barco',
  //     Accesible: 'No',
  //   };
  //   expect(parseBeach(mock)).toEqual({
  //     accesible: false,
  //     anchoringSpot: false,
  //     locality: 'Cartagena',
  //     name: 'Cala Abierta',
  //     nudist: false,
  //     occupation: 'l',
  //     pics: [],
  //     position: [37.543778129792386, -1.1479117523069706],
  //     promenade: false,
  //     sea: 0,
  //     slug: 'cala-abierta',
  //     soilType: 'Arena media y gris',
  //   });
  // });
  // test('must work when there are multiple images', () => {
  //   const mock: RawBeach = {
  //     Código: '512',
  //     Nombre: 'Cala Cortina',
  //     Dirección: '',
  //     'C.P.': '',
  //     Municipio: 'Cartagena',
  //     Pedanía: '',
  //     Teléfono: '',
  //     Fax: '',
  //     Email: '',
  //     'URL Real': '',
  //     'URL Corta': '',
  //     Latitud: '4161532',
  //     Longitud: '678937',
  //     'Tipo Suelo': 'ARENA GRUESA',
  //     Oleaje: 'SUAVE',
  //     Ocupación: 'Alto',
  //     'Zona Fondeo': 'No',
  //     Nudista: 'No',
  //     Mar: 'Mar Mediterráneo',
  //     'Paseo Marítimo': 'No',
  //     'Tipo Acceso': '',
  //     'Bandera Azul': 'Sí',
  //     Acceso:
  //       '<p>Se encuentra a 4 km de Cartagena, accediendo por la carretera de Cartagena a Escombreras. Dispone de una senda peatonal que bordea el t&uacute,nel, con acceso directo a la zona de aparcamiento.</p>',
  //     Accesible: 'Sí',
  //     'Foto 1': 'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-1p_g.jpg',
  //     'Foto 2': 'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-2p_g.jpg',
  //     'Foto 3': 'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-3p_g.jpg',
  //     'Foto 4': 'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-4p_g.jpg',
  //     'Foto 5': 'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-5p_g.jpg',
  //     'Foto 6': 'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-11p_g.jpg',
  //     'Foto 7': 'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-7p_g.jpg',
  //     'Foto 8': 'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-8p_g.jpg',
  //     'Foto 9': 'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-9p_g.jpg',
  //     'Foto 10': 'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-10p_g.jpg',
  //     'Foto 11': 'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-6p_g.jpg',
  //   };
  //   expect(parseBeach(mock)).toEqual({
  //     accesible: true,
  //     anchoringSpot: false,
  //     locality: 'Cartagena',
  //     name: 'Cala Cortina',
  //     nudist: false,
  //     occupation: 'h',
  //     pics: [
  //       'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-1p_g.jpg',
  //       'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-2p_g.jpg',
  //       'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-3p_g.jpg',
  //       'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-4p_g.jpg',
  //       'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-5p_g.jpg',
  //       'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-11p_g.jpg',
  //       'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-7p_g.jpg',
  //       'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-8p_g.jpg',
  //       'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-9p_g.jpg',
  //       'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-10p_g.jpg',
  //       'http://www.murciaturistica.es/webs/murciaturistica/fotos/1/playas/recurso-1-512-6p_g.jpg',
  //     ],
  //     position: [37.58346704814301, -0.973449688081129],
  //     promenade: false,
  //     sea: 0,
  //     slug: 'cala-cortina',
  //     soilType: 'Arena gruesa',
  //     swell: 'Suave',
  //   });
  // });
});
