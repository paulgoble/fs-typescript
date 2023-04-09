import { ReactElement } from 'react';
import { Entry } from '../../types';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  let typeSpecificInfo: ReactElement | null = null;
  let sickLeaveInfo: ReactElement | null = null;
  let dischargeInfo: ReactElement | null = null;
  
  switch (entry.type) {
    case "HealthCheck":
      typeSpecificInfo = (
        <>(Rating: {entry.healthCheckRating})</>
      );
      break;
    case "Hospital":
      dischargeInfo = (
        <>
          discharged {entry.discharge.date}: {entry.discharge.criteria}
        </>
      );
      break;
    case "OccupationalHealthcare":
      typeSpecificInfo = (
        <>(Employer: {entry.employerName})</>
      );
      if (entry.sickLeave) {
        sickLeaveInfo = (
          <>
            sick leave start: {entry.sickLeave.startDate} <br />
            sick leave end: {entry.sickLeave.endDate}
          </>
        )
      };
      break;
    default: break;
  }

  return (
    <div className="patient-entry" key={entry.date}>
      <p>
        {entry.date} &nbsp;
        <span style={{ color: 'blue'}}>
          {entry.type} {typeSpecificInfo}
        </span>
        &nbsp; -- [ seen by {entry.specialist} ]
      </p>
      <p style={{ marginLeft: '10px'}}><em>{entry.description}</em></p>
      <p style={{ color: 'blue'}}>{sickLeaveInfo}{dischargeInfo}</p>
      <p>
        {entry.diagnosisCodes?.map((code, i) => (
          <span key={i}>{code} </span>
        ))}
      </p>
    </div>
  )
};

export default EntryDetails;