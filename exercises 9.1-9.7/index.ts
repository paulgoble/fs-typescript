import express from 'express';
const app = express();
app.use(express.json())

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({ weight: Number(weight), height: Number(height), bmi });
  } else {
    res.json({ error: "malformatted parameters" });
  }
  
})

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    res.json({ error: "parameters missing" })
  }
  if (!isNaN(Number(target)) && Array.isArray(daily_exercises)) {
    const dailyExerciseHours = daily_exercises.map((arg: any) => Number(arg));
    if (dailyExerciseHours.includes(NaN)) {
      res.json({ error: "malformatted parameters" });
    } else {
      const data = calculateExercises(target, dailyExerciseHours)
    res.json({ data });
    }
  } else {
    res.json({ error: "malformatted parameters" });
  }
})

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});