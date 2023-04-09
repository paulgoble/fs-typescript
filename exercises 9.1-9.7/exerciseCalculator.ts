interface Arguments {
  target: number;
  dailyExerciseHours: number[];
}

const parseArgs = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const dailyExerciseHours = args.slice(3).map((arg) => Number(arg))


  if (!isNaN(Number(args[2])) && !dailyExerciseHours.includes(NaN)) {
    return {
      target: Number(args[2]),
      dailyExerciseHours
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export interface ReturnObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  target: number,
  dailyExerciseHours: number[]
): ReturnObject => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((num) => num > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength
  
  let rating: ReturnObject['rating'];
  let ratingDescription: ReturnObject['ratingDescription']

  if (average > target) {
    rating = 3;
    ratingDescription = 'well done keep up the hard work'
  } else if (average > target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 1;
    ratingDescription = 'you must try harder to see progress'
  }

  const success = rating === 3;

  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  }
}

try {
  const { target, dailyExerciseHours } = parseArgs(process.argv);
  console.log(calculateExercises(target, dailyExerciseHours))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}