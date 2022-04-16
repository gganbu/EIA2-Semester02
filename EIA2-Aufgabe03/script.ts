namespace L03_MemoryCardGame {
   
    let pairAmount: number;
    let pairFound: number = 0;
   
    let cardNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    let cardValue: string[] = [];
    let cardArray: number[] = [];
    let cardContainer: HTMLElement[] = [];
    let cardArea: HTMLElement;
   
    let timeArea: HTMLElement;
    let startButton: HTMLElement;
    let divMenu: HTMLFormElement;

    window.addEventListener("load", handleLoad);

    let seconds: number = 0;
    let minutes: number = 0;
    let hours: number = 0;

    function handleLoad(): void {
        divMenu = <HTMLFormElement>document.querySelector("#menu");
        divMenu.addEventListener("submit", handleChange);
        startButton = <HTMLElement>document.querySelector("#startButton");
        cardArea = <HTMLDivElement>document.querySelector("#gameArea");  
        timeArea = <HTMLDivElement>document.querySelector("#timer");  
    }

    function handleChange(_event: Event): void {
        _event.preventDefault();
        let formData: FormData = new FormData(document.forms[0]);        
        cardValue = [];

        for (let thisGame of formData) {
            cardValue.push(String(thisGame[1]));
        }         
  
        startGame();
    }

    function startGame(): void {        
        divMenu.classList.add("hidden");
        startButton.classList.add("hidden");
        pairAmount = Number(cardValue[0]);
        for (let i: number = 0; i < 2; i++) {            
            for (let x: number = 0; x < pairAmount; x++) {
                cardArray.push(cardNumber[x]);
            }
        }

        cardArray.sort(() => 0.5 - Math.random());
        cardArea.innerHTML = "";
        document.body.style.background = cardValue[2];
        document.body.style.fontFamily = cardValue[5];        
        for (let index: number = 0; index < cardArray.length; index++) {
            let card: HTMLElement = <HTMLElement>document.createElement(thisElement());
            card.style.width = cardValue[1] + "px";
            card.style.height = cardValue[1] + "px";
            card.style.background = cardValue[3];
            card.style.color = cardValue[4];
            card.innerHTML = "<span>" + cardArray[index] + "</span>";
            cardArea.appendChild(card);
            cardArea.appendChild(timeArea);
            card.addEventListener("click", flipCard);
            let allSpans: NodeListOf<HTMLElement> = document.querySelectorAll("span");
            allSpans[index].classList.add("visible");
        }

        function thisElement(): "div" {
            return "div";
        }

        startTimer();
    }

    function compCards(): void {
        let spanValue0: string = <string>cardContainer[0].querySelector("span")!.innerHTML;
        let spanValue1: string = <string>cardContainer[1].querySelector("span")!.innerHTML;
        if (spanValue0 == spanValue1) {
            cardContainer[0].classList.add("visible");
            cardContainer[1].classList.add("visible");
            cardContainer = [];
            pairFound++;
            winCheck();

        } else {
            cardContainer[0].style.background = cardValue[3];
            cardContainer[1].style.background = cardValue[3];
            cardContainer[0].querySelector("span")!.classList.add("visible");
            cardContainer[1].querySelector("span")!.classList.add("visible");
            cardContainer = [];
        }
    }

    function flipCard(_event: MouseEvent): void {
        let target: HTMLElement = <HTMLElement> _event.target;
        cardContainer.push(target);
        cardContainer[0].style.background = "white";
        cardContainer[0].querySelector("span")!.classList.remove("visible");
        if (cardContainer.length == 2) {
            cardContainer[1].style.background = "white";
            cardContainer[1].querySelector("span")!.classList.remove("visible");
            setTimeout(compCards, 500);
        }
    }

    function startTimer(): void {
        setInterval(timer, 1000); //1 sec
    }
    function timer(): void {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        else if (minutes == 60) {
            minutes = 0;
            hours++;
        }
        
        if (seconds < 10 && minutes < 10 && hours < 10) document.querySelector("#timer")!.innerHTML = "0" + hours + ":0" + minutes + ":0" + seconds;
    else if (seconds >= 10 && minutes < 10 && hours < 10) document.querySelector("#timer")!.innerHTML = "0" + hours + ":0" + minutes + ":" + seconds;
    else if (seconds < 10 && minutes >= 10 && hours < 10) document.querySelector("#timer")!.innerHTML = "0" + hours + ":" +  minutes + ":0" + seconds;
    else if (seconds >= 10 && minutes >= 10 && hours < 10) document.querySelector("#timer")!.innerHTML = "0" + hours + ":" + minutes + ":" + seconds;
    else if (seconds >= 10 && minutes >= 10 && hours >= 10) document.querySelector("#timer")!.innerHTML =  hours + ":" + minutes + ":" + seconds;
    //console.log(seconds);
    }

    function winCheck(): void {
        if (pairFound == pairAmount) {
            window.alert("You won!" + " Time needed: " + hours + " hour(s), " + minutes + " minute(s), " + seconds + " second(s)");
            location.reload();
        }
    }
}