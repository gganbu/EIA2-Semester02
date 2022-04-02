namespace EventInspector {
    window.addEventListener("load", handleLoad);

    function handleLoad(): void {

        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("contextmenu", showPos);
        document.addEventListener("keyup", logInfo);
        document.addEventListener("click", logInfo);

        let body: HTMLElement = <HTMLElement>document.querySelector("body");
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
        let div0: HTMLDivElement = <HTMLDivElement>document.querySelector("#div0");
        div0.addEventListener("click", logInfo);
        div0.addEventListener("keyup", logInfo);
        let div1: HTMLDivElement = <HTMLDivElement>document.querySelector("#div1");
        div1.addEventListener("click", logInfo);
        div1.addEventListener("keyup", logInfo);

        document.addEventListener("button", bInfo);
    }

    function setInfoBox(_event: MouseEvent): void {

        let info: HTMLSpanElement = <HTMLSpanElement>document.querySelector("span");

        let x: number = _event.pageX + 10;
        let y: number = _event.pageY + 10;

        info.style.left = x + "px";
        info.style.top = y + "px";

        // @ts-ignore: Object is possibly 'null'.
        document.querySelector("span").innerHTML = String("M-Position XY: " + _event.pageX + " / " + _event.pageY + "<br>" + "Target: " + _event.target);
    }

    // tslint:disable-next-line: typedef
    function showPos(event: { pageX: number; pageY: number; }) {
        let x1: number = event.pageX;
        let y1: number = event.pageY;

        alert("Coords: X: " + x1 + ", Y: " + y1 + "\n" + "What you lookin' for?? 👀");
    }
    
    function bInfo(_event: Event): void {
        let customEvent: CustomEvent = new CustomEvent("Custom-Event", {bubbles: true});
        // @ts-ignore: Object is possibly 'null'.
        _event.target.dispatchEvent(customEvent);
    }
    
    function logInfo(_event: Event): void {
        console.log("Type: ", _event.type);
        console.log("Target: ", _event.target);
        console.log("Current Target: ", _event.currentTarget);
        console.log("Event-Object: ", _event);
    }
}