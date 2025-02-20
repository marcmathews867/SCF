
//References to HTML elements - only id NOT used now is QuestionContainer
const questionElement = document.getElementById("Question");
const answersElement = document.getElementById("Answers");
const startScreen = document.getElementById("StartScreen");
const quizScreen = document.getElementById("QuizScreen");
const gameOverScreen = document.getElementById("GameOverScreen");
const finalScoreElement = document.getElementById("FinalScore");

//Questions array
let questions = [
    "What color is the sky?",
    "What's the coolest dinsosaur?",
    "What does hey man mean?"
];
//Possible answers array
let possibleAnswers = [
    ["Red", "Green", "Blue", "Cyan", "Black"],
    ["T-Rex", "Raptor", "Stego", "D-Rex"],
    ["Remark", "Song", "Response", "All of these"]
];
//below creates a new array of length (3)
let answerScores = new Array(questions.length);

//automate correct answers always to the last index/last possible answer
let correctAnswerIndexes = possibleAnswers.map(subArray => subArray.length - 1);

let currentQuestionIndex = 0;

//Initial function to hide start screen and show quiz screen
function startQuiz() {
    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    quizScreen.style.display = "block";
    currentQuestionIndex = 0;
    answerScores = new Array(questions.length).fill(0);
    setupQuestion();
}

//Primary function that provides questions to click specific answers
function setupQuestion(){
//After final question, a game over screen will appear
    if(currentQuestionIndex >= questions.length){
        //the next line sums the total with .reduce and its three variables
        let finalScore = answerScores.reduce((total, score) => total + (score || 0), 0);
        finalScoreElement.innerHTML = finalScore;
        quizScreen.style.display = "none";
        gameOverScreen.style.display = "block";
        return;
    }
    
    //connects to Question and Answer button
    questionElement.innerHTML = questions[currentQuestionIndex];
    answersElement.innerHTML = "";

    possibleAnswers[currentQuestionIndex].forEach(element => {
        let thisAnswer = document.createElement("li");
        thisAnswer.innerHTML = element;
        thisAnswer.onclick = (event) => {
            let selectedAnswer = event.target.innerHTML;
            let correctAnswer = possibleAnswers[currentQuestionIndex][correctAnswerIndexes[currentQuestionIndex]];

            if (selectedAnswer === correctAnswer) {
                answerScores[currentQuestionIndex] = 1;
            } else {
                answerScores[currentQuestionIndex] = 0;
            }

            currentQuestionIndex++;
            setupQuestion();
        };
        answersElement.appendChild(thisAnswer);
        });
}

function restartQuiz() {
    gameOverScreen.style.display = "none";
    startScreen.style.display = "block";
}

function quitQuiz() {
    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    quizScreen.style.display = "none";
    restartQuiz();
}

