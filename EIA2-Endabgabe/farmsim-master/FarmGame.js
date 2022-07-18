// Setzlinge (Vegetables), Auswahlmoeglichkeiten, Funktionen
function FarmGame(xs,ys){
	this.xs = xs;
	this.ys = ys;
	this.rng = new Xor128();

	this.cells = [];

	this.workingPower = 100;
	this.cash = startMoney;
	this.weather = 0;
	this.time = 0;
	this.frameCount = 0;
}

FarmGame.Cell = function(weeds){
	this.weeds = weeds;
	this.weedRoots = 0.5;
	this.plowed = false;
	this.crop = null;
	this.humidity = 0.5;
	this.pesticide = 0;
	this.potatoPest = 0;
	this.fertility = 0.5;
}
FarmGame.Cell.prototype.serialize = function(){
	var v = this;
	return {
		weeds: this.weeds,
		weedRoots: this.weedRoots,
		plowed: this.plowed,
		crop: this.crop ? this.crop.serialize() : null,
		humidity: this.humidity,
		pesticide: this.pesticide,
		potatoPest: this.potatoPest,
		fertility: this.fertility,
	};
}
FarmGame.Cell.prototype.deserialize = function(data){
	this.weeds = data.weeds;
	this.weedRoots = data.weedRoots;
	this.plowed = data.plowed;
	// Versucht, den Klassennamen im FarmGame -Objekt zu finden.
	if(data.crop && data.crop.type in FarmGame){
		// Wenn hefunden, wird versucht, eine Instanz davon zu instanziieren.
		this.crop = new FarmGame[data.crop.type];
		if(this.crop)
			this.crop.deserialize(data.crop);
	}
	this.humidity = data.humidity;
	this.pesticide = data.pesticide;
	this.potatoPest = data.potatoPest;
	this.fertility = data.fertility;
}
FarmGame.Cell.prototype.plow = function(){
	var ret = !this.plowed || this.weeds != 0;
	this.weeds = 0;
	this.weedRoots *= 0.75; // Es wird schwer sein, Wurzeln vollständig zu entfernen.
	this.plowed = true;
	this.humidity /= 2; // Das Pflügen von Boden setzt Feuchtigkeit darin frei.
	this.potatoPest *= 0.5;
	return ret;
}
FarmGame.Cell.prototype.seed = function(){
	if(this.plowed && !this.crop){
		this.crop = new FarmGame.Corn;
		return true;
	}
	else
		return false;
}
FarmGame.Cell.prototype.seedTuber = function(){
	if(this.plowed && !this.crop){
		this.crop = new FarmGame.Potato;
		return true;
	}
	else
		return false;
}
FarmGame.Cell.prototype.seedTiber = function(){
	if(this.plowed && !this.crop){
		this.crop = new FarmGame.Carrot;
		return true;
	}
	else
		return false;
}
FarmGame.Cell.prototype.seedTomber = function(){
	if(this.plowed && !this.crop){
		this.crop = new FarmGame.Tomato;
		return true;
	}
	else
		return false;
}
FarmGame.Cell.prototype.seedMush = function(){
	if(this.plowed && !this.crop){
		this.crop = new FarmGame.Mushroom;
		return true;
	}
	else
		return false;
}
FarmGame.Cell.prototype.harvest = function(){
	if(this.crop && 1 < this.crop.amount){
		return true;
	}
	else
		return false;
}
FarmGame.Cell.prototype.water = function(){
	// Bewässerung von Boden macht Feuchtigkeit naeher zu 1, wird aber nicht erreicht.
	this.humidity += (1. - this.humidity) * 0.5;
	return true;
}
FarmGame.Cell.prototype.weeding = function(){
	if(this.weeds == 0)
		return false;
	this.weeds = 0;
	this.weedRoots *= 0.75; // Es wird schwer sein, Wurzeln vollständig zu entfernen.
	this.humidity *= 0.75; // Feuchtigkeit wird im Vergleich zum Pflügen eher gehalten.
	this.potatoPest *= 0.75;
	return true;
}
FarmGame.Cell.prototype.pesticideing = function(){
	this.potatoPest += (1. - this.potatoPest) - 1; //Wenn Pesticide benutzt wird, wird Pest ausgeloescht (auf 0 gesetzt)
	if(0 < this.pesticide)
		return false;
	this.pesticide++;
	return true;
}
FarmGame.Cell.prototype.fertilize = function(){
	// Dünge Boden macht die Fruchtbarkeit naeher zu 1, wird aber nicht erreicht.
	this.fertility += (1. - this.fertility) * 0.75;
	return true;
}

