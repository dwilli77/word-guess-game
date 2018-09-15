
//list of possible solutions
const wordChoices = ["sand", "ocean", "corona", "swimming", "seashells", "mermaids", "sailboat", "sunshine"];


//initialize a correctAnswerCounter
let correctAnswerCounter = 0;

//picks a random word from the list of solutions
let solutionWord = wordChoices[Math.floor(Math.random() * wordChoices.length)];
console.log(solutionWord);

//create an array full of dashes to be filled in as the user begins selecting answers
let userProgress = [];
for(i=0;i<solutionWord.length;i++){
    userProgress[i] = "-";
}
document.getElementById("user-progress").textContent = userProgress.join(" ");

//sets number of lives to 7 
let lives = 7;
document.getElementById("lives-remaining").textContent = "Lives remaining: " + lives;
//if letter guessed not found in solutionWord, then push to this array
let incorrectGuesses = [];
let displayIncorrectGuesses = incorrectGuesses.join(" ,");
document.getElementById("incorrect-guesses").textContent = displayIncorrectGuesses;


//resets the game back to it's starting point
function reset(){
    correctAnswerCounter = 0;
    solutionWord = wordChoices[Math.floor(Math.random() * wordChoices.length)];
    userProgress = [];
    for(i=0;i<solutionWord.length;i++){
        userProgress[i] = "-";
    };
    lives = 7;
    incorrectGuesses = [];
    document.getElementById("user-progress").textContent = userProgress.join(" ");
    document.getElementById("lives-remaining").textContent = "Lives remaining: " + lives;
    document.getElementById("incorrect-guesses").textContent = displayIncorrectGuesses;
}

//start the game
//================================================================================================
document.onkeyup = function (event) {
    //doesn't do anything if user types anything other than a letter
   if(event.which < 65 || event.which > 90){
       return false;
    //check if you guess the same letter that was already a match
   }else if(userProgress.indexOf(event.key) >= 0){
       return false;
    //checks if you guess the same incorrect letter again
   }else if(incorrectGuesses.indexOf(event.key) >= 0){
       return false;
   }else if(lives === 0){
       return false;
   }else if(correctAnswerCounter === solutionWord.length){
       return false;
   }else{
       //saves input from user
       let userGuess = event.key;
        console.log(userGuess)
        //check if the userGuess is in the solutionWord
       if(solutionWord.indexOf(userGuess) < 0){
            //if not --> add that letter the the incorrectGuesses array
            incorrectGuesses.push(userGuess);
            document.getElementById("incorrect-guesses").textContent = incorrectGuesses.join(", ");
            lives--;
            document.getElementById("lives-remaining").textContent = "Lives remaining: " + lives;
        // if so --> replace the '-' in the userProgress array with the letter guessed
       }else{
           for(let i=0;i<solutionWord.length;i++){
               if(userGuess === solutionWord[i]){
                   userProgress[i] = userGuess;
                   document.getElementById("user-progress").textContent = userProgress.join(" ");
                    correctAnswerCounter++;
               };
           };
       };
   };
   if(correctAnswerCounter === solutionWord.length){
       console.log("you win");
       document.getElementById("reset").style = "";
   };
   if(lives === 0){
       console.log("you lose");
       document.getElementById("reset").style = "";
   }
}

document.getElementById("reset").onclick = function(){
    reset();
    document.getElementById("reset").style = "display:none;";
}
