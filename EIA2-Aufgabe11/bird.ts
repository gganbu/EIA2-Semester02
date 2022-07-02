namespace Beach {
    export class Bird extends Moveable {
        
        velocity: Vector;
        fillColor: string;
        shape: number;

        constructor(_position: Vector, _fillColor: string, _shape: number) {
            super(_position);
            
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 400);
            this.fillColor = _fillColor;
            this.shape = _shape;

            this.position = new Vector(-150, 100);
       }

        draw(): void {  

            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.fillStyle = this.fillColor;
    
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
    
            crc2.closePath();
            crc2.fill();
            crc2.restore();            
        }


        drawShape0(): void {
            crc2.arc(220, 120, 10, 0, Math.PI * 1, true);
            crc2.arc(200, 120, 10, 0, Math.PI * 1, true);
            crc2.lineWidth = 3;
            crc2.stroke();
            crc2.strokeStyle = "#000000";
            crc2.fillStyle = "rgba(0, 0, 0, 0)";
        }
        drawShape1(): void {            
            crc2.arc(220, 120, 10, 0, Math.PI * 1, true);
            crc2.arc(200, 120, 10, 0, Math.PI * 1, true);
            crc2.lineWidth = 3;
            crc2.stroke();
            crc2.strokeStyle = "#000000";
            crc2.fillStyle = "rgba(0, 0, 0, 0)";
        }
        drawShape2(): void {
            crc2.arc(220, 120, 10, 0, Math.PI * 1, true);
            crc2.arc(200, 120, 10, 0, Math.PI * 1, true);
            crc2.lineWidth = 3;
            crc2.stroke();
            crc2.strokeStyle = "#000000";
            crc2.fillStyle = "rgba(0, 0, 0, 0)";
        }
        drawShape3(): void {
            crc2.arc(220, 120, 10, 0, Math.PI * 1, true);
            crc2.arc(200, 120, 10, 0, Math.PI * 1, true);
            crc2.lineWidth = 3;
            crc2.stroke();
            crc2.strokeStyle = "#000000";
            crc2.fillStyle = "rgba(0, 0, 0, 0)";
        }
    }
}