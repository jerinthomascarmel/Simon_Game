let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let btns = ["green", "purple", "aqua", "yellow"];
let h2 = document.querySelector('h2');
let h3 = document.querySelector('h3');

let highestScore = 0;

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("white");
    console.log(btn.classList);
    setTimeout(() => {
        btn.classList.remove("white");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);

}

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    //button flash
    gameFlash(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
}



function checkAns(idx) {

    if (gameSeq.length - 1 == idx && gameSeq[idx] == userSeq[idx]) {
        userSeq = [];
        setTimeout(levelUp, 1000);
        return;
    }

    if (gameSeq[idx] != userSeq[idx]) {
        highestScore = Math.max(level - 1, highestScore);
        h2.innerHTML = `Game Over! ,press any key to restart <br/> <b>Score:${level - 1}</b>`;
        h3.innerHTML = `Higest score:${highestScore}`;
        alertFlash();
        //clear gameSeq and userSeq
        userSeq = [];
        gameSeq = [];
        level = 0;
        started = false;
    }

}

function alertFlash() {
    let body = document.querySelector('body');
    body.classList.add("alertflash");
    setTimeout(() => {
        body.classList.remove("alertflash");
    }, 250);
}

function btnPress() {
    userFlash(this);
    let userColor = this.getAttribute('id');
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll('.box');
for (btn of allBtns) {
    btn.addEventListener('click', btnPress);
}