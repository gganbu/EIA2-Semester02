"use strict";
var L03_MemoryCardGame;
(function (L03_MemoryCardGame) {
    let pairAmount;
    let pairFound = 0;
    let cardNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    let cardValue = [];
    let cardArray = [];
    let cardContainer = [];
    let cardArea;
    let timeArea;
    let startButton;
    let divMenu;
    window.addEventListener("load", handleLoad);
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    function handleLoad() {
        divMenu = document.querySelector("#menu");
        divMenu.addEventListener("submit", handleChange);
        startButton = document.querySelector("#startButton");
        cardArea = document.querySelector("#gameArea");
        timeArea = document.querySelector("#timer");
    }
    function handleChange(_event) {
        _event.preventDefault();
        let formData = new FormData(document.forms[0]);
        cardValue = [];
        for (let thisGame of formData) {
            cardValue.push(String(thisGame[1]));
        }
        startGame();
    }
    function startGame() {
        divMenu.classList.add("hidden");
        startButton.classList.add("hidden");
        pairAmount = Number(cardValue[0]);
        for (let i = 0; i < 2; i++) {
            for (let x = 0; x < pairAmount; x++) {
                cardArray.push(cardNumber[x]);
            }
        }
        cardArray.sort(() => 0.5 - Math.random());
        cardArea.innerHTML = "";
        document.body.style.background = cardValue[2];
        document.body.style.fontFamily = cardValue[5];
        for (let index = 0; index < cardArray.length; index++) {
            let card = document.createElement(thisElement());
            card.style.width = cardValue[1] + "px";
            card.style.height = cardValue[1] + "px";
            card.style.background = cardValue[3];
            card.style.color = cardValue[4];
            card.innerHTML = "<span>" + cardArray[index] + "</span>";
            cardArea.appendChild(card);
            cardArea.appendChild(timeArea);
            card.addEventListener("click", flipCard);
            let allSpans = document.querySelectorAll("span");
            allSpans[index].classList.add("visible");
        }
        function thisElement() {
            return "div";
        }
        startTimer();
    }
    function compCards() {
        let spanValue0 = cardContainer[0].querySelector("span").innerHTML;
        let spanValue1 = cardContainer[1].querySelector("span").innerHTML;
        if (spanValue0 == spanValue1) {
            cardContainer[0].classList.add("visible");
            cardContainer[1].classList.add("visible");
            cardContainer = [];
            pairFound++;
            winCheck();
        }
        else {
            cardContainer[0].style.background = cardValue[3];
            cardContainer[1].style.background = cardValue[3];
            cardContainer[0].querySelector("span").classList.add("visible");
            cardContainer[1].querySelector("span").classList.add("visible");
            cardContainer = [];
        }
    }
    function flipCard(_event) {
        let target = _event.target;
        cardContainer.push(target);
        cardContainer[0].style.background = "white";
        cardContainer[0].querySelector("span").classList.remove("visible");
        if (cardContainer.length == 2) {
            cardContainer[1].style.background = "white";
            cardContainer[1].querySelector("span").classList.remove("visible");
            setTimeout(compCards, 500);
        }
    }
    function startTimer() {
        setInterval(timer, 1000); //1 sec
    }
    function timer() {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        else if (minutes == 60) {
            minutes = 0;
            hours++;
        }
        if (seconds < 10 && minutes < 10 && hours < 10)
            document.querySelector("#timer").innerHTML = "0" + hours + ":0" + minutes + ":0" + seconds;
        else if (seconds >= 10 && minutes < 10 && hours < 10)
            document.querySelector("#timer").innerHTML = "0" + hours + ":0" + minutes + ":" + seconds;
        else if (seconds < 10 && minutes >= 10 && hours < 10)
            document.querySelector("#timer").innerHTML = "0" + hours + ":" + minutes + ":0" + seconds;
        else if (seconds >= 10 && minutes >= 10 && hours < 10)
            document.querySelector("#timer").innerHTML = "0" + hours + ":" + minutes + ":" + seconds;
        else if (seconds >= 10 && minutes >= 10 && hours >= 10)
            document.querySelector("#timer").innerHTML = hours + ":" + minutes + ":" + seconds;
        //console.log(seconds);
    }
    function winCheck() {
        if (pairFound == pairAmount) {
            window.alert("You won!" + " Time needed: " + hours + " hour(s), " + minutes + " minute(s), " + seconds + " second(s)");
            location.reload();
        }
    }
})(L03_MemoryCardGame || (L03_MemoryCardGame = {}));
//# sourceMappingURL=script.js.map