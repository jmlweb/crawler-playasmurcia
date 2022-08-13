import utmToLatLng from './utmToLatLng';

describe('utmToLatLng', () => {
  test('must parse coordinates properly', () => {
    expect(utmToLatLng(663618, 4156810)).toEqual({
      lat: 37.543778129792386,
      lng: -1.1479117523069706,
    });
  });
});
