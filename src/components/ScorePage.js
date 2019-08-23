import React from "react";
import "../styles/score.sass";

const ScorePage = ({
  correctAnswers,
  questions,
  header,
  newGame,
  dataReady
}) => {
  const score = header.map(text => {
    return (
      <h1 key={text.text} style={{ color: `${text.color}` }} className="text">
        {text.text}
      </h1>
    );
  });
  return (
    <section
      className="score"
      style={
        dataReady
          ? {
              transform: "translateY(-100%)",
              animation: "slideDown .5s ease-in-out forwards"
            }
          : { animation: "slideUp .5s ease-in-out forwards" }
      }
    >
      <h1>Correct answers: </h1>
      <h1>
        <span>{correctAnswers}</span> / {questions.length}
      </h1>
      {score}
      <button onClick={newGame}>new game</button>
    </section>
  );
};

export default ScorePage;
