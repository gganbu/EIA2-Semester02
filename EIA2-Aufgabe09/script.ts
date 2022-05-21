namespace Farm {
    let animals: Animal[] = [];
    interface Food {
        grass: number;
        corn: number;
        meat: number;
        fish: number;
        carrots: number;
    }

    let currentFood: Food = {
        grass: Math.floor(Math.random() * (350 - 120) + 120),
        corn: Math.floor(Math.random() * (600 - 320) + 320),
        meat: Math.floor(Math.random() * (400 - 145) + 145),
        fish: Math.floor(Math.random() * (300 - 60) + 60),
        carrots: Math.floor(Math.random() * (500 - 280) + 280)
    };

    let i: number = 0;

    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        loadAnimals();
        foodAnimals();

        document.querySelector("#nextDay")!.addEventListener("click", reload);
        document.querySelector("#nextDay")!.addEventListener("click", foodAnimals);
        document.querySelector("#nextDay")!.addEventListener("click", day);

    }

    function reload(): void {
        document.getElementById("supply")!.innerHTML = " ";
        document.getElementById("cow")!.innerHTML = " ";
        document.getElementById("chicken")!.innerHTML = " ";
        document.getElementById("dog")!.innerHTML = " ";
        document.getElementById("cat")!.innerHTML = " ";
        document.getElementById("pig")!.innerHTML = " ";
    }

    function day(): void {
        i++;
        document.getElementById("day")!.innerHTML = "Day " + i;
    }

    function loadAnimals(): void {
        let cow: Animal = new Animal("Kuh", "cow", "moou", "grass", 10);        
        let chicken: Animal = new Animal("Chick", "chicken", "bock", "corn", 30);
        let dog: Animal = new Animal("Doggo", "dog", "woof", "meat", 12);
        let cat: Animal = new Animal("Mieze", "cat", "meow", "fish", 5);
        let pig: Animal = new Animal("Peppa", "pig", "oink", "carrots", 25);

        animals.push(cow);
        animals.push(chicken);
        animals.push(dog);
        animals.push(cat);
        animals.push(pig);
    }

    function foodForAnimal(): void {

        currentFood.grass -= animals[0].foodAmount;
        currentFood.corn -= animals[1].foodAmount;
        currentFood.meat -= animals[2].foodAmount;
        currentFood.fish -= animals[3].foodAmount;
        currentFood.carrots -= animals[4].foodAmount;

        if (currentFood.grass <= 0) {
            alert("Not enough grass!");
            window.location.reload();
        }
        else if (currentFood.corn <= 0) {
            alert("Not enough corn!");
            window.location.reload();
        }
        else if (currentFood.meat <= 0) {
            alert("Not enough meat!");
            window.location.reload();
        }
        else if (currentFood.fish <= 0) {
            alert("Not enough fish!");
            window.location.reload();
        }
        else if (currentFood.carrots <= 0) {
            alert("Not enough carrots!");
            window.location.reload();
        }

        let supplyDiv: HTMLElement = document.getElementById("supply")!;
        supplyDiv.innerHTML = "supply:" + "<br>" + "<br>" +
            currentFood.grass + " kg grass " + "<br>" +
            currentFood.corn + " kg corn " + "<br>" +
            currentFood.meat + " kg meat " + "<br>" +
            currentFood.fish + " kg fish " + "<br>" +
            currentFood.carrots + " kg carrots" + "<br>";
    }

    function foodAnimals(): void {
        let cowDiv: HTMLElement = document.getElementById("cow")!;
        let chickenDiv: HTMLElement = document.getElementById("chicken")!;
        let dogDiv: HTMLElement = document.getElementById("dog")!;
        let catDiv: HTMLElement = document.getElementById("cat")!;
        let pigDiv: HTMLElement = document.getElementById("pig")!;

        // tslint:disable-next-line: variable-name
        let FoodA: number;
                // tslint:disable-next-line: variable-name
        let FoodB: number;
                // tslint:disable-next-line: variable-name
        let FoodC: number;
                // tslint:disable-next-line: variable-name
        let FoodD: number;
                // tslint:disable-next-line: variable-name
        let FoodE: number;

        FoodA = currentFood.grass;
        FoodA -= animals[0].foodAmount;
        FoodB = currentFood.corn;
        FoodB -= animals[1].foodAmount;
        FoodC = currentFood.meat;
        FoodC -= animals[2].foodAmount;
        FoodD = currentFood.fish;
        FoodD -= animals[3].foodAmount;
        FoodE = currentFood.carrots;
        FoodE -= animals[4].foodAmount;

        cowDiv.innerHTML += "<br>" + animals[0].name + " ate " + animals[0].foodAmount + " kg of " + animals[0].foodtype + " and now has" + " " + FoodA + " " + "left" + "<br>" +
            "<br>" + "Old MacDonald had a farm, E-I-E-I-O, <br> And on his farm he had a " + animals[0].species + " E-I-E-I-O, <br> With a " + animals[0].sound + " " + animals[0].sound + " here and a " + animals[0].sound + " there a " + animals[0].sound + "<br> everywhere" + "<br>";
        chickenDiv.innerHTML += "<br>" + animals[1].name + " ate " + animals[1].foodAmount + " kg of " + animals[1].foodtype + " and now has" + " " + FoodB + " " + "left" + "<br>" +
            "<br>" + "Old MacDonald had a farm, E-I-E-I-O, <br> And on his farm he had a " + animals[1].species + " E-I-E-I-O, <br> With a " + animals[1].sound + " " + animals[1].sound + " here and a " + animals[3].sound + " there a " + animals[1].sound + "<br> everywhere" + "<br>";
        dogDiv.innerHTML += "<br>" + animals[2].name + " ate " + animals[2].foodAmount + " kg of " + animals[2].foodtype + " and now has" + " " + FoodC + " " + "left" + "<br>" +
            "<br>" + "Old MacDonald had a farm, E-I-E-I-O, <br> And on his farm he had a " + animals[2].species + " E-I-E-I-O, <br> With a " + animals[2].sound + " " + animals[2].sound + " here and a " + animals[1].sound + " there a " + animals[2].sound + "<br> everywhere" + "<br>";
        catDiv.innerHTML += "<br>" + animals[3].name + " ate " + animals[3].foodAmount + " kg of " + animals[3].foodtype + " and now has" + " " + FoodD + " " + "left" + "<br>" +
            "<br>" + "Old MacDonald had a farm, E-I-E-I-O, <br> And on his farm he had a " + animals[3].species + " E-I-E-I-O, <br> With a " + animals[3].sound + " " + animals[3].sound + " here and a " + animals[2].sound + " there a " + animals[3].sound + "<br> everywhere" + "<br>";
        pigDiv.innerHTML += "<br>" + animals[4].name + " ate " + animals[4].foodAmount + " kg of " + animals[4].foodtype + " and now has" + " " + FoodE + " " + "left" + "<br>" +
            "<br>" + "Old MacDonald had a farm, E-I-E-I-O, <br> And on his farm he had a " + animals[4].species + " E-I-E-I-O, <br> With a " + animals[4].sound + " " + animals[4].sound + " here and a " + animals[4].sound + " there a " + animals[4].sound + "<br> everywhere" + "<br>";

        foodForAnimal();
    }
}