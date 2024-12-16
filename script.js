
// const buttons = document.querySelectorAll('.quiz-start-btn'); 

// function redirectToPage() {
//     window.location.href = `quiz.html`;
// }

//  // Attach the click event listener to each button 
// buttons.forEach(button => {
//         button.addEventListener('click', redirectToPage);
// }
// );

const buttons = document.querySelectorAll('.quiz-start-btn');

// for(button of buttons) {
//     button.onclick = ()=> {
//         window.location.href = 'quiz.html';
//     }
// }


function redirectToPage() {
    let id = this.getAttribute("id");
    console.log(`${id} quiz started`);
    let quizType = this.getAttribute('id');
    localStorage.setItem("quizType", quizType);
    window.location.href = "quiz.html";
}

buttons.forEach(button => {
    button.addEventListener("click", redirectToPage);
});