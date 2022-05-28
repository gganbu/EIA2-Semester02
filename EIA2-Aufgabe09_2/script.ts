namespace Beach {

    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;

    let birds: Array<Bird> = [];
    let clouds: Array<Cloud> = [];
    let boats: Array<Boat> = [];

    function handleLoad(_event: Event): void {

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        //cloud
        let cloudColors: Array<string> = ["#ffffff"];
        let cloudCount: number = 2;

        for (let i: number = 0; i < cloudCount; i++) {
        let random: number = Math.floor(Math.random() * 4);
        let canvasRandomX: number = Math.random() * crc2.canvas.width;
        let canvasRandomY: number = Math.random() * crc2.canvas.height;

        let newCloud: Cloud = new Cloud(new Vector(canvasRandomX, canvasRandomY), cloudColors[random]);

        clouds.push(newCloud);
        }

        //Boat
        let boatColors: Array<string> = ["#000000"];
        let boatCount: number = 1;

        for (let i: number = 0; i < boatCount; i++) {
        let random: number = Math.floor(Math.random() * 4);
        let canvasRandomX: number = crc2.canvas.width;
        let canvasRandomY: number = Math.random() * crc2.canvas.height;

        let newBoat: Boat = new Boat(new Vector(canvasRandomX, canvasRandomY), boatColors[random]);

        boats.push(newBoat);
        }

        //bird
        let birdColors: Array<string> = ["#000000"];
        let birdCount: number = 3;

        for (let i: number = 0; i < birdCount; i++) {
            let random: number = Math.floor(Math.random() * 4);
            let canvasRandomX: number = Math.random() * crc2.canvas.width;
            let canvasRandomY: number = Math.random() * crc2.canvas.height;

            let newBird: Bird = new Bird(new Vector(canvasRandomX, canvasRandomY), birdColors[random], random);
            
            birds.push(newBird);
        }
        
    }


    function drawSand(_x: number, _y: number): void {

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0.5, "#fff5be");
        gradient.addColorStop(0.6, "#ffe3a0");

        crc2.beginPath();
        crc2.fillStyle = gradient;

        crc2.moveTo(_x, _y + 360);
        crc2.lineTo(_x + 1500, _y + 460);
        crc2.lineTo(_x + 1500, _y + 850);
        crc2.lineTo(_x - 3000, _y + 850);

        crc2.closePath();
        crc2.fill();
    }

    function drawSun(_x: number, _y: number): void {

        crc2.beginPath();
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#FCE570");
        gradient.addColorStop(1, "#FDB813");
        gradient.addColorStop(1, "HSL(120, 80%, 30%)");

        crc2.fillStyle = gradient;
        crc2.arc(420, _y, 150, 0, 5 * Math.PI);
        crc2.fill();
        crc2.closePath();
    }

    function drawSky(_x: number, _y: number): void {

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#d1f1f9");
        gradient.addColorStop(1, "#2389da");
        gradient.addColorStop(1, "HSL(170, 80%, 30%)");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawTree(_fillColor: string, _x: number, _y: number): void {

        crc2.save();
        crc2.translate(_x, _y);

        //TreeTrunk
        crc2.beginPath();
        crc2.fillStyle = ("#947661");
        crc2.fillRect(0, 25, 25, 110);
        crc2.closePath();
    }

    function drawTreeG(_fillColor: string, _x: number, _y: number): void {
        //Tree
        crc2.beginPath();
        crc2.fillStyle = ("#99b178");
        crc2.ellipse(_x + -230, _y + -350, 17, 20, -5, 20, 40);
        crc2.ellipse(_x + -210, _y + -370, 17, 20, -5, 20, 40);
        crc2.ellipse(_x + -190, _y + -375, 17, 20, -5, 20, 40);
        crc2.ellipse(_x + -170, _y + -370, 17, 20, -4, 20, 40);
        crc2.ellipse(_x + -150, _y + -350, 17, 20, -4, 20, 40);
        crc2.ellipse(_x + -210, _y + -390, 17, 20, -1, 20, 40);
        crc2.ellipse(_x + -230, _y + -400, 17, 20, -2, 20, 40);
        crc2.ellipse(_x + -150, _y + -390, 17, 20, -2, 20, 40);
        crc2.ellipse(_x + -150, _y + -400, 17, 20, -5, 20, 40);
        crc2.closePath();
        crc2.fill();
        crc2.restore();
    }

    function drawTreeCoco(_fillColor: string, _x: number, _y: number): void {

        //Coco
        crc2.beginPath();
        crc2.fillStyle = ("#795644");
        crc2.ellipse(_x + -220, _y + -293, 17, 20, -3, 20, 40);
        crc2.closePath();
        crc2.fill();
        crc2.beginPath();
        crc2.fillStyle = ("#362204");
        crc2.ellipse(_x + -222, _y + -279, 3, 2, -3, 20, 40);
        crc2.ellipse(_x + -228, _y + -284, 3, 2, -6, 20, 40);
        crc2.ellipse(_x + -218, _y + -284, 3, 2, -3, 20, 40);
        crc2.closePath();
        crc2.fill();
        crc2.restore();
    }

    function drawHuman(_fillColor: string, _x: number, _y: number): void {

        //towel
        crc2.beginPath();
        crc2.fillStyle = ("#b34f5a");
        crc2.rect(_x + -125, _y + 20, 90, 35);
        crc2.closePath();
        crc2.fill();

        crc2.beginPath();
        crc2.fillStyle = ("#fcfbfa");
        crc2.rect(_x + -125, _y + 20, 40, 35);
        crc2.closePath();
        crc2.fill();

        //Body
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_x + -90, _y + 20, 15, 22, -10, 20, 40);
        crc2.closePath();
        crc2.fill();

        //Head
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_x + -95, _y + -10, 13, 13, -10, 20, 40);
        crc2.closePath();
        crc2.fill();


        //glasses
        crc2.beginPath();
        crc2.fillStyle = ("#1C1C1C");
        crc2.rect(_x + -104, _y + -17, 7, 6);
        crc2.closePath();
        crc2.fill();

        crc2.beginPath();
        crc2.fillStyle = ("#1C1C1C");
        crc2.rect(_x + -93, _y + -17, 7, 6);
        crc2.closePath();
        crc2.fill();

        crc2.beginPath();
        crc2.fillStyle = ("#1C1C1C");
        crc2.rect(_x + -108, _y + -15.5, 24, 2);
        crc2.closePath();
        crc2.fill();

        //shoulder
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_x + -110, _y + 16, 9, 6, -10, 20, 40);
        crc2.closePath();
        crc2.fill();

        //arm
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_x + -116, _y + 24, 5, 10, -50, 20, 40);
        crc2.closePath();
        crc2.fill();

        //finger
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_x + -121, _y + 30, 5, 9, -80, 25, 40);
        crc2.closePath();
        crc2.fill();

        //leg
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_x + -64, _y + 23, 23, 9, -7, 20, 40);
        crc2.closePath();
        crc2.fill();

        //leg
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_x + -49, _y + 23, 19, 8, -8, 20, 40);
        crc2.closePath();
        crc2.fill();

        //foot
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_x + -42, _y + 40, 12, 6, -3, 20, 40);
        crc2.closePath();
        crc2.fill();

    }

    function update(): void {

        drawSky(0, 0);
        crc2.restore();
        crc2.save();

        boats.forEach(boat => {
            boat.draw();
            boat.move(0.01);
            crc2.restore();
            crc2.save();
        });

        drawSun(400, 0);
        crc2.restore();
        crc2.save();

        clouds.forEach(cloud => {
            cloud.draw();
            cloud.move(0.01);
        });

        birds.forEach(bird => {
            bird.draw();
            bird.move(0.02);
        });

        drawSand(0, 0);
        crc2.restore();
        crc2.save();

        drawTree("#824f2b", 200, 350);
        crc2.restore();
        crc2.save();

        drawTreeG("#824f2b", 400, 740);
        crc2.restore();
        crc2.save();

        drawTreeCoco("#824f2b", 400, 780);
        crc2.restore();
        crc2.save();


        drawTree("#824f2b", 100, 650);
        crc2.restore();
        crc2.save();
        
        drawTreeCoco("#824f2b", 310, 990);
        crc2.restore();
        crc2.save();

        drawTreeG("#824f2b", 300, 1040);
        crc2.restore();
        crc2.save();


        drawTree("#824f2b", 340, 500);
        crc2.restore();
        crc2.save();

        drawTreeG("#824f2b", 540, 900);
        crc2.restore();
        crc2.save();


        drawHuman("#824f2b", 520, 560);
        crc2.restore();
        crc2.save();

        drawHuman("#824f2b", 200, 500);
        crc2.restore();
        crc2.save();

        drawHuman("#824f2b", 380, 700);
        crc2.restore();
        crc2.save();

    }

    // update();
    window.setInterval(update, 60);
}
