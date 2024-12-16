let quizType = localStorage.getItem("quizType");

let questionApi = `http://localhost:8080/quiz/${quizType}`;

let quizHeading = document.querySelector(".quiz-heading");
quizHeading.innerText = (`${quizType} Quiz`).toUpperCase();

const questionText = document.getElementById("question");
let optionContainer = document.querySelector('.option-container');
let currQsNo = document.querySelector(".curr-qs-no");
let totalQsNo = document.querySelector(".total-qs");

let nextBtn = document.querySelector(".next-btn");
let backBtn = document.querySelector(".back-btn");

let questions = [];
let options = [];
let currentQuestionIndex = 0;
let questionLength;
let currentQuestion;

let timer;
let timeLeft = 30;
let score = 0;

for (let i = 0; i < 4; i++) {

}

async function fetchQuestion() {
    try {
        // let config = {headers: {quizType: quizType}}
        let response = await fetch(questionApi);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        questions = await response.json();
        questionLength = questions.length;

        totalQsNo.innerText = questionLength;
        // console.log(questions);
        nextBtn.style.display = "block";
        backBtn.style.display = "none";
        displayQuestion();

    }
    catch (error) {
        console.log("Faild to load question", error);
        // document.querySelector(".container").innerText = "";
        questionText.innerText = "Falid to load question"
        questionText.style.color = "red";
        return;
    }
}

function displayQuestion() {
    // setTimer();
    currQsNo.innerText = `${currentQuestionIndex + 1}`;

    currentQuestion = questions[currentQuestionIndex];

    questionText.innerText = currentQuestion.question;
    options = currentQuestion.options;

    // to remove previous options
    optionContainer.innerHTML = '';

    options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.innerText = option;
        // option.classList.add('option');
        optionButton.addEventListener("click", () => { checkAnswer(option) });
        optionContainer.appendChild(optionButton);
    });

    startTimer();
}

function nextQuestion() {
    currentQuestionIndex++;
    clearInterval(timer);
    if (currentQuestionIndex < questionLength) {
        displayQuestion();
    }
    else {
        showResult();
    }
}

function startTimer() {
    timeLeft = 30; 
    document.querySelector(".timer").innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.querySelector(".timer").innerText = timeLeft;
        if (timeLeft < 0) { 
            nextQuestion(); 
        } 
    }, 1000);
}


function checkAnswer(option) {
    let answer = currentQuestion.answer;
    if (option === answer) {
        score++;
    }
    nextQuestion();
}

function showResult() {
    let container = document.querySelector(".container");
    container.innerHTML = "";
    let h1 = document.createElement("h1");
    h1.innerText = "Your Quiz Result";
    let h2 = document.createElement("h2");
    h2.innerText = `You scored ${score} out of ${questionLength}`;
    h2.style.color = "green";
    let para = document.createElement("p");
    para.innerText = "Don't give up! Try again";
    backBtn = document.createElement("button");
    backBtn.innerText = "Go Back";
    // // button.style.backgroundColor = "#f84d03";
    backBtn.classList.add("btn");
    backBtn.classList.add("back-btn");
    // backBtn.style.display = "block";

    container.appendChild(h1);
    container.appendChild(h2);
    container.appendChild(para);
    container.appendChild(backBtn);

    backBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    })
}

nextBtn.addEventListener("click", nextQuestion);

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
})


window.onload = fetchQuestion();