namespace Beach {
    export class Boat extends Moveable {

        position: Vector;
        fillColor: string;
        velocity: Vector;

        constructor(_position: Vector, _fillColor: string) {
            super(_position);
            
            this.position = _position;
            this.fillColor = _fillColor;
            this.velocity = new Vector(125, 1);
        }

            draw(): void {  

                crc2.beginPath();
                crc2.arc(this.position.x + 237, (this.position.y + 206), 38, 18, 1);
                crc2.fillStyle = "#ffffff";
    
                crc2.fill();
                crc2.closePath();
    
                crc2.beginPath();
                crc2.fillStyle = "#795644";
    
                crc2.arc(this.position.x + 260, (this.position.y + 228), 45, 19, 3);
                crc2.rect(this.position.x + 255, (this.position.y + 175), 10, 60);
                crc2.closePath();
                crc2.fill();
        }
    }
}
