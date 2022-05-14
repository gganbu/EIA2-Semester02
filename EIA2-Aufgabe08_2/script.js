"use strict";
var L08_2_Beach;
(function (L08_2_Beach) {
    window.addEventListener("load", handleLoad);
    let crc2;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        drawSky();
        drawSun({ x: 400, y: 0 });
        drawBoat({ x: 100, y: 125 }, "#ffffff");
        drawSand({ x: 0, y: 0 });
        drawCloud({ x: 100, y: 125 }, "#ffffff");
        drawBird({ x: 100, y: 125 }, "#ffffff");
        drawCloud({ x: 1230, y: 230 }, "#ffffff");
        drawCloud({ x: 900, y: 97 }, "#ffffff");
        drawCloud({ x: 500, y: 30 }, "#ffffff");
        drawTree({ x: 200, y: 350 }, "#824f2b");
        drawTreeCoco({ x: 215, y: 420 }, "#824f2b");
        drawTreeG({ x: 400, y: 740 }, "#824f2b");
        drawTree({ x: 100, y: 640 }, "#824f2b");
        drawTreeCoco({ x: 220, y: 330 }, "#824f2b");
        drawTreeG({ x: 300, y: 1030 }, "#824f2b");
        drawTree({ x: 300, y: 520 }, "#824f2b");
        drawTreeG({ x: 200, y: 390 }, "#824f2b");
        drawHuman({ x: 520, y: 560 }, "#824f2b");
        drawHuman({ x: 200, y: 465 }, "#5e3e14");
        drawHuman({ x: 355, y: 705 }, "#4a300f");
    }
    function drawSky() {
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#d1f1f9");
        gradient.addColorStop(1, "#2389da");
        gradient.addColorStop(1, "HSL(170, 80%, 30%)");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawSun(_position) {
        crc2.beginPath();
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#FCE570");
        gradient.addColorStop(1, "#FDB813");
        gradient.addColorStop(1, "HSL(120, 80%, 30%)");
        crc2.fillStyle = gradient;
        crc2.arc(420, _position.y, 150, 0, 5 * Math.PI);
        crc2.fill();
        crc2.closePath();
    }
    function drawSand(_position) {
        let gradient = crc2.createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0.5, "#fff5be");
        gradient.addColorStop(0.6, "#ffe3a0");
        crc2.beginPath();
        crc2.fillStyle = gradient;
        crc2.moveTo(_position.x, _position.y + 360);
        crc2.lineTo(_position.x + 1500, _position.y + 460);
        crc2.lineTo(_position.x + 1500, _position.y + 850);
        crc2.lineTo(_position.x - 3000, _position.y + 850);
        crc2.closePath();
        crc2.fill();
    }
    function drawBoat(_position, _fillColor) {
        crc2.beginPath();
        crc2.arc(_position.x + 237, _position.y + 206, 42, 18, 1);
        crc2.fillStyle = "#ffffff";
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.fillStyle = "#795644";
        crc2.arc(_position.x + 260, _position.y + 230, 45, 19, 1 * Math.PI);
        crc2.rect(_position.x + 255, _position.y + 175, 10, 60);
        crc2.fill();
        crc2.closePath();
    }
    function drawCloud(_position, _fillColor) {
        crc2.beginPath();
        crc2.fillStyle = "#ffffff";
        crc2.arc(_position.x + 20, _position.y + 40, 20, 0, 2 * Math.PI);
        crc2.arc(_position.x + 45, _position.y + 25, 35, 0, 2 * Math.PI);
        crc2.arc(_position.x + 87, _position.y + 20, 40, 0, 2 * Math.PI);
        crc2.arc(_position.x + 123, _position.y + 20, 20, 0, 2 * Math.PI);
        crc2.fill();
        crc2.closePath();
    }
    function drawBird(_position, _fillColor) {
        //bird
        // tslint:disable-next-line: typedef
        let x = Math.random() * _position.x;
        // tslint:disable-next-line: typedef
        let y = Math.random() * _position.y;
        crc2.translate(x, y);
        crc2.beginPath();
        crc2.arc(220, 120, 10, 0, Math.PI * 1, true);
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.strokeStyle = "#000000";
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(240, 120, 10, 0, Math.PI * 1, true);
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.strokeStyle = "#000000";
        crc2.closePath();
        //bird2
        crc2.beginPath();
        crc2.arc(280, 85, 10, 0, Math.PI * 1, true);
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.strokeStyle = "#000000";
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(300, 85, 10, 0, Math.PI * 1, true);
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.strokeStyle = "#000000";
        crc2.closePath();
        //bird3
        crc2.beginPath();
        crc2.arc(750, 200, 10, 0, Math.PI * 1, true);
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.strokeStyle = "#000000";
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(770, 200, 10, 0, Math.PI * 1, true);
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.strokeStyle = "#000000";
        crc2.closePath();
        //bird4
        crc2.beginPath();
        crc2.arc(790, 240, 10, 0, Math.PI * 1, true);
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.strokeStyle = "#000000";
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(810, 240, 10, 0, Math.PI * 1, true);
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.strokeStyle = "#000000";
        crc2.closePath();
        //bird5
        crc2.beginPath();
        crc2.arc(840, 100, 10, 0, Math.PI * 1, true);
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.strokeStyle = "#000000";
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(860, 100, 10, 0, Math.PI * 1, true);
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.strokeStyle = "#000000";
        crc2.closePath();
        crc2.translate(-50, -80);
    }
    function drawTree(_position, _fillColor) {
        crc2.save();
        crc2.translate(_position.x, _position.y);
        //TreeTrunk
        crc2.beginPath();
        crc2.fillStyle = ("#947661");
        crc2.fillRect(0, 25, 25, 110);
        crc2.closePath();
    }
    function drawTreeG(_position, _fillColor) {
        //Tree
        crc2.beginPath();
        crc2.fillStyle = ("#99b178");
        crc2.ellipse(_position.x + -230, _position.y + -350, 17, 20, -5, 20, 40);
        crc2.ellipse(_position.x + -210, _position.y + -370, 17, 20, -5, 20, 40);
        crc2.ellipse(_position.x + -190, _position.y + -375, 17, 20, -5, 20, 40);
        crc2.ellipse(_position.x + -170, _position.y + -370, 17, 20, -4, 20, 40);
        crc2.ellipse(_position.x + -150, _position.y + -350, 17, 20, -4, 20, 40);
        crc2.ellipse(_position.x + -210, _position.y + -390, 17, 20, -1, 20, 40);
        crc2.ellipse(_position.x + -230, _position.y + -400, 17, 20, -2, 20, 40);
        crc2.ellipse(_position.x + -150, _position.y + -390, 17, 20, -2, 20, 40);
        crc2.ellipse(_position.x + -150, _position.y + -400, 17, 20, -5, 20, 40);
        crc2.closePath();
        crc2.fill();
        crc2.restore();
    }
    function drawTreeCoco(_position, _fillColor) {
        //Coco
        crc2.beginPath();
        crc2.fillStyle = ("#795644");
        crc2.ellipse(_position.x + -220, _position.y + -293, 17, 20, -3, 20, 40);
        crc2.closePath();
        crc2.fill();
        crc2.beginPath();
        crc2.fillStyle = ("#362204");
        crc2.ellipse(_position.x + -222, _position.y + -279, 3, 2, -3, 20, 40);
        crc2.ellipse(_position.x + -228, _position.y + -284, 3, 2, -6, 20, 40);
        crc2.ellipse(_position.x + -218, _position.y + -284, 3, 2, -3, 20, 40);
        crc2.closePath();
        crc2.fill();
        crc2.restore();
    }
    function drawHuman(_position, _fillColor) {
        //towel
        crc2.beginPath();
        crc2.fillStyle = ("#b34f5a");
        crc2.rect(_position.x + -125, _position.y + 20, 90, 35);
        crc2.closePath();
        crc2.fill();
        crc2.beginPath();
        crc2.fillStyle = ("#fcfbfa");
        crc2.rect(_position.x + -125, _position.y + 20, 40, 35);
        crc2.closePath();
        crc2.fill();
        //Body
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_position.x + -90, _position.y + 20, 15, 22, -10, 20, 40);
        crc2.closePath();
        crc2.fill();
        //Head
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_position.x + -95, _position.y + -10, 13, 13, -10, 20, 40);
        crc2.closePath();
        crc2.fill();
        //glasses
        crc2.beginPath();
        crc2.fillStyle = ("#1C1C1C");
        crc2.rect(_position.x + -104, _position.y + -17, 7, 6);
        crc2.closePath();
        crc2.fill();
        crc2.beginPath();
        crc2.fillStyle = ("#1C1C1C");
        crc2.rect(_position.x + -93, _position.y + -17, 7, 6);
        crc2.closePath();
        crc2.fill();
        crc2.beginPath();
        crc2.fillStyle = ("#1C1C1C");
        crc2.rect(_position.x + -108, _position.y + -15.5, 24, 2);
        crc2.closePath();
        crc2.fill();
        //shoulder
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_position.x + -110, _position.y + 16, 9, 6, -10, 20, 40);
        crc2.closePath();
        crc2.fill();
        //arm
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_position.x + -116, _position.y + 24, 5, 10, -50, 20, 40);
        crc2.closePath();
        crc2.fill();
        //finger
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_position.x + -121, _position.y + 30, 5, 9, -80, 25, 40);
        crc2.closePath();
        crc2.fill();
        //leg
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_position.x + -64, _position.y + 23, 23, 9, -7, 20, 40);
        crc2.closePath();
        crc2.fill();
        //leg
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_position.x + -49, _position.y + 23, 19, 8, -8, 20, 40);
        crc2.closePath();
        crc2.fill();
        //foot
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.ellipse(_position.x + -42, _position.y + 40, 12, 6, -3, 20, 40);
        crc2.closePath();
        crc2.fill();
    }
})(L08_2_Beach || (L08_2_Beach = {}));
//# sourceMappingURL=script.js.map