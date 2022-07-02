namespace Beach {   

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    let moveables: Moveable[] = [];
    let humans: Array<Human> = [];
    let trees: Array<Tree> = [];
    let changeButton: HTMLButtonElement;

    function handleLoad(_event: Event): void {        
        
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
        return;

        changeButton = document.createElement("button");
        changeButton.classList.add("buttonChange");
        changeButton.innerHTML = "Change Direction";
        changeButton.addEventListener("click", handleButton);

        document.body.appendChild(changeButton);
        
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        //Clouds
        let cloudCount: number = 3;

        for (let i: number = 0; i < cloudCount; i++) {
            let canvasRandomX: number = (Math.random() * (crc2.canvas.width - 100)) + 100;
            let canvasRandomY: number = Math.random() * (crc2.canvas.height - 600);

            let newCloud: Cloud = new Cloud(new Vector(canvasRandomX, canvasRandomY), "#f7f7f7", 1000);
            
            moveables.push(newCloud);
        }

        console.log(moveables);

        //Boats
        let boatCount: number = 2;

        for (let i: number = 0; i < boatCount; i++) {
            let canvasRandomX: number = (Math.random() * (crc2.canvas.width - 100)) + 300;
            let canvasRandomY: number = Math.random() * (crc2.canvas.height - 650);

            let newBoat: Boat = new Boat(new Vector(canvasRandomX, canvasRandomY), "#f7f7f7", 1000);
            
            moveables.push(newBoat);
        }

        console.log(moveables);

        //Birds
        let birdCount: number = 6;
        let birdColors: Array<string> = ["#b32f1b", "#b3511b", "#b3851b", "#3a5e3a"];

        for (let i: number = 0; i < birdCount; i++) {
            let random: number = Math.floor(Math.random() * 4);
            let canvasRandomX: number = Math.random() * crc2.canvas.width;
            let canvasRandomY: number = Math.random() * crc2.canvas.height;

            let newBird: Bird = new Bird(new Vector(canvasRandomX, canvasRandomY), birdColors[random], random);
            
            moveables.push(newBird);
        }

        //Humans
        let humanCount: number = 3;
        let humanColors: Array<string> = ["#824f2b", "#5e3e14", "#4a300f"];

        for (let i: number = 0; i < humanCount; i++) {
            let random: number = Math.floor(Math.random() * 3);
            let canvasRandomX: number = Math.random() * crc2.canvas.width;
            let canvasRandomY: number = Math.random() * crc2.canvas.height + 500;

            let newHuman: Human = new Human(new Vector(canvasRandomX, canvasRandomY), humanColors[random]);
            
            humans.push(newHuman);
        }

        //Trees        
        let treeCount: number = 4;
        let treeColors: Array<string> = ["#1f361f", "#b32f1b", "#b3511b", "#b3851b", "#3a5e3a"]; 
        let treeTrunkColors: Array<string> = ["#5e4434", "#6b4f3f", "#6e5141"];

        for (let i: number = 0; i < treeCount; i++) {
            let treeRandom: number = Math.floor(Math.random() * 5);
            let treeTrunkRandom: number = Math.floor(Math.random() * 3);
            let canvasRandomX: number = (Math.random() * (crc2.canvas.width - 100)) + 100;
            let canvasRandomY: number = Math.random() * (crc2.canvas.height) + 390;
            let treeShapeRandom: number = Math.floor(Math.random() * 10);

            let newTree: Tree = new Tree(new Vector(canvasRandomX, canvasRandomY), treeColors[treeRandom], treeTrunkColors[treeTrunkRandom], treeShapeRandom);
            
            trees.push(newTree);
        }
    }

    function handleButton(): void {
        Moveable.forward = !Moveable.forward;
       
        Cloud.forward = !Cloud.forward;

        Boat.forward = !Boat.forward;
    }

    //Sky
    function drawSky(_x: number, _y: number): void {    

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#87ceeb");
        gradient.addColorStop(1, "#c9e9f6 ");
        gradient.addColorStop(1, "HSL(170, 80%, 30%)");
        
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    //Sun
    function drawSun(_x: number, _y: number): void {

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 390);
        gradient.addColorStop(0, "#FCE570");
        gradient.addColorStop(1, "#FDB813 ");
        gradient.addColorStop(1, "HSL(120, 80%, 30%)");

        crc2.beginPath();
        crc2.fillStyle = gradient;

        crc2.arc(400, _y, 200, 0, 5 * Math.PI);
        crc2.fill();
        crc2.closePath();
    }

    //Water
    function drawOcean(_x: number, _y: number, _fillColor: string): void {

        crc2.beginPath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 390);
        gradient.addColorStop(0.6, "#d1f1f9");
        gradient.addColorStop(0.9, "#2389da");
        crc2.fillStyle = gradient;

        //Water1
        crc2.beginPath();
        crc2.moveTo(700, 500);
        crc2.quadraticCurveTo(200, 1, -100, 500);
        crc2.moveTo(0, 0);
        crc2.fill();

        //Water2
        crc2.beginPath();
        crc2.moveTo(1600, 545);
        crc2.quadraticCurveTo(1600, 0, -1000, 400);
        crc2.fill();
    }

    //Sand
    function drawSand(_x: number, _y: number): void {

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0.5, "#fff5be");
        gradient.addColorStop(0.75, "#ffe3a0");

        crc2.beginPath();
        crc2.fillStyle = gradient;

        crc2.moveTo(_x, _y + 360); 
        crc2.lineTo(_x + 1500, _y + 450);
        crc2.lineTo(_x + 1500, _y + 850);
        crc2.lineTo(_x - 3000, _y + 850);

        crc2.closePath();
        crc2.fill();
    }   

    //Update
    function update(): void {   

        drawSky(0, 0);
        crc2.restore();
        crc2.save();

        drawSand(400, 0);
        crc2.restore();
        crc2.save();

        drawSun(0, 300);
        crc2.restore();
        crc2.save();

        drawOcean(0, 350, "#575554");
        crc2.restore();
        crc2.save();

        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }

        humans.forEach(human => {
            human.draw();
        });

        trees.forEach(tree => {
            tree.draw();
        });
    }   
        
    // update();
    window.setInterval(update, 60);
} 
