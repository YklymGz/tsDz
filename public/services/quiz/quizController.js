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
        this.score = 0;
        this.quizData = quizData;
        this.questionsAmount = quizData.questions.length;
        this.answerField = document.querySelector("#answer");
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
    displayGlobalTime(time) {
        this.renderer.setTotalTime(time);
    }
    changeQuestion(step) {
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
