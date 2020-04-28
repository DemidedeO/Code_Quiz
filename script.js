//Setting up the Global Variables:
var timerEl = document.getElementById("timer");
console.log(timerEl);
//Start button
var buttonStart = document.getElementById("button");
console.log(buttonStart);

//questions code
var quizEl = document.getElementById("que");
//console.log(quizEl);
//answers code
var answersEl = document.getElementById("ans");
//console.log(answersEl);

var countDown;
var answersUl = document.createElement("ul");

//Quiz Object
var quiz = {
    time: 5, //timer.
    question1: 0, //first question.
    scoreCorrect: 0, //score for number of correct answers.

    //questions and answers in the quiz
    questions: [
        {
            que: "Which country is the state, Lagos, in?",
            ans: ["Belgium", "Nigeria", "Zimbabwe"],
            cor: 1
        },
        {
            que: "Who is the first man in the Bible ?",
            ans: ["Adam", "Gabriel", "Eve"],
            cor: 0
        },
        {
            que: "What is a Car?",
            ans: ["Adverb", "Pronoun", "Noun"],
            cor: 2
        }
    ],


    begin: function () {
        console.log("start the quiz");
        //quizEl.innerHTML = "";
        quiz.time = 5; //timer.
        quiz.question1 = 0; //first question.
        quiz.scoreCorrect = 0; //score for number of correct answers.
        quiz.timeStart();
        quiz.showQuestion();
        quiz.begin();
    },
    //start counter
    timeStart: function () {
        clearInterval(countDown);
        countDown = setInterval(quiz.counter, 1000);
    },
    //stop counter
    timeStop: function () {
        clearInterval(countDown);
    },

    //Clear Alert Function
    clearAlert: function () {
        setTimeout(() => {
            alertCorrect.remove();
            alertIncorrect.remove();
        }, 1000);

    },
    //Method that does the countdown:
    counter: function () {
        quiz.time--;
        //show it on the page.
        timerEl.textContent = "Timer:" + quiz.time;
        //if time less than 1, it will stop
        if (quiz.time < 1) {
            timerEl.textContent = "Time is up!"
            quiz.time = 5;
            quiz.question1++;
            quiz.showQuestion();
        }
    },
    //method will apply the question on page with the answers and reset timer.
    showQuestion: function () {
        //adding clear alert function to clear the alerts:
        this.clearAlert();


        if (quiz.question1 < quiz.questions.length) {
            answersUl.innerHTML = "";
            var currentQuiz = quiz.questions[quiz.question1].que;
            quizEl.innerHTML = "<h3>" + currentQuiz + "<h3>";
            for (var index = 0; index < quiz.questions[quiz.question1].ans.length; index++) {
                console.log(index);
                //answers in the object
                var answer = quiz.questions[this.question1].ans[index];
                console.log("answer", answer);
                //making a list
                var answerLi = document.createElement("li");
                //giving the list content.
                answerLi.textContent = answer;
                //giving the list an  class and data to link for the next function
                answerLi.setAttribute("class", "answerLi");
                answerLi.setAttribute("value", index);
                //placed the list on the page
                answersUl.appendChild(answerLi);
            }
            answersEl.appendChild(answersUl);

        } else {
            quiz.timeStop();
            timerEl.textContent = "Quiz Complete"
            quizEl.innerHTML = "";
            answersUl.innerHTML = "";

        }

    },

    getTheAnswers: function (e) {
        // console.log(this.getTheAnswers);
        if (e.target.matches("li")) {
            console.log(quiz.questions[quiz.question1].cor);
            console.log(e.target.value);

            if (e.target.value == quiz.questions[quiz.question1.cor]) {
                //for the alerts
                answersEl.appendChild(alertCorrect);
                quiz.time = 5;
                quiz.question1++;
                quiz.correct++;
                quiz.showQuestion();
                clearInterval(countDown);
                quiz.timeStart();
            }

            else {
                // for incorrect alert
                answersEl.appendChild(alertIncorrect);
                quiz.time = 5;
                quiz.question1++;
                quiz.showQuestion();
                clearInterval(countDown);
                quiz.timeStart();
            }
        }
    },
    score: function () {
    }
}

//Correct Alert:
var alertCorrect = document.createElement("div");
alertCorrect.setAttribute("class", "alert alert-success");
alertCorrect.textContent = "You Got It Right!!";

//Incorrect alert:
var alertIncorrect = document.createElement("div");
alertIncorrect.setAttribute("class", "alert alert-warning");
alertIncorrect.textContent = "Wrong Answer!";

//Click the Start button 
button.addEventListener("click", function () {
    clearInterval(countDown);

})
answersUl.addEventListener("click", quiz.getTheAnswers);

//console.log(answersUl);
