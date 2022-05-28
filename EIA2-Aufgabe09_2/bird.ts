namespace Beach {
    export class Bird {
        
        position: Vector;
        velocity: Vector;
        fillColor: string;
        shape: number;

        constructor(_position: Vector, _fillColor: string, _shape: number) {

            this.position = _position;
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 400);
            this.shape = _shape;
        }

        draw(): void {  

            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
    
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
            
        move(_timeslice: number): void {
           
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
         
            if (this.position.x < 0)
            this.position.x += crc2.canvas.width;
         
            if (this.position.y < 0)
            this.position.y += crc2.canvas.height;
         
            if (this.position.x > crc2.canvas.width)
            this.position.x -= crc2.canvas.width;
         
            if (this.position.y > crc2.canvas.height)
            this.position.y -= crc2.canvas.height;
            }
        }
}