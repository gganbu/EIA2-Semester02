namespace Beach {
    export class Tree {

        position: Vector;
        treePositions: Array<Array<Vector>>;
        treeRadius: Array<number>; 
        trunkColor: string;
        treeColor: string;
        shape: number;

        constructor(_position: Vector, _treeFillColor: string, _trunkFillColor: string, _shape: number) {
            
            this.position = _position;
            this.treePositions = 
            [

            [new Vector(20, 50), new Vector(50, 21), new Vector(50, 25), new Vector(17, 55)],

            [new Vector(15, -2), new Vector(37, 35), new Vector(20, 55), new Vector(20, 40)],

            [new Vector(13, 20), new Vector(24, 10), new Vector(42, 35), new Vector(25, 43)],

            [new Vector(16, 30), new Vector(32, 13), new Vector(37, 10), new Vector(22, 30)],

            [new Vector(13, 20), new Vector(24, 10), new Vector(42, 35), new Vector(25, 43)],

            [new Vector(10, 30), new Vector(35, -20), new Vector(50, 25), new Vector(40, 10)],

            [new Vector(10, 30), new Vector(35, -20), new Vector(50, 25), new Vector(40, 10)],

            [new Vector(15, -2), new Vector(37, 35), new Vector(20, 55), new Vector(20, 40)],

            [new Vector(13, 20), new Vector(24, 10), new Vector(42, 35), new Vector(25, 43)],

            [new Vector(10, 30), new Vector(35, -20), new Vector(50, 25), new Vector(40, 10)]
                
            ];
            
            this.treeRadius = [60, 35, 50, 50];
            this.treeColor = _treeFillColor;
            this.trunkColor = _trunkFillColor;
            this.shape = _shape;
        }

        draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            //TreeTrunk
            crc2.beginPath();
            crc2.fillStyle = this.trunkColor;
            crc2.fillRect(0, 25, 25, 110);
            crc2.closePath();

            //Coco
            crc2.beginPath();
            crc2.fillStyle = ("#795644");
            crc2.ellipse(this.position.x + -220, this.position.y + -293, 17, 20, -3, 20, 40);
            crc2.closePath();
            crc2.fill();
            crc2.beginPath();
            crc2.fillStyle = ("#362204");
            crc2.ellipse(this.position.x + -222, this.position.y + -279, 3, 2, -3, 20, 40);
            crc2.ellipse(this.position.x + -228, this.position.y + -284, 3, 2, -6, 20, 40);
            crc2.ellipse(this.position.x + -218, this.position.y + -284, 3, 2, -3, 20, 40);
            crc2.closePath();
            crc2.fill();

            //Tree
            crc2.fillStyle = this.treeColor;
            this.treeRadius.forEach((radius, index) => {
                crc2.fillStyle = ("#99b178");
                crc2.beginPath();
                crc2.arc(this.treePositions[this.shape][index].x, this.treePositions[this.shape][index].y, radius, 0, 2 * Math.PI);
                crc2.closePath();
                crc2.fill();
            });

            crc2.restore();
        }
    }
}

