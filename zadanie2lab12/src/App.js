import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [sum, setSum] = useState(0);
  const [average, setAverage] = useState(0);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const number = parseFloat(inputValue);

    if (!isNaN(number)) {
      setNumbers([...numbers, number]);
      setSum(sum + number);
      setAverage((sum + number) / (numbers.length + 1));
    }

    setInputValue("");
  };

  return (
    <div className="App">
      <h1>Suma i Średnia Liczb</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Wprowadź liczbę:
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <button type="submit">Dodaj</button>
      </form>
      <div>
        <p>Suma: {sum}</p>
        <p>Średnia: {average.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;