FarmGame.Crop = function(){
	this.type = "";
	this.amount = 0;
}

FarmGame.Crop.prototype.serialize = function(){
	return this; // Abkürzung für die Serialisierung aller member-variablen.
}

FarmGame.Crop.prototype.deserialize = function(data){
	this.amount = data.amount;
}

FarmGame.Crop.prototype.grow = function(cell,growth){
	this.amount += growth;
}

FarmGame.Crop.prototype.eval = function(){
	// Überwachsene Pflanzen produzieren kein Geld, sondern konsumieren Arbeitskraft zum Reinigen.
	if(1.0 <= this.amount && this.amount < 2.0)
		return 10;
	else
		return 0;
}

FarmGame.Crop.prototype.getQuality = function(){
	return 1;
}

//CORN 
FarmGame.Corn = function(){
	FarmGame.Crop.apply(this, arguments);
	this.type = "Corn";
	this.amount = 0;
	this.quality = 1;
}
FarmGame.Corn.prototype = new FarmGame.Crop;

FarmGame.Corn.prototype.deserialize = function(data){
	FarmGame.Crop.prototype.deserialize.apply(this,arguments);
	this.quality = data.quality;
}

FarmGame.Corn.prototype.grow = function(cell,growth){
	this.amount += growth;
	this.potatoPest = Math.max(0, this.potatoPest - growth); // Corn reinigt Boden, um Schädlinge zu verringern.
	// zu viel Luftfeuchtigkeit induzieren eine Verschlechterung von Pflanzen
	this.quality *= 1. - cell.humidity * 0.0005;
	cell.potatoPest = Math.min(1, cell.potatoPest + this.amount * 0.0002); //Pestzeit 
	cell.fertility = Math.max(0, cell.fertility - growth); // Corn absorbiert die Ernährung des Bodens, um zu wachsen
}

FarmGame.Corn.prototype.getQuality = function(){
	return this.quality;
}

FarmGame.Corn.prototype.eval = function(){
	// Corn ergibt einen etwas niedrigeren Wert als alle anderen Vegetables.
	if(1.0 <= this.amount && this.amount < 1.5)
		return 10 * Math.min(1, this.quality / 0.75); // Degradierter Korn verkauft sich nur mit einem schlechteren Preis
	else
		return 0;
}
//CORN--- 

//POTATO 
FarmGame.Potato = function(){
	FarmGame.Crop.apply(this, arguments);
	this.type = "Potato";
	this.amount = 0;
	this.quality = 1;
}
FarmGame.Potato.prototype = new FarmGame.Crop;

FarmGame.Potato.prototype.deserialize = function(data){
	FarmGame.Crop.prototype.deserialize.apply(this,arguments);
	this.quality = data.quality;
}

FarmGame.Potato.prototype.grow = function(cell,growth){
	this.amount += growth;
	this.quality *= 1. - cell.potatoPest * 0.0003;
	// Zu viel Luftfeuchtigkeit führt zu einer Verschlechterung von Pflanzen
	this.quality *= 1. - cell.humidity * 0.0003;
	cell.potatoPest = Math.min(1, cell.potatoPest + this.amount * 0.0002);
	cell.fertility = Math.max(0, cell.fertility - growth * 0.75); // Kartoffel verbraucht relativ wenig Ernährung
}

FarmGame.Potato.prototype.eval = function(){
	// Potatos ergeben einen etwas höheren Wert als Corn.
	if(1.0 <= this.amount && this.amount < 2.0)
		return 20 * Math.min(1, this.quality / 0.75); // Degradierte Kartoffeln verkaufen sich zu einem schlechteren Preis
	else
		return 0;
}

FarmGame.Potato.prototype.getQuality = function(){
	return this.quality;
}
//POTATO--- 

