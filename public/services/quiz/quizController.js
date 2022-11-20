import { Timer } from "../timer/timer.js";
import { QuizViewer } from "./quizViewer.js";
// responsible for quiz logic
export class QuizGame {
    constructor(quizData) {
        //   timer for whole quiz
        this.generalTimer = new Timer();
        //   timer for one question
        this.localTimer = new Timer();
        this.currentQuestionIdx = 0;
        this.questionsAmount = 0;
        this.renderer = new QuizViewer();
        this.quizData = quizData;
        this.questionsAmount = quizData.questions.length;
    }
    // setter for current question
    setCurrQuestion(questionIdx) {
        const questionData = this.quizData.questions[questionIdx];
        if (!questionData) {
            throw "wrong question idx";
        }
        this.currQuestion = questionData;
    }
    displayQuestion() {
        this.renderer.displayQuestion(this.currQuestion);
    }
    displayLocalTime(time) {
        this.renderer.setLocalTime(time);
    }
    changeQuestion(step) {
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
