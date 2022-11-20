// responsible for displaying parts of quiz
class QuizViewer {
    constructor() {
        this.titleNode = document.querySelector("#quizTitle");
        this.questionNode = document.querySelector("#question");
        this.questionTimeNode = document.querySelector("#questionTime");
        this.totalTimeNode = document.querySelector("#totalTime");
        this.backBtn = document.querySelector("#back");
        this.nextBtn = document.querySelector("#next");
        console.log("totalTimeNode", this.totalTimeNode);
    }
    setTotalTime(newTime = 0) {
        this.totalTimeNode.innerHTML = `${newTime}`;
    }
    setLocalTime(newTime = 0) {
        this.questionTimeNode.innerHTML = `${newTime}`;
    }
    setTitle(title) {
        this.titleNode.innerHTML = title;
    }
    initNextBtn(cb) {
        this.nextBtn.addEventListener("click", cb);
    }
    initPrevBtn(cb) {
        this.backBtn.addEventListener("click", cb);
    }
    displayQuestion(question) {
        this.questionNode.innerHTML = question.formula;
    }
}
export { QuizViewer };
