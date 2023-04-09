import axios from 'axios';
import { useState, useEffect } from "react";
import { DiaryEntry } from './types'

const URL = 'http://localhost:3030';

const InputForm = () => {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('')

  const showErrorMessage = (message: string) => {
    setTimeout(() => {
      setError('');
    }, 5000)
    setError(message);
  }

  const handleSubmit = async(
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = { date, weather, visibility, comment };

    try {
      await axios.post(URL.concat('/api/diaries'), formData);
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorMessage(error.response?.data);
      } else {
        console.error(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date-input">
        Date:
        &nbsp;
        <input type="date" id="date-input"
          name="date" value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <label htmlFor="weather">
        Weather:
        &nbsp;
        <label htmlFor="sunny">Sunny</label>
        <input type="radio" name="weather"
          id="sunny" onChange={() => setWeather("sunny")}
        />
        &nbsp;
        <label htmlFor="cloudy">Cloudy</label>
        <input type="radio" name="weather"
          id="cloudy" onChange={() => setWeather("cloudy")}
        />
        &nbsp;
        <label htmlFor="windy">Windy</label>
        <input type="radio" name="weather"
          id="windy" onChange={() => setWeather("windy")}
        />
        &nbsp;
        <label htmlFor="rainy">Rainy</label>
        <input type="radio" name="weather"
          id="rainy" onChange={() => setWeather("rainy")}
        />
        &nbsp;
        <label htmlFor="stormy">Stormy</label>
        <input type="radio" name="weather"
          id="stormy" onChange={() => setWeather("stormy")}
        />
        &nbsp;
      </label>
      <label htmlFor="visibility">
        Visibility:
        &nbsp;
        <label htmlFor="great">Great</label>
        <input type="radio" name="visibility"
          id="great" onChange={() => setVisibility("great")}
        />
        &nbsp;
        <label htmlFor="good">Good</label>
        <input type="radio" name="visibility"
          id="good" onChange={() => setVisibility("good")}
        />
        &nbsp;
        <label htmlFor="ok">OK</label>
        <input type="radio" name="visibility"
          id="ok" onChange={() => setVisibility("ok")}
        />
        &nbsp;
        <label htmlFor="poor">Poor</label>
        <input type="radio" name="visibility"
          id="poor" onChange={() => setVisibility("poor")}
        />
        &nbsp;
      </label>
      <label htmlFor="comment">
        Comment:
        &nbsp;
        <input type="text" id="comment"
          name="comment" value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
      {error ? <span className="error"> {error}</span> : null}
    </form>
  )
}

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get(URL.concat('/ping'));
    axios
      .get(URL.concat('/api/diaries'))
      .then(response => setDiaries(response.data))
  }, [])

  return (
    <div className="App">
      <InputForm />
      <table>
        <tbody>
          <tr>
            <th style={{ width: '50px'}}>ID</th>
            <th style={{ width: '150px'}}>DATE</th>
            <th style={{ width: '100px'}}>Weather</th>
            <th style={{ width: '100px'}}>Visibility</th>
          </tr>
          {diaries.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.date}</td>
              <td>{d.weather}</td>
              <td>{d.visibility}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
