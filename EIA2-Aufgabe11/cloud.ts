namespace Beach {
    export class Cloud extends Moveable {

        position: Vector;
        fillColor: string;
        velocity: Vector;
        canvasWidth: number;

        constructor(_position: Vector, _fillColor: string, _canvasWidth: number ) {
            super(_position);
            
            this.position = _position;
            this.fillColor = _fillColor;
            this.velocity = new Vector(150, 0);
            this.canvasWidth = _canvasWidth;
        }

        public static getDirection(): number {
            return Cloud.forward ? 1 : -1;
        }

        public static getSpeed(): number {
            return 5 * Cloud.getDirection();
        }

        public static getSpawn(): number {
            return 150 * Cloud.getDirection();
        }

        public move(): void {
            let currentSpawn: number = Cloud.getSpawn();
            this.position.x += Cloud.getSpeed();

            if (Cloud.forward && this.position.x >= this.canvasWidth + currentSpawn) {
                this.position.x = -currentSpawn;
            } else if (!Cloud.forward && this.position.x < currentSpawn) {
                this.position.x = this.canvasWidth - currentSpawn;
            }
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
