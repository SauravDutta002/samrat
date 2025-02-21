import { useState } from "react";
import axios from "axios";

function App() {
  const [inputData, setInputData] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const backendURL = "http://localhost:5000/bfhl"; // Change this to your deployed URL when hosting

  const handleSubmit = async () => {
    setError("");
    try {
      const jsonInput = JSON.parse(inputData);
      if (!jsonInput.data || !Array.isArray(jsonInput.data)) {
        setError("Invalid JSON format. Ensure it contains an array inside 'data'.");
        return;
      }

      const response = await axios.post(backendURL, jsonInput);
      setResponseData(response.data);
    } catch (err) {
      setError("Invalid JSON or API error. Check console for details.");
      console.error(err);
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>BFHL Data Processor</h1>

      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON e.g. { "data": ["A", "C", "z", "2"] }'
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      ></textarea>
      <br />

      <button onClick={handleSubmit} style={{ margin: "10px" }}>Submit</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <div>
          <h2>Response:</h2>
          <div>
            <label>
              <input type="checkbox" onChange={() => handleFilterChange("alphabets")} /> Alphabets
            </label>
            <label>
              <input type="checkbox" onChange={() => handleFilterChange("numbers")} /> Numbers
            </label>
            <label>
              <input type="checkbox" onChange={() => handleFilterChange("highest_alphabet")} /> Highest Alphabet
            </label>
          </div>

          <pre>
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(responseData).filter(([key]) =>
                  selectedFilters.includes(key)
                )
              ),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
