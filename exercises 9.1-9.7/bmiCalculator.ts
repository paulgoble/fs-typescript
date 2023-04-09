interface BmiValues {
  height: number;
  weight: number;
}

const parseArgs = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2;
  let response: string | undefined;

  if (bmi < 18.5) {
    response = 'Underweight';
  } else if (bmi < 25) {
    response = 'Normal (healthy weight)';
  } else if (bmi < 30) {
    response = 'Overweight';
  } else {
    response = 'Abnormal (obese)';
  }

  return response;
}

try {
  const { height, weight } = parseArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}