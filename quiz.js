var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;
var animeQuestions = [
    {
        question: "What animal is Naruto's Jinchuriki?",
        choices: 
            ["A: Fox", 
            "B: Rabbit",
            "C: Snake", 
            "D: Monkey"],

        answer: "A: Fox"
        
    },
    {
        question: "What is Monster's main villian name?",
        choices: 
            ["A: Detective Lunge ", 
            "B: Johan Liebert", 
            "C: Eva Heinemann", 
            "D: Ana Liebert"],

        answer: "B: Johan Liebert"
    },
    {
        question: "What is the name of Yusuke's special ability?",
        choices: 
            ["A: Eraser Cannon", 
            "B: Galick Gun", 
            "C: Spirit Gun", 
            "D: Spirit Sword"],

        answer: "C: Spirit Gun"
    },
    {
        question: "What is Eren's Titan From called?",
        choices: 
            ["A: Armored Titan", 
            "B: Founding Titan", 
            "C: Colossal Titan", 
            "D: Attack Titan"],

        answer: "D: Attack Titan"
    },
    {
        question: "What is Ash's starter Pokemon?",
        choices: 
            ["A: Charmander ", 
            "B: Piplup ", 
            "C: Pikachu ", 
            "D: Eevee "],

        answer: "C: Pikachu"
}]

// Start Countdown on button Press
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

//stop the timer to end the game
function endGame() {
    clearInterval(timer);

    //create message within java for game over screen
    var quizContent = `
    <h2> Complete!</h2>
    <h3>Your final score is ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` out of 5 questions correct!</h3>
    <input type="text" id="name" placeholder="Initials"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}

function getScore() {
    
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}
//clear score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

//Restarts game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

//Makes javascript message
    var quizContent = `
    <h1>
        Anime Quiz!
    </h1>
    <h3>
        Press to Start!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//Subtracts 15s for every incorrect answer
function incorrect() {
    timeLeft -= 15; 
    next();
}
//Adds 20 for each corect answer
function correct() {
    score += 20;
    next();
}


//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > animeQuestions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + animeQuestions[currentQuestion].question + "</h2>"

    for (var buttonLoop = 0; buttonLoop < animeQuestions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", animeQuestions[currentQuestion].choices[buttonLoop]);
        if (animeQuestions[currentQuestion].choices[buttonLoop] === animeQuestions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}