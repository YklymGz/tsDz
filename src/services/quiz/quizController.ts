import { Question, Quiz } from "../../quiz_data/quiz.js";
import { Timer } from "../timer/timer.js";
import { QuizViewer } from "./quizViewer.js";

// responsible for quiz logic
export class QuizGame {
  //   timer for whole quiz
  private generalTimer = new Timer();

  //   timer for one question
  private localTimer = new Timer();

  private currentQuestionIdx = 0;
  private currQuestion!: Question;
  private questionsAmount = 0;

  // outer data
  private quizData: Quiz;

  private renderer = new QuizViewer();

  private score = 0;

  private answerField!: HTMLInputElement;

  constructor(quizData: Quiz) {
    this.quizData = quizData;
    this.questionsAmount = quizData.questions.length;

    this.answerField = document.querySelector("#answer")! as HTMLInputElement;
  }

  // setter for current question
  setCurrQuestion(questionIdx: number) {
    const questionData = this.quizData.questions[questionIdx];
    if (!questionData) {
      throw "wrong question idx";
    }
    this.currQuestion = questionData;
  }

  displayQuestion() {
    this.renderer.displayQuestion(this.currQuestion);
  }

  displayLocalTime(time: number) {
    this.renderer.setLocalTime(time);
  }

  displayGlobalTime(time: number) {
    this.renderer.setTotalTime(time);
  }

  changeQuestion(step: -1 | 1) {
    // timers
    this.localTimer
      .stop()
      .reset()
      .start((val) => this.displayLocalTime(val));
    this.generalTimer.stop().start((val) => this.displayGlobalTime(val));

    this.currentQuestionIdx += step;

    // check answer
    this.checkAnswer();

    if (this.currentQuestionIdx >= this.questionsAmount) {
      this.finishGame();
    }

    // iterate further
    this.setCurrQuestion(this.currentQuestionIdx);
    this.displayQuestion();
    this.answerField.value = "";
  }

  checkAnswer() {
    const answer = this.answerField.value;
    const isCorrectAnswer = answer === String(this.currQuestion.answer);

    if (isCorrectAnswer) {
      this.score += 1;
      this.renderer.setScore(this.score);
    }
  }

  initQuestionButtons() {
    this.renderer.initNextBtn(() => this.changeQuestion(1));
  }

  startGame(isFirstInit = true) {
    // init dom
    this.renderer.setTitle(this.quizData.title);
    this.renderer.setScore(this.score);

    // fix restart game
    if (isFirstInit) {
      this.initQuestionButtons();
    }

    // init timer
    this.generalTimer.start((val) => this.displayGlobalTime(val));

    this.setCurrQuestion(0);
    this.localTimer.start((val) => this.displayLocalTime(val));

    this.displayQuestion();
  }

  finishGame() {
    //
    alert(`game finished, your score ${this.score}`);

    // clear values
    this.generalTimer.stop().reset();
    this.localTimer.stop().reset();

    // restart
    alert("game will be restarted");

    this.currentQuestionIdx = 0;
    this.score = 0;

    this.startGame(false);
  }
}