//CARROT 
FarmGame.Carrot = function(){
	FarmGame.Crop.apply(this, arguments);
	this.type = "Carrot";
	this.amount = 0;
	this.quality = 1;
}
FarmGame.Carrot.prototype = new FarmGame.Crop;

FarmGame.Carrot.prototype.deserialize = function(data){
	FarmGame.Crop.prototype.deserialize.apply(this,arguments);
	this.quality = data.quality;
}

FarmGame.Carrot.prototype.grow = function(cell,growth){
	this.amount += growth;
	this.quality *= 1. - cell.potatoPest * 0.0003;
	// Zu viel Luftfeuchtigkeit führt zu einer Verschlechterung von Pflanzen
	this.quality *= 1. - cell.humidity * 0.0003;
	cell.potatoPest = Math.min(1, cell.potatoPest + this.amount * 0.0002);
	cell.fertility = Math.max(0, cell.fertility - growth * 0.75); // Karotten konsumiert relativ wenig Ernährung
}

FarmGame.Carrot.prototype.eval = function(){
	// Karotten ergibt etwas höher als Mais. (Gleich viel wie Kartoffeln)
	if(1.0 <= this.amount && this.amount < 2.0)
		return 20 * Math.min(1, this.quality / 0.75); // Degradierte Karotten verkaufen sich zu einem schlechteren Preis
	else
		return 0;
}

FarmGame.Carrot.prototype.getQuality = function(){
	return this.quality;
}
//CARROT---

//TOMATO 
FarmGame.Tomato = function(){
	FarmGame.Crop.apply(this, arguments);
	this.type = "Tomato";
	this.amount = 0;
	this.quality = 1;
}
FarmGame.Tomato.prototype = new FarmGame.Crop;

FarmGame.Tomato.prototype.deserialize = function(data){
	FarmGame.Crop.prototype.deserialize.apply(this,arguments);
	this.quality = data.quality;
}

FarmGame.Tomato.prototype.grow = function(cell,growth){
	this.amount += growth;
	this.quality *= 1. - cell.potatoPest * 0.0003;
	// Zu viel Luftfeuchtigkeit führt zu einer Verschlechterung von Pflanzen
	this.quality *= 1. - cell.humidity * 0.0003;
	cell.potatoPest = Math.min(1, cell.potatoPest + this.amount * 0.0002);
	cell.fertility = Math.max(0, cell.fertility - growth * 0.75); // Tomaten konsumieren relativ wenig Ernährung
}

FarmGame.Tomato.prototype.eval = function(){
	// Tomate ergibt einen etwas höheren Wert als Mais. (Gleich zu Kartoffeln und Karotten)
	if(1.0 <= this.amount && this.amount < 2.0)
		return 20 * Math.min(1, this.quality / 0.75); // Degradierte Tomaten verkaufen sich zu einem schlechteren Preis
	else
		return 0;
}

FarmGame.Tomato.prototype.getQuality = function(){
	return this.quality;
}
//TOMATO---

//MUSHROOM 
FarmGame.Mushroom = function(){
	FarmGame.Crop.apply(this, arguments);
	this.type = "Mushroom";
	this.amount = 0;
	this.quality = 1;
}
FarmGame.Mushroom.prototype = new FarmGame.Crop;

FarmGame.Mushroom.prototype.deserialize = function(data){
	FarmGame.Crop.prototype.deserialize.apply(this,arguments);
	this.quality = data.quality;
}

FarmGame.Mushroom.prototype.grow = function(cell,growth){
	this.amount += growth;
	this.quality *= 1. - cell.potatoPest * 0.0003;
	// Zu viel Luftfeuchtigkeit führt zu einer Verschlechterung von Pflanzen
	this.quality *= 1. - cell.humidity * 0.0003;
	cell.potatoPest = Math.min(1, cell.potatoPest + this.amount * 0.0002);
	cell.fertility = Math.max(0, cell.fertility - growth * 0.75); // Pilze verbrauchen relativ wenig Ernährung
}

