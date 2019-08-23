import React, { Component } from "react";
import "../styles/quiz.sass";
import StartPage from "./StartPage";
import Main from "./Main";
import ScorePage from "./ScorePage";

class Quiz extends Component {
  state = {
    dataReady: false,
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
    quizStarted: false,
    currentQuestionIndex: 0,
    shuffledAnswers: [],
    correctAnswersCount: 0,
    answered: false,
    quizCompleted: false,
    scorePageHeader: [{ color: "", text: "" }]
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
        let questions = this.state.questions.concat(response.results);
        this.setState({ questions });
        this.shuffleAnswers(response.results);
      });
    const counter = setInterval(() => {
      if (this.state.questions.length > 0) {
        this.setState({ dataReady: true });
        clearInterval(counter);
      }
    }, 500);
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

  shuffleAnswers = array => {
    let answers = array[this.state.currentQuestionIndex].incorrect_answers.map(
      answer => {
        return {
          answer: answer,
          correct: false,
          class: ""
        };
      }
    );
    answers.push({
      answer: array[this.state.currentQuestionIndex].correct_answer,
      correct: true,
      class: ""
    });
    for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    this.setState({ shuffledAnswers: answers });
  };

  handleAnswerBtns = e => {
    this.setState({ answered: true });
    if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
      setTimeout(() => {
        this.setState({
          currentQuestionIndex: this.state.currentQuestionIndex + 1
        });
        this.shuffleAnswers(this.state.questions);
      }, 1000);
    } else if (
      this.state.questions.length ===
      this.state.currentQuestionIndex + 1
    ) {
      setTimeout(() => {
        const oneThird = parseInt(this.state.questions.length / 3);
        const scorePageHeader = this.state.scorePageHeader.map(head => {
          if (this.state.correctAnswersCount <= oneThird) {
            head.color = "red";
            head.text = "Too bad...";
          } else if (this.state.correctAnswersCount <= oneThird * 2) {
            head.color = "yellow";
            head.text = "Not bad.";
          } else if (
            this.state.correctAnswersCount === this.state.questions.length
          ) {
            head.color = "green";
            head.text = "PERFECT SCORE!!!";
          } else {
            head.color = "green";
            head.text = "Nice score!";
          }
          return head;
        });
        this.setState({ scorePageHeader, quizCompleted: true });
      }, 1000);
    }
    let shuffledAnswers = this.state.shuffledAnswers.map(answer => {
      if (answer.answer === e.target.textContent) {
        answer.class = "red";
      }
      if (answer.correct === true) {
        answer.class = "green";
      }

      return answer;
    });
    this.setState({ shuffledAnswers });
    if (e.target.attributes.correct.value === "true") {
      this.setState({
        correctAnswersCount: this.state.correctAnswersCount + 1
      });
    }
    setTimeout(() => {
      this.setState({
        answered: false
      });
    }, 1000);
  };
  handleNewGame = () => {
    this.setState({
      dataReady: false,
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
      quizStarted: false,
      currentQuestionIndex: 0,
      shuffledAnswers: [],
      correctAnswersCount: 0,
      answered: false,
      scorePageHeader: [{ color: "", text: "" }]
    });
    setTimeout(() => {
      this.setState({ quizCompleted: false });
    }, 500);
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
        {this.state.dataReady && (
          <Main
            currentQuestionIndex={this.state.currentQuestionIndex}
            questions={this.state.questions}
            shuffledAnswers={this.state.shuffledAnswers}
            click={this.handleAnswerBtns}
            answered={this.state.answered}
          />
        )}
        {this.state.quizCompleted && (
          <ScorePage
            correctAnswers={this.state.correctAnswersCount}
            questions={this.state.questions}
            header={this.state.scorePageHeader}
            newGame={this.handleNewGame}
            dataReady={this.state.dataReady}
          />
        )}
      </>
    );
  }
}

export default Quiz;
