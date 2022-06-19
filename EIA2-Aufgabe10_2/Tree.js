"use strict";
var Beach;
(function (Beach) {
    class Tree {
        position;
        treePositions;
        treeRadius;
        trunkColor;
        treeColor;
        shape;
        constructor(_position, _treeFillColor, _trunkFillColor, _shape) {
            this.position = _position;
            this.treePositions =
                [
                    [new Beach.Vector(20, 50), new Beach.Vector(50, 21), new Beach.Vector(50, 25), new Beach.Vector(17, 55)],
                    [new Beach.Vector(15, -2), new Beach.Vector(37, 35), new Beach.Vector(20, 55), new Beach.Vector(20, 40)],
                    [new Beach.Vector(13, 20), new Beach.Vector(24, 10), new Beach.Vector(42, 35), new Beach.Vector(25, 43)],
                    [new Beach.Vector(16, 30), new Beach.Vector(32, 13), new Beach.Vector(37, 10), new Beach.Vector(22, 30)],
                    [new Beach.Vector(13, 20), new Beach.Vector(24, 10), new Beach.Vector(42, 35), new Beach.Vector(25, 43)],
                    [new Beach.Vector(10, 30), new Beach.Vector(35, -20), new Beach.Vector(50, 25), new Beach.Vector(40, 10)],
                    [new Beach.Vector(10, 30), new Beach.Vector(35, -20), new Beach.Vector(50, 25), new Beach.Vector(40, 10)],
                    [new Beach.Vector(15, -2), new Beach.Vector(37, 35), new Beach.Vector(20, 55), new Beach.Vector(20, 40)],
                    [new Beach.Vector(13, 20), new Beach.Vector(24, 10), new Beach.Vector(42, 35), new Beach.Vector(25, 43)],
                    [new Beach.Vector(10, 30), new Beach.Vector(35, -20), new Beach.Vector(50, 25), new Beach.Vector(40, 10)]
                ];
            this.treeRadius = [60, 35, 50, 50];
            this.treeColor = _treeFillColor;
            this.trunkColor = _trunkFillColor;
            this.shape = _shape;
        }
        draw() {
            Beach.crc2.save();
            Beach.crc2.translate(this.position.x, this.position.y);
            //TreeTrunk
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = this.trunkColor;
            Beach.crc2.fillRect(0, 25, 25, 110);
            Beach.crc2.closePath();
            //Coco
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = ("#795644");
            Beach.crc2.ellipse(this.position.x + -220, this.position.y + -293, 17, 20, -3, 20, 40);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            Beach.crc2.beginPath();
            Beach.crc2.fillStyle = ("#362204");
            Beach.crc2.ellipse(this.position.x + -222, this.position.y + -279, 3, 2, -3, 20, 40);
            Beach.crc2.ellipse(this.position.x + -228, this.position.y + -284, 3, 2, -6, 20, 40);
            Beach.crc2.ellipse(this.position.x + -218, this.position.y + -284, 3, 2, -3, 20, 40);
            Beach.crc2.closePath();
            Beach.crc2.fill();
            //Tree
            Beach.crc2.fillStyle = this.treeColor;
            this.treeRadius.forEach((radius, index) => {
                Beach.crc2.fillStyle = ("#99b178");
                Beach.crc2.beginPath();
                Beach.crc2.arc(this.treePositions[this.shape][index].x, this.treePositions[this.shape][index].y, radius, 0, 2 * Math.PI);
                Beach.crc2.closePath();
                Beach.crc2.fill();
            });
            Beach.crc2.restore();
        }
    }
    Beach.Tree = Tree;
})(Beach || (Beach = {}));
//# sourceMappingURL=tree.js.map