FarmGame.Mushroom.prototype.eval = function(){
	// Pilz ergibt einen etwas höheren Wert als Mais, aber einen niedriegeren Wert als Kartoffeln, Karotten und Tomaten
	if(1.0 <= this.amount && this.amount < 1.75)
		return 20 * Math.min(1, this.quality / 0.75); // Degradierte Pilze verkaufen sich zu einem schlechteren Preis
	else
		return 0;
}

FarmGame.Mushroom.prototype.getQuality = function(){
	return this.quality;
}
//MUSHROOM---

FarmGame.prototype.init = function(){
	if(typeof(Storage) !== "undefined"){
		this.deserialize(localStorage.getItem("FarmGame"));
	}
	else{
		for(var x = 0; x < this.xs; x++){
			var row = [];
			for(var y = 0; y < this.ys; y++){
				var weeds = this.rng.next();
				var cell = new FarmGame.Cell(weeds);

				this.onUpdateCell(cell,x,y);

				row.push(cell);
			}
			this.cells.push(row);
		}
	}
}

FarmGame.prototype.onUpdateCell = function(cell,x,y){}

FarmGame.prototype.update = function(deltaTime){
	var frameTime = 10; // Rahmenzeitintervall in Millisekunden - ZEIT - TIME
	this.time += deltaTime;

	// Wiederholt den Rahmenvorgang in konstantem Intervall.
	while(frameTime < this.time){

		this.updateInternal();

		this.time -= frameTime;
	}
}

/// Einfacher Zufallszahlengenerator.
function RandomSequence(seed){
	this.z = (seed & 0xffffffff) + 0x7fffffff;
	this.w = (((this.z ^ 123459876) * 123459871) & 0xffffffff) + 0x7fffffff;
}

RandomSequence.prototype.nexti = function(){
	return ((((this.z=36969*(this.z&65535)+(this.z>>16))<<16)+(this.w=18000*(this.w&65535)+(this.w>>16))) & 0xffffffff) + 0x7fffffff;
}

RandomSequence.prototype.next = function(){
	return this.nexti() / 0xffffffff;
}

/// Rauschen mit einer niedrigen Frequenz, die durch Interpolieren von Polygon -Diagramm realisiert wird.
function smoothNoise(i){
	var seed = 123;
	var period = 600; // eine Minute
	var sum = 0.;
	for(var j = 0; j <= 1; j++){
		var rng = new RandomSequence(Math.floor(i / period) + j);
		var value = rng.next(rng);
		// Einheitlich verteilte zufällige Variable ist quadratisch, dass regnerisches Wetter eine geringere Wahrscheinlichkeit aufweist.
		sum += value * value * (j ? i % period : period - i % period) / period;
	}
	return sum;
}

