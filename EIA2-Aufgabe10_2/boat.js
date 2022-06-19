"use strict";
var Beach;
(function (Beach) {
    class Boat extends Beach.Moveable {
        position;
        fillColor;
        velocity;
        constructor(_position, _fillColor) {
            super(_position);
            this.position = _position;
            this.fillColor = _fillColor;
            this.velocity = new Beach.Vector(125, 1);
        }
        draw() {
            Beach.crc2.beginPath();
            Beach.crc2.arc(this.position.x + 237, (this.position.y + 206), 38, 18, 1);
            Beach.crc2.fillStyle = "#ffffff";
            Beach.crc2.fill();
            Beach.crc2.closePath();
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = "#795644";
            Beach.crc2.arc(this.position.x + 260, (this.position.y + 228), 45, 19, 3);
            Beach.crc2.rect(this.position.x + 255, (this.position.y + 175), 10, 60);
            Beach.crc2.closePath();
            Beach.crc2.fill();
        }
    }
    Beach.Boat = Boat;
})(Beach || (Beach = {}));
//# sourceMappingURL=boat.js.map