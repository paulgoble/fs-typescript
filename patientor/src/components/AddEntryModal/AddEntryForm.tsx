import { useState, SyntheticEvent } from "react";

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { EntryFormValues, EntryType, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface MenuOption {
  value: EntryType | HealthCheckRating;
  label: string;
}

const entryOptions: MenuOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

const healthOptions: MenuOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical" }
]

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState(EntryType.HealthCheck);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [discharged, setDischarged] = useState('');
  const [criteria, setCriteria] = useState('');
  const [showSickLeave, setShowSickLeave] = useState(false)
  const [leaveStart, setLeaveStart] = useState('')
  const [leaveEnd, setLeaveEnd] = useState('')

  const specialist = "MD House";

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryType).find(g => g.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();

    switch(type) {
      case EntryType.Hospital:
        onSubmit({
          type, date, specialist, description, discharge: {
            date: 'test', criteria: 'test'
          }
        });
        break;
      case EntryType.Occupational:
        if (showSickLeave) {
          onSubmit({
            type, date, specialist, description, employerName,
            sickLeave: {
              startDate: leaveStart,
              endDate: leaveEnd
            }
          });
        } else {
          onSubmit({
            type, date, specialist, description, employerName
          });
        }
        
        break;
      case EntryType.HealthCheck:
        onSubmit({
          type, date, specialist, description, healthCheckRating
        });
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <InputLabel>Entry Type</InputLabel>
        <Select
          size="small"
          fullWidth
          value={type}
          onChange={onEntryTypeChange}
        >
        {entryOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
        
        {type === EntryType.Occupational ? 
        <TextField
          style={{ marginTop: 23 }}
          label="Employer Name"
          size="small"
          fullWidth required
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        /> : null}

        {/* Custom Form Elements: Health Check */}
        
        {type === EntryType.HealthCheck ? 
        <>
          <InputLabel id="health">Health</InputLabel>
          <Select
            size="small"
            labelId="health"
            fullWidth
            value={healthCheckRating.toString()}
            onChange={({ target }) => setHealthCheckRating(Number(target.value))}
          >
          {healthOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label
            }</MenuItem>
          )}
          </Select>
        </> : null}

        {/* Common Form Elements */}
        
        <TextField
          style={{ marginTop: 23 }}
          label="Specialist"
          size="small"
          fullWidth 
          value={specialist}
        />
        <TextField
          style={{ marginTop: 23 }}
          label="Description"
          size="small" multiline
          fullWidth required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <div style={
          { marginTop: 12.5, marginBottom: 12.5, float: 'left' }
        }>
          <InputLabel id="entry-date">Entry Date</InputLabel>
          <TextField
            type="date"
            size="small"
            required
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>

        {/* Custom Form Elements: Occupational */}

        {type === EntryType.Occupational && !showSickLeave ?
        <>
        <Button
          style={{ marginTop: 38, float: 'right' }}
          onClick={() => setShowSickLeave(true)}
        >
          Add Sick Leave
        </Button>
        </> : null}

        {showSickLeave ?
        <>
        <div style={
          { marginTop: 12.5, marginLeft: 33, float: 'left' }
        }>
          <InputLabel id="start-date">Start Date</InputLabel>
          <TextField
            type="date"
            size="small"
            required
            value={leaveStart}
            onChange={({ target }) => setLeaveStart(target.value)}
          />
        </div>
        <div style={
          { marginTop: 12.5, float: 'right' }
        }>
          <InputLabel id="end-date">End Date</InputLabel>
          <TextField
            type="date"
            size="small"
            required
            value={leaveEnd}
            onChange={({ target }) => setLeaveEnd(target.value)}
          />
        </div>
        </> : null}

        {/* Custom Form Elements: Hospital */}

        {type === EntryType.Hospital ? 
        <>
        <div style={
          { marginTop: 11.5, marginBottom: 15, float: 'right' }
        }>
          <InputLabel id="discharged-date">Date Discharged</InputLabel>
          <TextField
            type="date" size="small"
            value={discharged}
            onChange={({ target }) => setDischarged(target.value)}
          />
          </div>
        <TextField
          style={{ marginTop: 5 }}
          label="Discharge Criteria"
          size="small"
          fullWidth
          value={criteria}
          onChange={({ target }) => setCriteria(target.value)}
        />
        </> : null}

        {/* Form Controls */}

        <Grid style={{ clear: 'both' }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ marginTop: 23, float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{ marginTop: 23, float: "right" }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;