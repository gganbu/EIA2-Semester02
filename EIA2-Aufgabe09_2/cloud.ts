namespace Beach {
    export class Cloud {

        position: Vector;
        fillColor: string;
        motion: Vector;

        constructor(_position: Vector, _fillColor: string) {
            
            this.position = _position;
            this.fillColor = _fillColor;
            this.motion = new Vector(0, 0);
            this.motion.random(200, 100);
        }

            draw(): void {  

                crc2.beginPath();
                crc2.fillStyle = "#ffffff";

                crc2.arc(this.position.x + 20, this.position.y + 40, 20, 0, 2 * Math.PI);
                crc2.arc(this.position.x + 45, this.position.y + 25, 35, 0, 2 * Math.PI);
                crc2.arc(this.position.x + 87, this.position.y + 20, 40, 0, 2 * Math.PI);
                crc2.arc(this.position.x + 123, this.position.y + 20, 20, 0, 2 * Math.PI);

                crc2.closePath();
                crc2.fill();
        }

        move(_time: number): void {
           
            let offset: Vector = new Vector(this.motion.x, 0);
            offset.factor(_time);
            this.position.add(offset);
         
            if (this.position.x < 0)
            this.position.x += crc2.canvas.width;
         
            if (this.position.x > crc2.canvas.width)
            this.position.x -= crc2.canvas.width;
          
            }
    }
}