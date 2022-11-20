import quiz_data from "./quiz_data/quiz_data.js";
import { QuizGame } from "./services/quiz/quizController.js";
console.log(quiz_data);
const quiz = new QuizGame(quiz_data);
quiz.startGame();
