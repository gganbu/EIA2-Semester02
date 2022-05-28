"use strict";
var Beach;
(function (Beach) {
    class Bird {
        position;
        velocity;
        fillColor;
        shape;
        constructor(_position, _fillColor, _shape) {
            this.position = _position;
            this.velocity = new Beach.Vector(0, 0);
            this.velocity.random(100, 400);
            this.shape = _shape;
        }
        draw() {
            Beach.crc2.save();
            Beach.crc2.translate(this.position.x, this.position.y);
            Beach.crc2.beginPath();
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
        move(_timeslice) {
            let offset = new Beach.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += Beach.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += Beach.crc2.canvas.height;
            if (this.position.x > Beach.crc2.canvas.width)
                this.position.x -= Beach.crc2.canvas.width;
            if (this.position.y > Beach.crc2.canvas.height)
                this.position.y -= Beach.crc2.canvas.height;
        }
    }
    Beach.Bird = Bird;
})(Beach || (Beach = {}));
//# sourceMappingURL=bird.js.map