FarmGame.prototype.updateInternal = function(){

	// Feuchtigkeitskoeffizient des Wachstums für Pflanzen und Unkräuter
	function humidityGrowth(cell){
		var h = (0.5 - cell.humidity) / 0.5;
		return ((1. - h * h) + 0.25) / 1.25;
	}

	// Wetterbasierter Wachstumsgeschwindigkeitsmodifikator.
	// Die Pflanzen wachsen besser, wenn es sonnig ist. Es muss aber besonders darauf geachtet werden, dass den Pflanzen genügend Wasser gegeben wird.
	function sunlightGrowth(game,cell){
		return (1. - game.weather + 0.25) / 1.25;
	}

	// Das Wachstum des Gras hängt von der Grasdichte der benachbarten Zellen ab.
	function getGrowth(cell,x,y,getter){
		var ret = 0;
		if(0 <= x - 1) ret += getter(this.cells[x - 1][y]);
		if(x + 1 < this.xs) ret += getter(this.cells[x + 1][y]);
		if(0 <= y - 1) ret += getter(this.cells[x][y - 1]);
		if(y + 1 < this.ys) ret += getter(this.cells[x][y + 1]);
		return ret * humidityGrowth(cell) * sunlightGrowth(this,cell);
	}

	this.weather = smoothNoise(this.frameCount);

	for(var x = 0; x < this.cells.length; x++){
		for(var y = 0; y < this.cells[x].length; y++){
			var cell = this.cells[x][y];

			// Wachstum von Unkraut erhalten
			var growth = (0.0001
				+ getGrowth.call(this, cell, x, y, function(cell){return cell.weeds;}))
					* cell.fertility
					* 0.0001 * cell.potatoPest / (1. + cell.pesticide * 2.) // Pesticideing reduziert Pest.
					* 0.0001 * cell.weedRoots / (1. + cell.pesticide * 2.); // Pesticideing reduziert Unkrautwachstum.

			if(cell.weeds < 1. - growth)
				cell.weeds += growth;
			else
				cell.weeds = 1.;

			// Die Wurzeln wachsen sehr langsam im Vergleich zu Stielen und Blättern
			var rootsGrowth = (cell.weedRoots
				+ getGrowth.call(this, cell, x, y, function(cell){return (cell.weeds + cell.weedRoots) * 0.1;}))
					* 0.00001;

			if(cell.weedRoots < 1. - rootsGrowth)
				cell.weedRoots += rootsGrowth;
			else
				cell.weedRoots = 1.;

			//Erhöht das Erntewachstum. Niedrigeres Wachstum, wenn es Unkraut gibt.
			// Wenn das Corn genug wächst, wird er sich verschlechtern, egal wie Unkraut angebaut wird, aber es hängt immer noch von der Luftfeuchtigkeit ab (nasse Pflanzen verrotten schneller).
			if(cell.crop)
				cell.crop.grow(cell, cell.fertility * 0.001 * (cell.crop.amount < 1 ? 1. - cell.weeds : 1.)
					* humidityGrowth(cell) * sunlightGrowth(this,cell)); // Humid soil grows crop better

			// Die Luftfeuchtigkeit des Bodens bewegt sich allmählich in die Luft. Die Bodenfeuchtigkeit erhoeht die allmählich Luftfeuchtigkeit.
			// Pesticideing verringert die Verdunstung der Luftfeuchtigkeit.
			cell.humidity += (0.75 < this.weather && cell.humidity < this.weather ? 10. * (1. - cell.humidity) : this.weather - cell.humidity) // Rain lifts up humidity rapidly.
				* (0 < cell.pesticide ? 0.0002 : 0.0010);

			// Schädlinge nehmen allmählich ab, wenn keine Ernte vorhanden ist.
			cell.potatoPest *= 0.9999;

			// Die Fruchtbarkeit steigt im Laufe der Zeit leicht an
			cell.fertility = Math.min(1, cell.fertility + 0.00005);

			game.onUpdateCell(cell,x,y);
		}
	}

	if(this.workingPower + 0.1 < 100)
		this.workingPower += 0.1;
	else
		this.workingPower = 100;

	this.frameCount++;

}

FarmGame.prototype.deserialize = function(stream){
	var data = JSON.parse(stream);
	if(data != null){
		this.workingPower = data.workingPower;
		this.cash = data.cash;
		this.xs = data.xs;
		this.ys = data.ys;
		this.cells = [];
		var cells = data.cells;
		for(var x = 0; x < cells.length; x++){
			var row = [];
			for(var y = 0; y < cells[x].length; y++){
				var c = cells[x][y];
				if(!c)
					continue;
				var cell = new FarmGame.Cell(c.weeds);
				cell.deserialize(c);
				row.push(cell);
				this.onUpdateCell(cell,x,y);
			}
			this.cells.push(row);
		}
	}
	else{
		for(var x = 0; x < this.xs; x++){
			var row = [];
			for(var y = 0; y < this.ys; y++){
				var weeds = this.rng.next();
				var cell = new FarmGame.Cell(weeds);

				this.onUpdateCell(cell,x,y);

				row.push(cell);
			}
			this.cells.push(row);
		}
	}
}

FarmGame.prototype.select = function(cell){return true;}
FarmGame.prototype.select.description = function(){return i18n.t("Selects a cell to inspect");}

