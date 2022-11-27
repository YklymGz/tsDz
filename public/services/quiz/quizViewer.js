// responsible for displaying parts of quiz
class QuizViewer {
    constructor() {
        this.titleNode = document.querySelector("#quizTitle");
        this.questionNode = document.querySelector("#question");
        this.questionTimeNode = document.querySelector("#questionTime");
        this.totalTimeNode = document.querySelector("#totalTime");
        this.scoreNode = document.querySelector("#score");
        // this.backBtn = document.querySelector("#back")! as HTMLButtonElement;
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
    // initPrevBtn(cb: () => void) {
    //   this.backBtn.addEventListener("click", cb);
    // }
    displayQuestion(question) {
        this.questionNode.innerHTML = question.formula;
    }
    setScore(score = 0) {
        console.log("set score", score);
        this.scoreNode.innerText = String(score);
    }
}
export { QuizViewer };
