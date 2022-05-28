namespace Beach {
    export class Boat {

        position: Vector;
        fillColor: string;
        velocity: Vector;

        constructor(_position: Vector, _fillColor: string) {

            this.position = _position;
            this.fillColor = _fillColor;
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 400);
            this.position.random(0, 100);
        }

        draw(): void {

            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            let startX: number = 180;
            let startY: number = 200;
            let zigzagSpacing: number = 22;

            crc2.lineWidth = 10;
            crc2.strokeStyle = "#D4F1F9"; // blue-ish color
            crc2.beginPath();
            crc2.moveTo(startX, startY);

            // draw seven lines
            // tslint:disable-next-line: typedef
            for (var n = 0; n < 7; n++) {
                // tslint:disable-next-line: typedef
                var x = startX + ((n + 1) * zigzagSpacing);
                // tslint:disable-next-line: typedef
                var y;

                if (n % 2 == 0) { // if n is even...
                    y = startY + 100;
                }
                else { // if n is odd...
                    y = startY;
                }
                crc2.lineTo(x, y);
            }

            crc2.stroke();


            crc2.lineWidth = 5;
            crc2.strokeStyle = "red";
            crc2.beginPath();
            crc2.moveTo(200, 200);

            crc2.beginPath();
            crc2.arc(237, 206, 42, 18, 1);
            crc2.fillStyle = "#ffffff";

            crc2.fill();
            crc2.closePath();

            crc2.beginPath();
            crc2.fillStyle = "#795644";

            crc2.arc(260, 228, 45, 19, 3);
            crc2.rect(255, 175, 10, 60);
            crc2.fill();
            crc2.closePath();

        }

        move(_timeslice: number): void {

            let offset: Vector = new Vector(this.velocity.x, 0);
            offset.scale(_timeslice);
            this.position.add(offset);

        }
    }
}