FarmGame.prototype.plow = function(cell){
	var workCost = 20; // Das Pflügen ist eine harte körperliche Aufgabe (Viel Arbeitsenergie wird genommen)
	if(this.workingPower < workCost)
		return false; // Aufgrund von geringer Arbeitsenergie aufhoeren
	if(cell.plow()){
		this.workingPower -= workCost;
		return true;
	}
	else
		return false;
}
FarmGame.prototype.plow.description = function(){
	return i18n.t("Plow and make ridges") + "\n"
		+ i18n.t("Working Power Cost") + ": 20";
}
//Seed Corn
FarmGame.prototype.seed = function(cell){
	var workCost = 10; // Pflanzen von Corn ist keine harte physische Aufgabe. (Wenig Arbeitsenergie konsum)
	var moneyCost = 1;
	if(this.potatoPest >= 99) {this.crop = null;} //Wenn Pest 99 oder groesser erreicht, dann verschwindet Crop
	if(this.workingPower < workCost || this.cash < moneyCost)
		return false; // Aufgrund von geringer Arbeitsenergie aufhoeren\
	if(cell.seed()){
		this.workingPower -= workCost;
		this.cash -= moneyCost;
		return true;
	}
	else
		return false;
}
FarmGame.prototype.seed.description = function(){
	return i18n.t("Apply crop seeds") + "\n"
		+ i18n.t("Working Power Cost") + ": 10\n"
		+ i18n.t("Money Cost") + ": $1";
}	//SeedCorn---

//Seed Potato
FarmGame.prototype.seedTuber = function(cell){
	var workCost = 15; // Pflanzen von Kartoffeln ist eine mittel harte physische Aufgabe. (Mittlerer Arbeitsenergie konsum)
	var moneyCost = 2;
	if(this.potatoPest >= 99) {this.crop = null;} //Wenn Pest 99 oder groesser erreicht, dann verschwindet Crop
	if(this.workingPower < workCost || this.cash < moneyCost)
		return false; // Aufgrund von geringer Arbeitsenergie aufhoeren
	if(cell.seedTuber()){
		this.workingPower -= workCost;
		this.cash -= moneyCost;
		return true;
	}
	else
		return false;
}
FarmGame.prototype.seedTuber.description = function(){
	return i18n.t("Plant seed tubers of potatos") + "\n"
		+ i18n.t("Working Power Cost") + ": 15\n"
		+ i18n.t("Money Cost") + ": $2";
}	//SeedPotato---

//Seed Carrot
FarmGame.prototype.seedTiber = function(cell){
	var workCost = 15; // Pflanzen von Karotten ist eine mittel harte physische Aufgabe. (Mittlerer Arbeitsenergie konsum)
	var moneyCost = 2;
	if(this.potatoPest >= 99) {this.crop = null;} //Wenn Pest 99 oder groesser erreicht, dann verschwindet Crop
	if(this.workingPower < workCost || this.cash < moneyCost)
		return false; // Aufgrund von geringer Arbeitsenergie aufhoeren
	if(cell.seedTiber()){
		this.workingPower -= workCost;
		this.cash -= moneyCost;
		return true;
	}
	else
		return false;
}
FarmGame.prototype.seedTiber.description = function(){
	return i18n.t("Plant seed tubers of carrots") + "\n"
		+ i18n.t("Working Power Cost") + ": 15\n"
		+ i18n.t("Money Cost") + ": $2";
}	//SeedCarrot---


//Seed Tomato
FarmGame.prototype.seedTomber = function(cell){
	var workCost = 12; // Pflanzen von Tomaten ist keine harte physische Aufgabe. (Wenig Arbeitsenergie konsum)
	var moneyCost = 2;
	if(this.potatoPest >= 99) {this.crop = null;} //Wenn Pest 99 oder groesser erreicht, dann verschwindet Crop
	if(this.workingPower < workCost || this.cash < moneyCost)
		return false; // Aufgrund von geringer Arbeitsenergie aufhoeren
	if(cell.seedTomber()){
		this.workingPower -= workCost;
		this.cash -= moneyCost;
		return true;
	}
	else
		return false;
}
FarmGame.prototype.seedTomber.description = function(){
	return i18n.t("Plant seed tubers of tomato") + "\n"
		+ i18n.t("Working Power Cost") + ": 10\n"
		+ i18n.t("Money Cost") + ": $2";
}	//SeedTomato---


