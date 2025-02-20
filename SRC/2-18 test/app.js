
// Function to change color when button is clicked
function changeColor() {
    //alert("Function is running!"); 
    document.getElementById("text").style.color = "red";
}

// QUESTION-related setup
const questionElement = document.getElementById("Question");
let questions = [
    "What color is the sky?",
    "What's the coolest dinosaur?",
    "What is 'Hey Man'?"
];

let currentQuestionIndex = 0;

// ANSWER-related setup
const answersElement = document.getElementById("Answers");
let possibleAnswers = [
    ["Red", "Green", "Blue", "Cyan", "Black"],
    ["T-Rex", "Raptor", "Stego", "D-Rex"],
    ["Remark", "Response", "Song", "All of these"]
];

// Automate answer indexes always to last index/possible answer
let correctAnswerIndexes = possibleAnswers.map(subArray => subArray.length - 1);

// SCORE-related setup
let answerScores = new Array(questions.length).fill(0); // Initializes scores to 0

function setupQuestion() {
    if (currentQuestionIndex >= questions.length) {
        let finalScore = answerScores.reduce((a, b) => a + b, 0);
        alert(`Final Score: ${finalScore} / ${questions.length}`);
        return;
    }

    // Update question
    questionElement.innerHTML = questions[currentQuestionIndex];
    answersElement.innerHTML = "";

    // Add answer options
    possibleAnswers[currentQuestionIndex].forEach((element, index) => {
        let thisAnswer = document.createElement("li");
        thisAnswer.innerHTML = element;
        
        // Check answer correctness
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

setupQuestion();
