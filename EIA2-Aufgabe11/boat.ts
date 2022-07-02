namespace Beach {
    export class Boat extends Moveable {

        position: Vector;
        fillColor: string;
        velocity: Vector;
        canvasWidth: number;

        constructor(_position: Vector, _fillColor: string, _canvasWidth: number) {
            super(_position);
            
            this.position = _position;
            this.fillColor = _fillColor;
            this.velocity = new Vector(125, 1);
            this.canvasWidth = _canvasWidth;
        }

        public static getDirection(): number {
            return Boat.forward ? 1 : -1;
        }

        public static getSpeed(): number {
            return 5 * Boat.getDirection();
        }

        public static getSpawn(): number {
            return 150 * Boat.getDirection();
        }

        public move(): void {
            let currentSpawn: number = Boat.getSpawn();
            this.position.x += Boat.getSpeed();

            if (Boat.forward && this.position.x >= this.canvasWidth + currentSpawn) {
                this.position.x = -currentSpawn;
            } else if (!Boat.forward && this.position.x < currentSpawn) {
                this.position.x = this.canvasWidth - currentSpawn;
            }
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
