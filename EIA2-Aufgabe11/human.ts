namespace Beach {
    export class Human {

        position: Vector;
        fillColor: string;

        constructor(_position: Vector, _fillColor: string) {
            
            this.position = _position;
            this.fillColor = _fillColor;
        }

        draw(): void {  
        //towel
        crc2.beginPath();
        crc2.fillStyle = ("#b34f5a");
        crc2.rect(this.position.x + -125, this.position.y + 20, 90, 35);
        crc2.closePath();
        crc2.fill();

        crc2.beginPath();
        crc2.fillStyle = ("#fcfbfa");
        crc2.rect(this.position.x + -125, this.position.y + 20, 40, 35);
        crc2.closePath();
        crc2.fill();

        //Body
        crc2.beginPath();
        crc2.fillStyle = this.fillColor;
        crc2.ellipse(this.position.x + -90, this.position.y + 20, 15, 22, -10, 20, 40);
        crc2.closePath();
        crc2.fill();

        //Head
        crc2.beginPath();
        crc2.fillStyle = this.fillColor;
        crc2.ellipse(this.position.x + -95, this.position.y + -10, 13, 13, -10, 20, 40);
        crc2.closePath();
        crc2.fill();


        //glasses
        crc2.beginPath();
        crc2.fillStyle = ("#1C1C1C");
        crc2.rect(this.position.x + -104, this.position.y + -17, 7, 6);
        crc2.closePath();
        crc2.fill();

        crc2.beginPath();
        crc2.fillStyle = ("#1C1C1C");
        crc2.rect(this.position.x + -93, this.position.y + -17, 7, 6);
        crc2.closePath();
        crc2.fill();

        crc2.beginPath();
        crc2.fillStyle = ("#1C1C1C");
        crc2.rect(this.position.x + -108, this.position.y + -15.5, 24, 2);
        crc2.closePath();
        crc2.fill();

        //shoulder
        crc2.beginPath();
        crc2.fillStyle = this.fillColor;
        crc2.ellipse(this.position.x + -110, this.position.y + 16, 9, 6, -10, 20, 40);
        crc2.closePath();
        crc2.fill();

        //arm
        crc2.beginPath();

        crc2.ellipse(this.position.x + -116, this.position.y + 24, 5, 10, -50, 20, 40);
        crc2.closePath();
        crc2.fill();

        //finger
        crc2.beginPath();
        crc2.fillStyle = this.fillColor;
        crc2.ellipse(this.position.x + -121, this.position.y + 30, 5, 9, -80, 25, 40);
        crc2.closePath();
        crc2.fill();

        //leg
        crc2.beginPath();
        crc2.fillStyle = this.fillColor;
        crc2.ellipse(this.position.x + -64, this.position.y + 23, 23, 9, -7, 20, 40);
        crc2.closePath();
        crc2.fill();

        //leg
        crc2.beginPath();
        crc2.fillStyle = this.fillColor;
        crc2.ellipse(this.position.x + -49, this.position.y + 23, 19, 8, -8, 20, 40);
        crc2.closePath();
        crc2.fill();

        //foot
        crc2.beginPath();
        crc2.fillStyle = this.fillColor;
        crc2.ellipse(this.position.x + -42, this.position.y + 40, 12, 6, -3, 20, 40);
        crc2.closePath();
        crc2.fill();
        }
    }
}