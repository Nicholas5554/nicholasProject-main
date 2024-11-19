
let difficulty;
let points = 0;
let score = document.getElementById('score');
const answerArea = document.getElementById('answer-area');
const problemArea = document.getElementById('problem-area');
let isMathProblemShow = false;
let isDifficultyPicked = false;
let generatedProblems = new Set();


const randomNum = (min, max) => {

    let result;
    do {
        let ranOne = Math.floor(Math.random() * (max - min + 1)) + min;
        let ranTwo = Math.floor(Math.random() * (max - min + 1)) + min;

        let operators = ['+', '-', '*', '/'];
        let operator = operators[Math.floor(Math.random() * operators.length)];

        result = `${ranOne} ${operator} ${ranTwo}`;

    } while (!Number.isInteger(eval(result)) || eval(result) < 0 || generatedProblems.has(result));

    generatedProblems.add(result);
    problemArea.innerHTML = result;
    isMathProblemShow = true;
    return result;
}

const isAnswerRight = (answer, mathProblem) => {
    let rightAnswer = eval(mathProblem);
    if (answerArea.value.trim() === '') {
        return;
    } else {
        return parseFloat(answer) === rightAnswer;
    }
}

const checkUser = () => {

    if (!isMathProblemShow) {
        score.innerHTML = `please pick a level`;
        return;
    }

    if (answerArea.value == '') {
        score.innerHTML = `answer required`;
        return;
    }

    const mathProblem = document.getElementById('problem-area').innerHTML;
    const answer = answerArea.value;

    if (isAnswerRight(answer, mathProblem)) {
        isMathProblemShow = true;
        points++;
        score.innerHTML = `you got a point!, nice you have ${points} points`;
    }

    else if (isAnswerRight(answer, mathProblem) == false) {
        isMathProblemShow = true;
        score.innerHTML = `not the right one try again, you have ${points} points`;
    }

    answerArea.value = '';

    exerciseHistory(answer, mathProblem);

    return randomNum(updatedMath());
}

const updatedMath = () => {
    let min, max;
    if (difficulty == 'level-1') {
        min = 1;
        max = 10;
        return randomNum(1, 10);
    } else if (difficulty == 'level-2') {
        min = 1;
        max = 100;
        return randomNum(10, 100);
    } else if (difficulty == 'level-3') {
        min = 1;
        max = 1000;
        return randomNum(100, 1000);
    }
    randomNum(min, max);
}

const difficultyPicker = () => {
    let level_1 = document.getElementById('level-1');
    let level_2 = document.getElementById('level-2');
    let level_3 = document.getElementById('level-3');

    level_1.addEventListener('click', () => {
        difficulty = 'level-1';
        updatedMath('level-1');
    });

    level_2.addEventListener('click', () => {
        difficulty = 'level-2';
        updatedMath('level-2');
    });

    level_3.addEventListener('click', () => {
        difficulty = 'level-3';
        updatedMath('level-3');
    });
}

const exerciseHistory = (answer, mathProblem) => {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow(0);
    const exercise = row.insertCell(0);
    const correctAnswer = row.insertCell(1);
    const userAnswer = row.insertCell(2);
    const userPoints = row.insertCell(3);

    exercise.textContent = mathProblem;
    correctAnswer.textContent = eval(mathProblem);
    userAnswer.textContent = answer;
    userPoints.textContent = points;
}

difficultyPicker();