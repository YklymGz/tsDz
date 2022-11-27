import { Question } from "../../quiz_data/quiz";

// responsible for displaying parts of quiz
class QuizViewer {
  // dom elements
  private titleNode!: HTMLHeadElement;
  private questionNode!: HTMLSpanElement;
  private questionTimeNode!: HTMLSpanElement;
  private totalTimeNode!: HTMLSpanElement;
  // private backBtn!: HTMLButtonElement;
  private nextBtn!: HTMLButtonElement;

  private scoreNode!: HTMLSpanElement;

  constructor() {
    this.titleNode = document.querySelector("#quizTitle") as HTMLHeadElement;
    this.questionNode = document.querySelector("#question")! as HTMLSpanElement;
    this.questionTimeNode = document.querySelector(
      "#questionTime"
    )! as HTMLSpanElement;
    this.totalTimeNode = document.querySelector(
      "#totalTime"
    )! as HTMLSpanElement;
    this.scoreNode = document.querySelector("#score")! as HTMLSpanElement;

    // this.backBtn = document.querySelector("#back")! as HTMLButtonElement;
    this.nextBtn = document.querySelector("#next")! as HTMLButtonElement;
    console.log("totalTimeNode", this.totalTimeNode);
  }

  setTotalTime(newTime = 0) {
    this.totalTimeNode.innerHTML = `${newTime}`;
  }

  setLocalTime(newTime = 0) {
    this.questionTimeNode.innerHTML = `${newTime}`;
  }

  setTitle(title: string) {
    this.titleNode.innerHTML = title;
  }

  initNextBtn(cb: () => void) {
    this.nextBtn.addEventListener("click", cb);
  }

  // initPrevBtn(cb: () => void) {
  //   this.backBtn.addEventListener("click", cb);
  // }

  displayQuestion(question: Question) {
    this.questionNode.innerHTML = question.formula;
  }

  setScore(score: number = 0) {
    console.log("set score", score);

    this.scoreNode.innerText = String(score);
  }
}

export { QuizViewer };
