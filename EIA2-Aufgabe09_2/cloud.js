"use strict";
var Beach;
(function (Beach) {
    class Cloud {
        position;
        fillColor;
        velocity;
        constructor(_position, _fillColor) {
            this.position = _position;
            this.fillColor = _fillColor;
            this.velocity = new Beach.Vector(0, 0);
            this.velocity.random(200, 100);
        }
        draw() {
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = "#ffffff";
            Beach.crc2.arc(this.position.x + 20, this.position.y + 40, 20, 0, 2 * Math.PI);
            Beach.crc2.arc(this.position.x + 45, this.position.y + 25, 35, 0, 2 * Math.PI);
            Beach.crc2.arc(this.position.x + 87, this.position.y + 20, 40, 0, 2 * Math.PI);
            Beach.crc2.arc(this.position.x + 123, this.position.y + 20, 20, 0, 2 * Math.PI);
            Beach.crc2.closePath();
            Beach.crc2.fill();
        }
        move(_timeslice) {
            let offset = new Beach.Vector(this.velocity.x, 0);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += Beach.crc2.canvas.width;
            if (this.position.x > Beach.crc2.canvas.width)
                this.position.x -= Beach.crc2.canvas.width;
        }
    }
    Beach.Cloud = Cloud;
})(Beach || (Beach = {}));
//# sourceMappingURL=cloud.js.map