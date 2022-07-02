"use strict";
var Beach;
(function (Beach) {
    class Bird extends Beach.Moveable {
        velocity;
        fillColor;
        shape;
        constructor(_position, _fillColor, _shape) {
            super(_position);
            this.velocity = new Beach.Vector(0, 0);
            this.velocity.random(100, 400);
            this.fillColor = _fillColor;
            this.shape = _shape;
            this.position = new Beach.Vector(-150, 100);
        }
        draw() {
            Beach.crc2.save();
            Beach.crc2.translate(this.position.x, this.position.y);
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = this.fillColor;
            // check shape
            switch (this.shape) {
                case 0:
                    this.drawShape0();
                    break;
                case 1:
                    this.drawShape1();
                    break;
                case 2:
                    this.drawShape2();
                    break;
                case 3:
                    this.drawShape3();
                    break;
                default:
                    break;
            }
            Beach.crc2.closePath();
            Beach.crc2.fill();
            Beach.crc2.restore();
        }
        drawShape0() {
            Beach.crc2.arc(220, 120, 10, 0, Math.PI * 1, true);
            Beach.crc2.arc(200, 120, 10, 0, Math.PI * 1, true);
            Beach.crc2.lineWidth = 3;
            Beach.crc2.stroke();
            Beach.crc2.strokeStyle = "#000000";
            Beach.crc2.fillStyle = "rgba(0, 0, 0, 0)";
        }
        drawShape1() {
            Beach.crc2.arc(220, 120, 10, 0, Math.PI * 1, true);
            Beach.crc2.arc(200, 120, 10, 0, Math.PI * 1, true);
            Beach.crc2.lineWidth = 3;
            Beach.crc2.stroke();
            Beach.crc2.strokeStyle = "#000000";
            Beach.crc2.fillStyle = "rgba(0, 0, 0, 0)";
        }
        drawShape2() {
            Beach.crc2.arc(220, 120, 10, 0, Math.PI * 1, true);
            Beach.crc2.arc(200, 120, 10, 0, Math.PI * 1, true);
            Beach.crc2.lineWidth = 3;
            Beach.crc2.stroke();
            Beach.crc2.strokeStyle = "#000000";
            Beach.crc2.fillStyle = "rgba(0, 0, 0, 0)";
        }
        drawShape3() {
            Beach.crc2.arc(220, 120, 10, 0, Math.PI * 1, true);
            Beach.crc2.arc(200, 120, 10, 0, Math.PI * 1, true);
            Beach.crc2.lineWidth = 3;
            Beach.crc2.stroke();
            Beach.crc2.strokeStyle = "#000000";
            Beach.crc2.fillStyle = "rgba(0, 0, 0, 0)";
        }
    }
    Beach.Bird = Bird;
})(Beach || (Beach = {}));
//# sourceMappingURL=bird.js.map