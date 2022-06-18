"use strict";
var Beach;
(function (Beach) {
    window.addEventListener("load", handleLoad);
    let moveables = [];
    let humans = [];
    let trees = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Beach.crc2 = canvas.getContext("2d");
        //Clouds
        let cloudCount = 3;
        for (let i = 0; i < cloudCount; i++) {
            let canvasRandomX = (Math.random() * (Beach.crc2.canvas.width - 100)) + 100;
            let canvasRandomY = Math.random() * (Beach.crc2.canvas.height - 600);
            let newCloud = new Beach.Cloud(new Beach.Vector(canvasRandomX, canvasRandomY), "#f7f7f7");
            moveables.push(newCloud);
        }
        console.log(moveables);
        //Boats
        let boatCount = 2;
        for (let i = 0; i < boatCount; i++) {
            let canvasRandomX = (Math.random() * (Beach.crc2.canvas.width - 100)) + 300;
            let canvasRandomY = Math.random() * (Beach.crc2.canvas.height - 650);
            let newBoat = new Beach.Boat(new Beach.Vector(canvasRandomX, canvasRandomY), "#f7f7f7");
            moveables.push(newBoat);
        }
        console.log(moveables);
        //Birds
        let birdCount = 6;
        let birdColors = ["#b32f1b", "#b3511b", "#b3851b", "#3a5e3a"];
        for (let i = 0; i < birdCount; i++) {
            let random = Math.floor(Math.random() * 4);
            let canvasRandomX = Math.random() * Beach.crc2.canvas.width;
            let canvasRandomY = Math.random() * Beach.crc2.canvas.height;
            let newBird = new Beach.Bird(new Beach.Vector(canvasRandomX, canvasRandomY), birdColors[random], random);
            moveables.push(newBird);
        }
        //Humans
        let humanCount = 3;
        let humanColors = ["#824f2b", "#5e3e14", "#4a300f"];
        for (let i = 0; i < humanCount; i++) {
            let random = Math.floor(Math.random() * 3);
            let canvasRandomX = Math.random() * Beach.crc2.canvas.width;
            let canvasRandomY = Math.random() * Beach.crc2.canvas.height + 500;
            let newHuman = new Beach.Human(new Beach.Vector(canvasRandomX, canvasRandomY), humanColors[random]);
            humans.push(newHuman);
        }
        //Trees        
        let treeCount = 4;
        let treeColors = ["#1f361f", "#b32f1b", "#b3511b", "#b3851b", "#3a5e3a"];
        let treeTrunkColors = ["#5e4434", "#6b4f3f", "#6e5141"];
        for (let i = 0; i < treeCount; i++) {
            let treeRandom = Math.floor(Math.random() * 5);
            let treeTrunkRandom = Math.floor(Math.random() * 3);
            let canvasRandomX = (Math.random() * (Beach.crc2.canvas.width - 100)) + 100;
            let canvasRandomY = Math.random() * (Beach.crc2.canvas.height) + 390;
            let treeShapeRandom = Math.floor(Math.random() * 10);
            let newTree = new Beach.Tree(new Beach.Vector(canvasRandomX, canvasRandomY), treeColors[treeRandom], treeTrunkColors[treeTrunkRandom], treeShapeRandom);
            trees.push(newTree);
        }
    }
    //Sky
    function drawSky(_x, _y) {
        let gradient = Beach.crc2.createLinearGradient(0, 0, 0, Beach.crc2.canvas.height);
        gradient.addColorStop(0, "#87ceeb");
        gradient.addColorStop(1, "#c9e9f6 ");
        gradient.addColorStop(1, "HSL(170, 80%, 30%)");
        Beach.crc2.fillStyle = gradient;
        Beach.crc2.fillRect(0, 0, Beach.crc2.canvas.width, Beach.crc2.canvas.height);
    }
    //Sun
    function drawSun(_x, _y) {
        let gradient = Beach.crc2.createLinearGradient(0, 0, 0, 390);
        gradient.addColorStop(0, "#FCE570");
        gradient.addColorStop(1, "#FDB813 ");
        gradient.addColorStop(1, "HSL(120, 80%, 30%)");
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = gradient;
        Beach.crc2.arc(400, _y, 200, 0, 5 * Math.PI);
        Beach.crc2.fill();
        Beach.crc2.closePath();
    }
    //Water
    function drawOcean(_x, _y, _fillColor) {
        Beach.crc2.beginPath();
        let gradient = Beach.crc2.createLinearGradient(0, 0, 0, 390);
        gradient.addColorStop(0.6, "#d1f1f9");
        gradient.addColorStop(0.9, "#2389da");
        Beach.crc2.fillStyle = gradient;
        //Water1
        Beach.crc2.beginPath();
        Beach.crc2.moveTo(700, 500);
        Beach.crc2.quadraticCurveTo(200, 1, -100, 500);
        Beach.crc2.moveTo(0, 0);
        Beach.crc2.fill();
        //Water2
        Beach.crc2.beginPath();
        Beach.crc2.moveTo(1600, 545);
        Beach.crc2.quadraticCurveTo(1600, 0, -1000, 400);
        Beach.crc2.fill();
    }
    //Sand
    function drawSand(_x, _y) {
        let gradient = Beach.crc2.createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0.5, "#fff5be");
        gradient.addColorStop(0.75, "#ffe3a0");
        Beach.crc2.beginPath();
        Beach.crc2.fillStyle = gradient;
        Beach.crc2.moveTo(_x, _y + 360);
        Beach.crc2.lineTo(_x + 1500, _y + 450);
        Beach.crc2.lineTo(_x + 1500, _y + 850);
        Beach.crc2.lineTo(_x - 3000, _y + 850);
        Beach.crc2.closePath();
        Beach.crc2.fill();
    }
    //Update
    function update() {
        drawSky(0, 0);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawSand(400, 0);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawSun(0, 300);
        Beach.crc2.restore();
        Beach.crc2.save();
        drawOcean(0, 350, "#575554");
        Beach.crc2.restore();
        Beach.crc2.save();
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
})(Beach || (Beach = {}));
//# sourceMappingURL=script.js.map