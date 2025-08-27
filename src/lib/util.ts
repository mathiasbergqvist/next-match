import { differenceInYears } from 'date-fns';

export const calculateAge = (birthDate: Date): number =>
  differenceInYears(new Date(), birthDate);
