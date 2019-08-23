import React from "react";
import "../styles/main.sass";

const Main = ({
  currentQuestionIndex,
  questions,
  shuffledAnswers,
  click,
  answered
}) => {
  let btns = shuffledAnswers.map(btn => {
    return (
      <button
        key={btn.answer}
        correct={btn.correct.toString()}
        onClick={!answered ? click : null}
        className={btn.class}
        dangerouslySetInnerHTML={{
          __html: `${btn.answer}`
        }}
      />
    );
  });
  return (
    <main className="main">
      <section className="quiz">
        <h1
          dangerouslySetInnerHTML={{
            __html: `${questions[currentQuestionIndex].question}`
          }}
        />
        {btns}
      </section>
    </main>
  );
};

export default Main;
