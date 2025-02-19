// Adding another function just to check functionality
function changeColor() {
    // Debugging step
    alert("Function is running!"); 
    document.getElementById("text").style.color = "red";
}

//alert("hello");

//QUESTION-related setup
const questionElement = document.getElementById("Question");
let questions = [
    "What color is the sky?",
    "What's the coolest dinosaur?",
    "What is 'Hey Man'?"
];
let currentQuestionIndex = 0;

//ANSWER-related setup
const answersElement = document.getElementById("Answers");
let possibleAnswers = [
    ["Red", "Green", "Blue", "Cyan", "Black"],
    ["T-Rex", "Raptor", "Stego", "D-Rex"],
    ["Remark", "Response", "Song", "All of these"]
];
// Attempt to automate index answers always to last possible answer listed
let correctAnswerIndexes = questions.map(subArray => subArray.length - 1);

//SCORE-related setup
let answerScores = new Array(questions.length);//creates new array of length = 3

// this is the main function to run to test our ID functionality
function setupQuestion(){
    // this part = after final question, alerts final score
    if (currentQuestionIndex > questions.length - 1) {
        let finalScore = 0;
        answerScores.forEach(element => {
          finalScore += element;
        });
      return;
    }
    // this portion = inputting info into HTML ID elements
    questionElement.innerHTML = questions[currentQuestionIndex];
    answersElement.innerHTML = "";
    possibleAnswers[currentQuestionIndex].forEach(element => {
        let thisAnswer = document.createElement("li");
        thisAnswer.innerHTML = element;
        thisAnswer.onclick = () => {
          //to do - add to player score before moving on 
          event.target.innerHTML;
          possibleAnswers[currentQuestionIndex].forEach(element =>{
            if(event.target.innerHTML == element) {
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

