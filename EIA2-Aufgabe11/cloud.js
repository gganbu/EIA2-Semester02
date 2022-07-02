"use strict";
var Beach;
(function (Beach) {
    class Cloud extends Beach.Moveable {
        position;
        fillColor;
        velocity;
        canvasWidth;
        constructor(_position, _fillColor, _canvasWidth) {
            super(_position);
            this.position = _position;
            this.fillColor = _fillColor;
            this.velocity = new Beach.Vector(150, 0);
            this.canvasWidth = _canvasWidth;
        }
        static getDirection() {
            return Cloud.forward ? 1 : -1;
        }
        static getSpeed() {
            return 5 * Cloud.getDirection();
        }
        static getSpawn() {
            return 150 * Cloud.getDirection();
        }
        move() {
            let currentSpawn = Cloud.getSpawn();
            this.position.x += Cloud.getSpeed();
            if (Cloud.forward && this.position.x >= this.canvasWidth + currentSpawn) {
                this.position.x = -currentSpawn;
            }
            else if (!Cloud.forward && this.position.x < currentSpawn) {
                this.position.x = this.canvasWidth - currentSpawn;
            }
        }
        draw() {
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = this.fillColor;
            Beach.crc2.arc(this.position.x + 20, (this.position.y + 40), 20, 0, 2 * Math.PI);
            Beach.crc2.arc(this.position.x + 45, (this.position.y + 25), 35, 0, 2 * Math.PI);
            Beach.crc2.arc(this.position.x + 87, (this.position.y + 20), 40, 0, 2 * Math.PI);
            Beach.crc2.arc(this.position.x + 123, (this.position.y + 20), 20, 0, 2 * Math.PI);
            Beach.crc2.closePath();
            Beach.crc2.fill();
        }
    }
    Beach.Cloud = Cloud;
})(Beach || (Beach = {}));
//# sourceMappingURL=cloud.js.map