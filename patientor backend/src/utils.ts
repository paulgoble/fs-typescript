import { Gender, Diagnosis, HealthCheckRating } from './types';

export const parseString = (input: unknown): string => {
  if (typeof input === 'string') return input;
  throw new Error(`${input} is not a string!`);
}

export const parseGender = (input: unknown): Gender => {
  const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param)
  }
  if (input && typeof input === 'string' && isGender(input)) {
    return input
  }
  throw new Error(`${input} is not a valid parameter!`)
}

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (Array.isArray(object)) {
    // we will just trust the data to be in correct form
    return object as Array<Diagnosis['code']>;
  }
  return [] as Array<Diagnosis['code']>;
}

export const parseRating = (input: unknown): HealthCheckRating => {
  if (typeof input === 'number') {
    if (input === 0 || input === 1 || input === 2 || input === 3)
    return input;
  };
  throw new Error(`${input} is not a valid rating`);
};