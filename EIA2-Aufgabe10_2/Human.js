"use strict";
var Beach;
(function (Beach) {
    class Human {
        position;
        fillColor;
        constructor(_position, _fillColor) {
            this.position = _position;
            this.fillColor = _fillColor;
        }
        draw() {
            //towel
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = ("#b34f5a");
            Beach.crc2.rect(this.position.x + -125, this.position.y + 20, 90, 35);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = ("#fcfbfa");
            Beach.crc2.rect(this.position.x + -125, this.position.y + 20, 40, 35);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            //Body
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = this.fillColor;
            Beach.crc2.ellipse(this.position.x + -90, this.position.y + 20, 15, 22, -10, 20, 40);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            //Head
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = this.fillColor;
            Beach.crc2.ellipse(this.position.x + -95, this.position.y + -10, 13, 13, -10, 20, 40);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            //glasses
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = ("#1C1C1C");
            Beach.crc2.rect(this.position.x + -104, this.position.y + -17, 7, 6);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = ("#1C1C1C");
            Beach.crc2.rect(this.position.x + -93, this.position.y + -17, 7, 6);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = ("#1C1C1C");
            Beach.crc2.rect(this.position.x + -108, this.position.y + -15.5, 24, 2);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            //shoulder
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = this.fillColor;
            Beach.crc2.ellipse(this.position.x + -110, this.position.y + 16, 9, 6, -10, 20, 40);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            //arm
            Beach.crc2.beginPath();
            Beach.crc2.ellipse(this.position.x + -116, this.position.y + 24, 5, 10, -50, 20, 40);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            //finger
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = this.fillColor;
            Beach.crc2.ellipse(this.position.x + -121, this.position.y + 30, 5, 9, -80, 25, 40);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            //leg
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = this.fillColor;
            Beach.crc2.ellipse(this.position.x + -64, this.position.y + 23, 23, 9, -7, 20, 40);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            //leg
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = this.fillColor;
            Beach.crc2.ellipse(this.position.x + -49, this.position.y + 23, 19, 8, -8, 20, 40);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            //foot
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = this.fillColor;
            Beach.crc2.ellipse(this.position.x + -42, this.position.y + 40, 12, 6, -3, 20, 40);
            Beach.crc2.closePath();
            Beach.crc2.fill();
        }
    }
    Beach.Human = Human;
})(Beach || (Beach = {}));
//# sourceMappingURL=human.js.map