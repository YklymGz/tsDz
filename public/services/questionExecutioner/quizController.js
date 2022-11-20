import { Timer } from "../timer/timer";
export class QuizGame {
    constructor(quizData) {
        //   timer for whole quiz
        this.generalTimer = new Timer();
        //   timer for one question
        this.localTimer = new Timer();
        this.currentQuestionIdx = 0;
        this.titleNode = document.querySelector("#quizTitle");
        this.questionNode = document.querySelector("#question");
        this.questionTimeNode = document.querySelector("#questionTime");
        this.totalTimeNode = document.querySelector("#totalTime");
        this.backBtn = document.querySelector("#back");
        this.nextBtn = document.querySelector("#next");
        this.quizData = quizData;
    }
    setRenderedQuestion(questionIdx) {
        const questionData = this.quizData.questions[questionIdx];
        if (!questionData) {
            throw "wrong question idx";
        }
        this.questionNode.innerHTML = questionData.;
    }
    initNextBtn() {
        this.nextBtn.addEventListener("click", (e) => {
            // stopCounter();
            this.localTimer.stop();
            this.currentQuestionIdx += 1;
            //   displayQuestion();
        });
    }
    startGame() {
        this.titleNode.innerHTML = this.quizData.title;
        this.generalTimer.continue((newTime) => (this.totalTimeNode.innerHTML = `${newTime}`));
    }
}
