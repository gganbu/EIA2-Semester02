"use strict";
var Beach;
(function (Beach) {
    class Boat {
        position;
        fillColor;
        velocity;
        constructor(_position, _fillColor) {
            this.position = _position;
            this.fillColor = _fillColor;
            this.velocity = new Beach.Vector(0, 0);
            this.velocity.random(100, 400);
            this.position.random(0, 100);
        }
        draw() {
            Beach.crc2.save();
            Beach.crc2.translate(this.position.x, this.position.y);
            let startX = 180;
            let startY = 200;
            let zigzagSpacing = 22;
            Beach.crc2.lineWidth = 10;
            Beach.crc2.strokeStyle = "#D4F1F9"; // blue-ish color
            Beach.crc2.beginPath();
            Beach.crc2.moveTo(startX, startY);
            // draw seven lines
            // tslint:disable-next-line: typedef
            for (var n = 0; n < 7; n++) {
                // tslint:disable-next-line: typedef
                var x = startX + ((n + 1) * zigzagSpacing);
                // tslint:disable-next-line: typedef
                var y;
                if (n % 2 == 0) { // if n is even...
                    y = startY + 100;
                }
                else { // if n is odd...
                    y = startY;
                }
                Beach.crc2.lineTo(x, y);
            }
            Beach.crc2.stroke();
            Beach.crc2.lineWidth = 5;
            Beach.crc2.strokeStyle = "red";
            Beach.crc2.beginPath();
            Beach.crc2.moveTo(200, 200);
            Beach.crc2.beginPath();
            Beach.crc2.arc(237, 206, 42, 18, 1);
            Beach.crc2.fillStyle = "#ffffff";
            Beach.crc2.fill();
            Beach.crc2.closePath();
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = "#795644";
            Beach.crc2.arc(260, 228, 45, 19, 3);
            Beach.crc2.rect(255, 175, 10, 60);
            Beach.crc2.fill();
            Beach.crc2.closePath();
        }
        move(_timeslice) {
            let offset = new Beach.Vector(this.velocity.x, 0);
            offset.factor(_timeslice);
            this.position.add(offset);
        }
    }
    Beach.Boat = Boat;
})(Beach || (Beach = {}));
//# sourceMappingURL=boat.js.map