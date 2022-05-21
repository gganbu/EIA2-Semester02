"use strict";
var Farm;
(function (Farm) {
    class Animal {
        name;
        species;
        sound;
        foodtype;
        foodAmount;
        constructor(_name, _species, _sound, _foodtype, _foodAmount) {
            this.name = _name;
            this.species = _species;
            this.sound = _sound;
            this.foodtype = _foodtype;
            this.foodAmount = _foodAmount;
        }
    }
    Farm.Animal = Animal;
})(Farm || (Farm = {}));
//# sourceMappingURL=script2.js.map