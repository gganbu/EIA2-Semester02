"use strict";
var Beach;
(function (Beach) {
    window.addEventListener("load", handleLoad);
    let birds = [];
    let clouds = [];
    let boats = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Beach.crc2 = canvas.getContext("2d");
        //cloud
        let cloudColors = ["#ffffff"];
        let cloudCount = 2;
        for (let i = 0; i < cloudCount; i++) {
            let random = Math.floor(Math.random() * 4);
            let canvasRandomX = Math.random() * Beach.crc2.canvas.width;
            let canvasRandomY = Math.random() * Beach.crc2.canvas.height;
            let newCloud = new Beach.Cloud(new Beach.Vector(canvasRandomX, canvasRandomY), cloudColors[random]);
            clouds.push(newCloud);
        }
        //Boat
        let boatColors = ["#000000"];
        let boatCount = 1;
        for (let i = 0; i < boatCount; i++) {
            let random = Math.floor(Math.random() * 4);
            let canvasRandomX = Beach.crc2.canvas.width;
            let canvasRandomY = Math.random() * Beach.crc2.canvas.height;
            let newBoat = new Beach.Boat(new Beach.Vector(canvasRandomX, canvasRandomY), boatColors[random]);
            boats.push(newBoat);
        }
        //bird
        let birdColors = ["#000000"];
        let birdCount = 3;
        for (let i = 0; i < birdCount; i++) {
            let random = Math.floor(Math.random() * 4);
            let canvasRandomX = Math.random() * Beach.crc2.canvas.width;
            let canvasRandomY = Math.random() * Beach.crc2.canvas.height;
            let newBird = new Beach.Bird(new Beach.Vector(canvasRandomX, canvasRandomY), birdColors[random], random);
            birds.push(newBird);
        }
    }
    function drawSand(_x, _y) {
        let gradient = Beach.crc2.createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0.5, "#fff5be");
        gradient.addColorStop(0.6, "#ffe3a0");
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = gradient;
        Beach.crc2.moveTo(_x, _y + 360);
        Beach.crc2.lineTo(_x + 1500, _y + 460);
        Beach.crc2.lineTo(_x + 1500, _y + 850);
        Beach.crc2.lineTo(_x - 3000, _y + 850);
        Beach.crc2.closePath();
        Beach.crc2.fill();
    }
    function drawSun(_x, _y) {
        Beach.crc2.beginPath();
        let gradient = Beach.crc2.createLinearGradient(0, 0, 0, Beach.crc2.canvas.height);
        gradient.addColorStop(0, "#FCE570");
        gradient.addColorStop(1, "#FDB813");
        gradient.addColorStop(1, "HSL(120, 80%, 30%)");
        Beach.crc2.fillStyle = gradient;
        Beach.crc2.arc(420, _y, 150, 0, 5 * Math.PI);
        Beach.crc2.fill();
        Beach.crc2.closePath();
    }
    function drawSky(_x, _y) {
        let gradient = Beach.crc2.createLinearGradient(0, 0, 0, Beach.crc2.canvas.height);
        gradient.addColorStop(0, "#d1f1f9");
        gradient.addColorStop(1, "#2389da");
        gradient.addColorStop(1, "HSL(170, 80%, 30%)");
        Beach.crc2.fillStyle = gradient;
        Beach.crc2.fillRect(0, 0, Beach.crc2.canvas.width, Beach.crc2.canvas.height);
    }
    function drawTree(_fillColor, _x, _y) {
        Beach.crc2.save();
        Beach.crc2.translate(_x, _y);
        //TreeTrunk
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = ("#947661");
        Beach.crc2.fillRect(0, 25, 25, 110);
        Beach.crc2.closePath();
    }
    function drawTreeG(_fillColor, _x, _y) {
        //Tree
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = ("#99b178");
        Beach.crc2.ellipse(_x + -230, _y + -350, 17, 20, -5, 20, 40);
        Beach.crc2.ellipse(_x + -210, _y + -370, 17, 20, -5, 20, 40);
        Beach.crc2.ellipse(_x + -190, _y + -375, 17, 20, -5, 20, 40);
        Beach.crc2.ellipse(_x + -170, _y + -370, 17, 20, -4, 20, 40);
        Beach.crc2.ellipse(_x + -150, _y + -350, 17, 20, -4, 20, 40);
        Beach.crc2.ellipse(_x + -210, _y + -390, 17, 20, -1, 20, 40);
        Beach.crc2.ellipse(_x + -230, _y + -400, 17, 20, -2, 20, 40);
        Beach.crc2.ellipse(_x + -150, _y + -390, 17, 20, -2, 20, 40);
        Beach.crc2.ellipse(_x + -150, _y + -400, 17, 20, -5, 20, 40);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        Beach.crc2.restore();
    }
    function drawTreeCoco(_fillColor, _x, _y) {
        //Coco
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = ("#795644");
        Beach.crc2.ellipse(_x + -220, _y + -293, 17, 20, -3, 20, 40);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = ("#362204");
        Beach.crc2.ellipse(_x + -222, _y + -279, 3, 2, -3, 20, 40);
        Beach.crc2.ellipse(_x + -228, _y + -284, 3, 2, -6, 20, 40);
        Beach.crc2.ellipse(_x + -218, _y + -284, 3, 2, -3, 20, 40);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        Beach.crc2.restore();
    }
    function drawHuman(_fillColor, _x, _y) {
        //towel
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = ("#b34f5a");
        Beach.crc2.rect(_x + -125, _y + 20, 90, 35);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = ("#fcfbfa");
        Beach.crc2.rect(_x + -125, _y + 20, 40, 35);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        //Body
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = _fillColor;
        Beach.crc2.ellipse(_x + -90, _y + 20, 15, 22, -10, 20, 40);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        //Head
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = _fillColor;
        Beach.crc2.ellipse(_x + -95, _y + -10, 13, 13, -10, 20, 40);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        //glasses
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = ("#1C1C1C");
        Beach.crc2.rect(_x + -104, _y + -17, 7, 6);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = ("#1C1C1C");
        Beach.crc2.rect(_x + -93, _y + -17, 7, 6);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = ("#1C1C1C");
        Beach.crc2.rect(_x + -108, _y + -15.5, 24, 2);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        //shoulder
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = _fillColor;
        Beach.crc2.ellipse(_x + -110, _y + 16, 9, 6, -10, 20, 40);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        //arm
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = _fillColor;
        Beach.crc2.ellipse(_x + -116, _y + 24, 5, 10, -50, 20, 40);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        //finger
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = _fillColor;
        Beach.crc2.ellipse(_x + -121, _y + 30, 5, 9, -80, 25, 40);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        //leg
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = _fillColor;
        Beach.crc2.ellipse(_x + -64, _y + 23, 23, 9, -7, 20, 40);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        //leg
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = _fillColor;
        Beach.crc2.ellipse(_x + -49, _y + 23, 19, 8, -8, 20, 40);
        Beach.crc2.closePath();
        Beach.crc2.fill();
        //foot
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = _fillColor;
        Beach.crc2.ellipse(_x + -42, _y + 40, 12, 6, -3, 20, 40);
        Beach.crc2.closePath();
        Beach.crc2.fill();
    }
    function update() {
        drawSky(0, 0);
        Beach.crc2.restore();
        Beach.crc2.save();
        boats.forEach(boat => {
            boat.draw();
            boat.move(0.01);
            Beach.crc2.restore();
            Beach.crc2.save();
        });
        drawSun(400, 0);
        Beach.crc2.restore();
        Beach.crc2.save();
        clouds.forEach(cloud => {
            cloud.draw();
            cloud.move(0.01);
        });
        birds.forEach(bird => {
            bird.draw();
            bird.move(0.02);
        });
        drawSand(0, 0);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawTree("#824f2b", 200, 350);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawTreeG("#824f2b", 400, 740);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawTreeCoco("#824f2b", 400, 780);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawTree("#824f2b", 100, 650);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawTreeCoco("#824f2b", 310, 990);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawTreeG("#824f2b", 300, 1040);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawTree("#824f2b", 340, 500);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawTreeG("#824f2b", 540, 900);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawHuman("#824f2b", 520, 560);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawHuman("#824f2b", 200, 500);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawHuman("#824f2b", 380, 700);
        Beach.crc2.restore();
        Beach.crc2.save();
    }
    // update();
    window.setInterval(update, 60);
})(Beach || (Beach = {}));
//# sourceMappingURL=script.js.map