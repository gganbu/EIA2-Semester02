namespace Farm {
    export class Animal {
        name: string;
        species: string;
        sound: string;
        foodtype: string;
        foodAmount: number;

        constructor(_name: string, _species: string, _sound: string, _foodtype: string, _foodAmount: number) {
            this.name = _name;
            this.species = _species;
            this.sound = _sound;
            this.foodtype = _foodtype;
            this.foodAmount = _foodAmount;
        }
    }
}