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

  constructor(quizData: Quiz) {
    this.quizData = quizData;
    this.questionsAmount = quizData.questions.length;
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

  changeQuestion(step: -1 | 1) {
    this.localTimer
      .stop()
      .reset()
      .start((val) => this.displayLocalTime(val));
    this.currentQuestionIdx += step;
    if (this.currentQuestionIdx >= this.questionsAmount) {
      this.finishGame();
    }

    this.setCurrQuestion(this.currentQuestionIdx);
    this.displayQuestion();
  }

  initQuestionButtons() {
    this.renderer.initNextBtn(() => this.changeQuestion(1));
    this.renderer.initPrevBtn(() => this.changeQuestion(-1));
  }

  startGame() {
    // init dom
    this.renderer.setTitle(this.quizData.title);
    this.initQuestionButtons();

    // init timer
    this.generalTimer.start((time) => this.renderer.setTotalTime(time));

    this.setCurrQuestion(0);
    this.localTimer.start((val) => this.displayLocalTime(val));

    this.displayQuestion();
  }

  finishGame() {
    this.currentQuestionIdx = 0;
    this.generalTimer.stop().reset();
    alert("game finished");
    alert("game restarted");
    this.startGame();
  }
}
