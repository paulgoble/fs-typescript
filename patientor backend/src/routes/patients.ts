import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatients();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) {
    res.sendStatus(404);
  }
  res.send(patient)
})

router.post('/:id/entries', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) {
    res.sendStatus(404);
  } else {
    const newEntryData = req.body;
    try {
      const newEntry = patientService.parseEntryData(newEntryData);
      const addedEntry = patientService.addEntry(patient.id, newEntry)

      res.send(addedEntry);
    } catch(error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  }
})

router.post('/', (req, res) => {
  const newPatientData = req.body;
  try {
    const newPatient = patientService.parsePatientData(newPatientData);
    const addedPatient = patientService.addPatient(newPatient);

    res.send(addedPatient);
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

export default router;