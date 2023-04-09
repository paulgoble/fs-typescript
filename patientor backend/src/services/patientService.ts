import patients from '../../data/patients';
import { Patient, NonSensitivePatient, Entry } from '../types';
import { v1 as uuid } from 'uuid';
import { parseGender, parseString, parseRating, parseDiagnosisCodes } from '../utils';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id)
}

const addPatient = (
  newPatient: Patient
): NonSensitivePatient => {
  patients.push(newPatient);
  return {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    gender: newPatient.gender,
    occupation: newPatient.occupation
  };
}

const addEntry = (
  patientId: string,
  entry: Entry
) => {
  patients.forEach((patient) => {
    if (patient.id === patientId) {
      patient.entries.push(entry)
    }
  })
  return entry;
}

const parsePatientData = (
  newPatientData: unknown
): Patient => {
  if (!newPatientData || typeof newPatientData !== 'object') {
    throw new Error('Validation error: wrong data type');
  }

  if ('ssn' in newPatientData && 'name' in newPatientData && 'dateOfBirth' in newPatientData && 'gender' in newPatientData && 'occupation' in newPatientData) {
    const newPatient = {
      id: uuid(),
      ssn: parseString(newPatientData.ssn),
      name: parseString(newPatientData.name),
      dateOfBirth: parseString(newPatientData.dateOfBirth),
      gender: parseGender(newPatientData.gender),
      occupation: parseString(newPatientData.occupation),
      entries: []
    }

    return newPatient;
  }
  throw new Error('Validation error');
}

const parseEntryData = (
  newEntryData: unknown
): Entry => {
  if (!newEntryData || typeof newEntryData !== 'object') {
    throw new Error('Validation error: wrong data type')
  }

  if ('date' in newEntryData && 'specialist' in newEntryData && 'type' in newEntryData && 'description' in newEntryData) {
    const newEntryBase = {
      id: uuid(),
      date: parseString(newEntryData.date),
      specialist: parseString(newEntryData.specialist),
      description: parseString(newEntryData.description)
    }

    let diagnosisCodes: string[] | undefined;
    if ('diagnosisCodes' in newEntryData) {
      diagnosisCodes = parseDiagnosisCodes(newEntryData.diagnosisCodes);
    }

    switch (newEntryData.type) {
      case "HealthCheck":
        if ('healthCheckRating' in newEntryData) {
          return {
            ...newEntryBase,
            type: newEntryData.type,
            healthCheckRating: parseRating(newEntryData.healthCheckRating),
            diagnosisCodes
          };
        }
        break;
      case "OccupationalHealthcare":
        if ('employerName' in newEntryData) {
          let sickLeave: { startDate: string; endDate: string; } | undefined;
          if ('sickLeave' in newEntryData && typeof newEntryData.sickLeave === 'object' && newEntryData.sickLeave !== null && 'startDate' in newEntryData.sickLeave && 'endDate' in newEntryData.sickLeave) {
            sickLeave = {
              startDate: parseString(newEntryData.sickLeave.startDate),
              endDate: parseString(newEntryData.sickLeave.endDate)
            }
          }

          return {
            ...newEntryBase,
            type: newEntryData.type,
            employerName: parseString(newEntryData.employerName),
            diagnosisCodes,
            sickLeave
          };
        }
        break;
      case "Hospital":
        if ('discharge' in newEntryData && typeof newEntryData.discharge === 'object' && newEntryData.discharge !== null && 'date' in newEntryData.discharge && 'criteria' in newEntryData.discharge) {
          return {
            ...newEntryBase,
            type: newEntryData.type,
            discharge: {
              date: parseString(newEntryData.discharge.date),
              criteria: parseString(newEntryData.discharge.criteria)
            },
            diagnosisCodes
          };
        }
        break;
      default:
        throw new Error('Invalid entry type');
    }
  }
  throw new Error('Validation error');
}

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry,
  parsePatientData,
  parseEntryData
};