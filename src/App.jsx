import { useState } from "react";
import axios from "axios";

function App() {
  const [mistake, setMistake] = useState("");
  const [type, setType] = useState("Grammar");
  const [exercise, setExercise] = useState("");

  const handleGenerate = async () => {
    if (!mistake.trim()) {
      alert("Please enter a mistake first!");
      return;
    }

    try {
      const res = await axios.post('https://english-practice-backend.onrender.com/generate', {

        mistake,
        type,
      });

      console.log(res.data);

      setExercise(res.data.exercise);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while generating exercise.");
    }
  };

  
  const renderExercise = () => {
    if (!exercise) return null;

    const parts = exercise.split('Exercises:');
    const explanation = parts[0]?.replace('Explanation:', '').trim();
    const exercises = parts[1]?.trim().split('\n') || [];

    return (
      <div style={{ marginTop: "2rem" }}>
        <h2>Explanation</h2>
        <p style={{ fontSize: "18px", marginBottom: "1rem" }}>{explanation}</p>

        <h2>Exercises</h2>
        <ol style={{ fontSize: "18px" }}>
          {exercises.map((line, index) => {
            const cleanLine = line.replace(/^\d+\.\s*/, "").trim();
            return <li key={index}>{cleanLine}</li>;
          })}
        </ol>
      </div>
    );
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1>English Practice Generator</h1>

      <textarea
        placeholder="Paste the student's mistake here"
        value={mistake}
        onChange={(e) => setMistake(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "1rem", fontSize: "16px" }}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ marginBottom: "1rem", fontSize: "16px" }}
      >
        <option>Grammar</option>
        <option>Pronunciation</option>
        <option>Vocabulary</option>
      </select>

      <br />

      <button
        onClick={handleGenerate}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Generate Exercise
      </button>

      {renderExercise()}
    </div>
  );
}

export default App;

