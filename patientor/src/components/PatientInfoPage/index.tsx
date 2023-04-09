import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EntryFormValues, Patient } from "../../types";
import { Button } from "@mui/material";

import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientInfoPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const patientId = useParams().id;

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!patient || !patientId) throw new Error();
    const addedEntry = await patientService.addEntry(patientId, values);
    setPatient({
      ...patient,
      entries: [
        ...patient.entries,
        addedEntry
      ]
    })
    closeModal();
  }

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(patientId);
      setPatient(patient);
    };
    fetchPatient();
  }, [patientId])

  if (!patient) return null;
  const num = patient.entries.length;

  return(
    <div className="patient-info">
      <h2>{patient.name}</h2>
      DOB: {patient.dateOfBirth}<br />
      Gender: {patient.gender}
      <h3>{num} entr{(num !== 1) ? 'ies' : 'y'}</h3>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add Entry
      </Button>
      {patient.entries.map((entry, index) => (
        <EntryDetails entry={entry} key={index}/>
      ))}
    </div>
  )
};

export default PatientInfoPage;