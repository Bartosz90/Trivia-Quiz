import React from "react";
import "../styles/start-page.sass";
import brain from "../images/brain.png";
import idea from "../images/idea.png";

const StartPage = ({
  handleSettings,
  click,
  difficulty,
  questionAmount,
  removeStartSection
}) => {
  const categoriesDataBase = [
    { id: 0, name: "All categories" },
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Books" },
    { id: 11, name: "Film" },
    { id: 12, name: "Music" },
    { id: 13, name: "Musical and Theatres" },
    { id: 14, name: "Television" },
    { id: 15, name: "Video Games" },
    { id: 16, name: "Board Games" },
    { id: 17, name: "Science and Nature" },
    { id: 18, name: "Science: Computers" },
    { id: 19, name: "Science: Math" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    { id: 29, name: "Comics" },
    { id: 30, name: "Gadgets" },
    { id: 31, name: "Anime and Manga" },
    { id: 32, name: "Cartoons and Animation" }
  ];

  const categorySelect = categoriesDataBase.map(category => {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  });

  const difficultyBtns = difficulty.map(btn => {
    return (
      <button
        key={btn.id}
        name={btn.name}
        onClick={e => handleSettings(e, "difficulty")}
        className={btn.active ? "active" : ""}
      >
        {btn.name}
      </button>
    );
  });

  const amountBtns = questionAmount.map(btn => {
    return (
      <button
        key={btn.id}
        onClick={e => handleSettings(e, "amount")}
        className={btn.active ? "active" : ""}
        amount={btn.amount}
      >
        {btn.amount}
      </button>
    );
  });
  return (
    <section
      className={removeStartSection ? "disappear start-page" : "start-page"}
    >
      <header className="header">
        <div className="brainContainer">
          <img src={brain} alt="brain" className="brain" />
          <img src={idea} alt="lightbulb" className="idea" />
        </div>
        <h1 className="letters">
          <span>t</span>
          <span>r</span>
          <span>i</span>
          <span>v</span>
          <span>i</span>
          <span>a</span>
        </h1>
        <h1 className="letters-2">quiz</h1>
        <p>
          <a
            href="https://bartosz90.github.io/Portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by B. Krupa
          </a>
        </p>
      </header>
      <h4 className="credits">
        questions delivered by{" "}
        <a
          href="https://opentdb.com/api_config.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          open trivia db
        </a>
      </h4>

      <div className="inputs">
        <h3>choose category:</h3>
        <select onChange={e => handleSettings(e, "category")}>
          {categorySelect}
        </select>
      </div>

      <div className="inputs">
        <h3>choose difficulty:</h3>
        {difficultyBtns}
      </div>

      <div className="inputs">
        <h3>choose question amount:</h3>
        {amountBtns}
      </div>
      <div className="startContainer">
        <button onClick={click}>start</button>
      </div>
    </section>
  );
};

export default StartPage;