//Seed Mushroom
FarmGame.prototype.seedMush = function(cell){
	var workCost = 10; // Pflanzen von Pilzen ist keine harte physische Aufgabe. (Wenig Arbeitsenergie konsum)
	var moneyCost = 1;
	if(this.potatoPest >= 99) {this.crop = null;} //Wenn Pest 99 oder groesser erreicht, dann verschwindet Crop
	if(this.workingPower < workCost || this.cash < moneyCost)
		return false; // Aufgrund von geringer Arbeitsenergie aufhoeren
	if(cell.seedMush()){
		this.workingPower -= workCost;
		this.cash -= moneyCost;
		return true;
	}
	else
		return false;
}
FarmGame.prototype.seedMush.description = function(){
	return i18n.t("Plant seed tubers of mushroom") + "\n"
		+ i18n.t("Working Power Cost") + ": 10\n"
		+ i18n.t("Money Cost") + ": $1";
}	//SeedCarrot---


FarmGame.prototype.harvest = function(cell){
	var workCost = 15; // Ernsten ist eine etwas haertere physische Aufgabe.
	if(this.workingPower < workCost)
		return false; // Aufgrund von geringer Arbeitsenergie aufhoeren
	if(cell.harvest()){
		this.workingPower -= workCost;
		this.cash += cell.crop.eval();
		cell.crop = null;
		cell.pesticide = 0; // Ernte wirft pesticided Blätter ab
		return true;
	}
	else
		return false;
}
FarmGame.prototype.harvest.description = function(){
	return i18n.t("Harvest and sell crops\nto gain money")
		+ "\n" + i18n.t("Working Power Cost") + ": 15";
}

FarmGame.prototype.water = function(cell){
	var workCost = 5; // Bewässerung ist eine leichte Aufgabe.
	if(this.workingPower < workCost)
		return false; // Aufgrund von geringer Arbeitsleistung aufhoeren
	if(cell.water()){
		this.workingPower -= workCost;
		return true;
	}
	else
		return false;
}
FarmGame.prototype.water.description = function(){
	return i18n.t("Water soil") + "\n"
		+ i18n.t("Working Power Cost") + ": 5";
}

FarmGame.prototype.weeding = function(cell){
	var workCost = 15; // Weeding ist eine etwas haertere physische Aufgabe (mehr Arbeitsenergie Konsum)
	if(this.workingPower < workCost)
		return false; // Aufgrund von geringer Arbeitsleistung aufhoeren
	if(cell.weeding()){
		this.workingPower -= workCost;
		return true;
	}
	else
		return false;
}
FarmGame.prototype.weeding.description = function(){
	return i18n.t("Weed out without plowing\n"
		+ "Soil humidity is rather kept") + "\n"
		+ i18n.t("Working Power Cost") + ": 15";
}

FarmGame.prototype.pesticideing = function(cell){
	var workCost = 10; // Pesticideing ist eine einfach körperliche Arbeit.
	var moneyCost = 10; // Und es kostet Geld.
	if(this.workingPower < workCost || this.cash < moneyCost)
		return false;
	if(cell.pesticideing()){
		this.workingPower -= workCost;
		this.cash -= moneyCost;
		return true;
	}
	else
		return false;
}
FarmGame.prototype.pesticideing.description = function(){
	return i18n.t("Pesticide harvest and soil \n"
		+ "Keeps harvest safe") + "\n"
		+ i18n.t("Working Power Cost") + ": 10\n"
		+ i18n.t("Money Cost") + ": $10";
}

FarmGame.prototype.fertilize = function(cell){
	var workCost = 5; // Düngung ist nur überall etwas verteilen, also wenig körperliche Arbeit erfordernd.
	var moneyCost = 3; // Aber es kostet Geld.
	if(this.workingPower < workCost || this.cash < moneyCost)
		return false;
	if(cell.fertilize()){
		this.workingPower -= workCost;
		this.cash -= moneyCost;
		return true;
	}
	else
		return false;
}
FarmGame.prototype.fertilize.description = function(){
	return i18n.t("Add organic fertilizer to soil\n"
		+ "Helps crops grow") + "\n"
		+ i18n.t("Working Power Cost") + ": 5\n"
		+ i18n.t("Money Cost") + ": $3";
}


