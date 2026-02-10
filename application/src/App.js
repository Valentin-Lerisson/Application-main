import React, { useState } from "react";
import "./App.css";
import Bibliotheque from "./Bibliotheque";

function App() {
  const [page, setPage] = useState("jeu");
  const [boxes, setBoxes] = useState(Array(12).fill(false));

  const toggleBox = (index) => {
    const nextBoxes = [...boxes];
    nextBoxes[index] = true;
    setBoxes(nextBoxes);
  };

  const percentage = Math.round(
    (boxes.filter((b) => b).length / boxes.length) * 100,
  );

  if (page === "biblio") {
    return (
      <div className="App">
        <Bibliotheque onBack={() => setPage("jeu")} />
      </div>
    );
  }

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
          {boxes.map((isGreen, i) => (
            <div
              key={i}
              className={`box ${isGreen ? "green" : "red"}`}
              onClick={() => toggleBox(i)}
            ></div>
          ))}
        </div>
        {percentage === 100 && (
          <div className="success-message">
            <h2>Félicitations ! 🎉</h2>
            <img
              src={process.env.PUBLIC_URL + "/logo-bh.png"}
              alt="Logo BH"
              className="final-logo"
            />
          </div>
        )}
        <button className="nav-button" onClick={() => setPage("biblio")}>
          Ouvrir la Bibliothèque →
        </button>
      </div>
    </div>
  );
}

export default App;
