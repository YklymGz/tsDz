import quiz_data from "./quiz_data/quiz_data.js";
import { QuizGame } from "./services/quiz/quizController.js";
const quiz = new QuizGame(quiz_data);
quiz.startGame();
