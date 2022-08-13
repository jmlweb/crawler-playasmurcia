import { RawBeach } from '../../shared/types';

const injectFallbacks = (rawBeach: RawBeach) => {
  if (rawBeach.Nombre === 'Cala Canalicas') {
    rawBeach.Longitud = '37.4318528';
    rawBeach.Latitud = '-1.5091859';
  } else if (rawBeach.Nombre === 'Playa de Gollerón (Cala del Turco)') {
    rawBeach.Longitud = '37.6545228';
    rawBeach.Latitud = '-0.734669';
  } else if (rawBeach.Nombre === 'Playa de La Gola') {
    rawBeach.Longitud = '37.6506976';
    rawBeach.Latitud = '-0.7249991';
  }

  if (rawBeach.Nombre === 'Playa del Saladar' || rawBeach.Nombre === 'Playa El Gachero') {
    rawBeach.Mar = 'Mar Mediterráneo';
  } else if (rawBeach.Nombre === 'Playa de Gollerón (Cala del Turco)') {
    rawBeach.Mar = 'Mar Menor';
  }
  return rawBeach;
};

export default injectFallbacks;
