import React, { useState } from "react";
import "./App.css";

function App() {
  const [boxes, setBoxes] = useState(Array(12).fill(false));

  const toggleBox = (index) => {
    const newBoxes = [...boxes];
    newBoxes[index] = true;
    setBoxes(newBoxes);
  };

  const greenCount = boxes.filter((box) => box === true).length;
  const percentage = Math.round((greenCount / boxes.length) * 100);

  return (
    <div className="App">
      <div className="game-container">
        <h1 className="title">
          Recrutement <span className="brand">Big Happy</span>
        </h1>

        <div className="progress-wrapper">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="percentage-text">{percentage}% complété</span>
        </div>

        <div className="grid">
          {boxes.map((isGreen, index) => (
            <div
              key={index}
              className={`box ${isGreen ? "green" : "red"}`}
              onClick={() => toggleBox(index)}
            ></div>
          ))}
        </div>

        {percentage === 100 && (
          <div className="success-message">
            <h2>Félicitations ! 🎉</h2>
            <p>
              Vous êtes accepté en alternance chez <strong>Big Happy</strong>.
            </p>
            {/* On utilise process.env.PUBLIC_URL pour être sûr que React trouve l'image */}
            <img
              src={process.env.PUBLIC_URL + "/logo-bh.png"}
              alt="Logo Big Happy"
              className="final-logo"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
