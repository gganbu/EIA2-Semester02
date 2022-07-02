"use strict";
var Beach;
(function (Beach) {
    class Boat extends Beach.Moveable {
        position;
        fillColor;
        velocity;
        canvasWidth;
        constructor(_position, _fillColor, _canvasWidth) {
            super(_position);
            this.position = _position;
            this.fillColor = _fillColor;
            this.velocity = new Beach.Vector(125, 1);
            this.canvasWidth = _canvasWidth;
        }
        static getDirection() {
            return Boat.forward ? 1 : -1;
        }
        static getSpeed() {
            return 5 * Boat.getDirection();
        }
        static getSpawn() {
            return 150 * Boat.getDirection();
        }
        move() {
            let currentSpawn = Boat.getSpawn();
            this.position.x += Boat.getSpeed();
            if (Boat.forward && this.position.x >= this.canvasWidth + currentSpawn) {
                this.position.x = -currentSpawn;
            }
            else if (!Boat.forward && this.position.x < currentSpawn) {
                this.position.x = this.canvasWidth - currentSpawn;
            }
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