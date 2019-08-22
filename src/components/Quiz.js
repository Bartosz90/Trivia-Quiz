import React, { Component } from "react";
import "../styles/quiz.sass";
import StartPage from "./StartPage";

// const Question = ({ question, correct, answer }) => {
//   return (
//     <div>
//       <h1 dangerouslySetInnerHTML={{ __html: `${question}` }} />
//       <h2>{correct}</h2>
//       <h3>{answer[0]}</h3>
//       <h3>{answer[1]}</h3>
//       <h3>{answer[2]}</h3>
//     </div>
//   );
// };

class Quiz extends Component {
  state = {
    questions: [],
    question: "",
    answer: "",
    difficulty: "&difficulty=easy",
    category: "",
    amount: 5,
    difficultyBtns: [
      { id: 0, name: "easy", active: true },
      { id: 1, name: "medium", active: false },
      { id: 2, name: "hard", active: false },
      { id: 3, name: "mixed", active: false }
    ],
    questionAmount: [
      { id: 0, amount: 5, active: true },
      { id: 1, amount: 10, active: false },
      { id: 2, amount: 15, active: false }
    ],
    removeStartSection: false,
    quizStarted: false
  };

  handleDataBtn = () => {
    this.setState({
      questions: [],
      removeStartSection: !this.state.removeStartSection
    });
    setTimeout(() => {
      this.setState({ quizStarted: true });
    }, 1000);
    fetch(
      `https://opentdb.com/api.php?amount=${this.state.amount}${
        this.state.difficulty
      }&type=multiple${this.state.category}`
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response.results);
        let questions = this.state.questions.concat(response.results);
        this.setState({ questions });
      });
  };

  handleSettings = (e, option) => {
    if (option === "category") {
      if (e.target.value === "0") {
        this.setState({ category: "" });
      } else {
        this.setState({ category: `&category=${e.target.value}` });
      }
    } else if (option === "difficulty") {
      let btns = this.state.difficultyBtns.map(btn => {
        if (btn.active) {
          btn.active = false;
        }
        if (e.target.name === btn.name) {
          btn.active = true;
        }
        return btn;
      });
      this.setState({ difficultyBtns: btns });
      if (e.target.name === "mixed") {
        this.setState({ difficulty: "" });
      } else {
        this.setState({ difficulty: `&difficulty=${e.target.name}` });
      }
    } else if (option === "amount") {
      let btns = this.state.questionAmount.map(btn => {
        if (btn.active) {
          btn.active = false;
        }
        if (e.target.textContent === btn.amount.toString()) {
          btn.active = true;
        }
        return btn;
      });
      this.setState({ questionAmount: btns });
      this.setState({ amount: e.target.textContent });
    }
  };

  render() {
    return (
      <>
        {!this.state.quizStarted && (
          <StartPage
            handleSettings={this.handleSettings}
            click={this.handleDataBtn}
            difficulty={this.state.difficultyBtns}
            questionAmount={this.state.questionAmount}
            removeStartSection={this.state.removeStartSection}
          />
        )}
        {/* <div className="App">
        <button onClick={this.handleDataBtn}>get data</button>
        <button onClick={() => this.handleDifficulty("easy")}>Easy</button>
        <button onClick={() => this.handleDifficulty("medium")}>Medium</button>
        <button onClick={() => this.handleDifficulty("hard")}>Hard</button>

        {this.state.data.length > 0 && (
          // <Question
          //   question={this.state.data[0].results[0].question}
          //   answer={this.state.data[0].results[0].incorrect_answers}
          //   correct={this.state.data[0].results[0].correct_answer}
          // />
        // )}
      </div> */}
      </>
    );
  }
}

export default Quiz;
