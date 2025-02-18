//alert("hello");
const questionElement = document.getElementById("Question");
const answersElement = document.getElementById("Answers");

let questions = [
    "What color is the sky?",
    "What's the coolest dinosaur?",
    "Another question"
];
let possibleAnswers = [
    ["Red", "Green", "Blue", "Cyan", "Black"],
    ["T-Rex", "Raptor", "Stego", "D-Rex"],
    []
];
let answerScores = new Array(questions.length);
let correctAnswerIndexes = [
    2, 
    3,
    0
];

let currentQuestionIndex = 0;

function setupQuestion(){
    //only morve on if index exists, otherwise return
    if (currentQuestionIndex > questions.length - 1) {
        let finalScore = 0;
        answerScores.forEach(element => {
          finalScore += element;
        });
      return;
    }
    questionElement.innerHTML = questions[currentQuestionIndex];
    answersElement.innerHTML = "";

    possibleAnswers[currentQuestionIndex].forEach(element => {
        let thisAnswer = document.createElement("li");
        thisAnswer.innerHTML = element;
        thisAnswer.onclick = () => {
          //to do - add to player score before moving on 
          event.target.innerHTML;
          possibleAnswers[currentQuestionIndex].forEach(element =>{
            if(event.target.innerHTML == element && correctAnswerIndexes == thisIndex) {
              answerScores[currentQuestionIndex] = 1;
              return;
            }


          });
          
          currentQuestionIndex++;
          setupQuestion();
        };
        answersElement.appendChild(thisAnswer);
    });
}
setupQuestion();





