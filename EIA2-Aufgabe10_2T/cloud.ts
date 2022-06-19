namespace Beach {
    export class Cloud extends Moveable {

        position: Vector;
        fillColor: string;
        velocity: Vector;

        constructor(_position: Vector, _fillColor: string) {
            super(_position);
            
            this.position = _position;
            this.fillColor = _fillColor;
            this.velocity = new Vector(150, 0);
        }

            draw(): void {  

                crc2.beginPath();
                crc2.fillStyle = this.fillColor;

                crc2.arc(this.position.x + 20, (this.position.y + 40), 20, 0, 2 * Math.PI);
                crc2.arc(this.position.x + 45, (this.position.y + 25), 35, 0, 2 * Math.PI);
                crc2.arc(this.position.x + 87, (this.position.y + 20), 40, 0, 2 * Math.PI);
                crc2.arc(this.position.x + 123, (this.position.y + 20), 20, 0, 2 * Math.PI);

                crc2.closePath();
                crc2.fill();
        }
    }
}
