import { RawBeach } from '../../shared/types';

const OCCUPATION_TRANSLATION = {
  Bajo: 'l',
  Medio: 'm',
  Alto: 'h',
} as const;

const parseOccupation = (occupation: RawBeach['Ocupación']) =>
  OCCUPATION_TRANSLATION[occupation] || OCCUPATION_TRANSLATION.Medio;

export default parseOccupation;
