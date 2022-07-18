
// Benutzt die bevorzugte Sprache des Browsers. (Nur Englisch und Deutsch vorhanden)
var currentLanguage = (window.navigator.language || window.navigator.userLanguage || window.navigator.userLanguage).substr(0, 2);

i18n.init({lng: currentLanguage, fallbackLng: 'en', resStore: resources, getAsync: false});


var width;
var height;
var stage;
var renderer;
var game;
var startMoney = 100;

window.onload = function(){
	width = 640;
	height = 640;
	renderer = graf.autoDetectRenderer(width, height);

	document.getElementById("stage").appendChild(renderer.view);

	stage = new graf.Stage;

	init();
}

//Start-Screen und Start-Money
window.addEventListener("load", function(){
    setTimeout(
        function open(event){
            document.querySelector(".popup").style.display = "block";
        },
    )


document.querySelector("#start").addEventListener("click", function(){
    console.log(startMoney); 
    startMoney = document.getElementById("startMoney").value; //Value vom Range-Input, welchen der User auswaehlt

	cValue = document.getElementById("moneyChange").value;
	moneyCost = 3;
	if (cValue == 1) {moneyCost = moneyCost * 1;}
	else if (cValue == 2) {moneyCost = moneyCost * 2;}
	else if (cValue == 3) {moneyCost = moneyCost * 3;}
	console.log(moneyCost)

	document.querySelector(".popup").style.display = "none";
	init();
	});
});

function init(){
	game = new FarmGame(width / 32, height / 32);

	var groundTexture = graf.Texture.fromImage("assets/dirt.png");
	var ridgeTexture = graf.Texture.fromImage("assets/ridge.png");
	var pesticideTexture = graf.Texture.fromImage("assets/pesticided.png");
	var fertilizeTexture = graf.Texture.fromImage("assets/fertilized.png");
	var weedsTextures = [
		graf.Texture.fromImage("assets/weeds1.png"),
		graf.Texture.fromImage("assets/weeds2.png"),
		graf.Texture.fromImage("assets/weeds3.png"),
	];
	var weedsThresholds = [
		0.25, 0.50, 0.75
	];
	var cornTextures = [
		graf.Texture.fromImage("assets/corn0.png"),
		graf.Texture.fromImage("assets/corn1.png"),
		graf.Texture.fromImage("assets/corn2.png"),
		graf.Texture.fromImage("assets/corn3.png"),
		graf.Texture.fromImage("assets/corn4.png"),
		graf.Texture.fromImage("assets/corn5.png"),
	];
	var cornThresholds = [
		0.0, 0.25, 0.50, 0.75, 1.0, 2.0
	];
	var potatoTextures = [
		graf.Texture.fromImage("assets/potato0.png"),
		graf.Texture.fromImage("assets/potato1.png"),
		graf.Texture.fromImage("assets/potato2.png"),
		graf.Texture.fromImage("assets/potato3.png"),
		graf.Texture.fromImage("assets/potato4.png"),
		graf.Texture.fromImage("assets/potato5.png"),
	];
	var potatoThresholds = [
		0.0, 0.25, 0.50, 0.75, 1.0, 2.0
	];

	var carrotTextures = [
		graf.Texture.fromImage("assets/carrot0.png"),
		graf.Texture.fromImage("assets/carrot1.png"),
		graf.Texture.fromImage("assets/carrot2.png"),
		graf.Texture.fromImage("assets/carrot3.png"),
		graf.Texture.fromImage("assets/carrot4.png"),
		graf.Texture.fromImage("assets/carrot5.png"),
	];
	var carrotThresholds = [
		0.0, 0.25, 0.50, 0.75, 1.0, 2.0
	];

	var tomatoTextures = [
		graf.Texture.fromImage("assets/tomato0.png"),
		graf.Texture.fromImage("assets/tomato1.png"),
		graf.Texture.fromImage("assets/tomato2.png"),
		graf.Texture.fromImage("assets/tomato3.png"),
		graf.Texture.fromImage("assets/tomato4.png"),
		graf.Texture.fromImage("assets/tomato5.png"),
	];
	var tomatoThresholds = [
		0.0, 0.25, 0.50, 0.75, 1.0, 2.0
	];

	var mushTextures = [
		graf.Texture.fromImage("assets/mush0.png"),
		graf.Texture.fromImage("assets/mush1.png"),
		graf.Texture.fromImage("assets/mush2.png"),
		graf.Texture.fromImage("assets/mush3.png"),
		graf.Texture.fromImage("assets/mush4.png"),
		graf.Texture.fromImage("assets/mush5.png"),
	];
	var mushThresholds = [
		0.0, 0.25, 0.50, 0.75, 1.0, 2.0
	];

	var ground = new graf.DisplayObjectContainer();
	stage.addChild(ground);

	game.onUpdateCell = function(cell,x,y){
		if(cell.graphics == undefined){
			cell.graphics = new graf.DisplayObjectContainer();

// Fügt vorübergehend eine Versorgungsfunktion zu Graf.DisplayObjectContainer hinzu, der den Index eines bestimmten Kindes zurückgibt.
// Diese Funktion wird verwendet, um Pesticide nach den Pflanzen einzufügen.
			cell.graphics.getChildIndex = function(child){
				for(var i = 0; i < this.children.length; i++)
					if(this.children[i] === child)
						return i;
				return -1;
			}

			ground.addChild(cell.graphics);
		}
		if(cell.gs == undefined){
			var groundSprite = new graf.Sprite(groundTexture);
			groundSprite.position.x = x * 32;
			groundSprite.position.y = y * 32;
			groundSprite.interactive = true;
			groundSprite.mousedown = function(id){
				clickCallback.call(game, cell);
			};
			groundSprite.mouseover = function(id){
				statusCursor = {x:x, y:y};
			}
			groundSprite.tap = function(id){
				id.target.mousedown(id);
				id.target.mouseover(id);
			}
			cell.graphics.addChild(groundSprite);

			// Fügt den Farbfilter nach dem ground sprite hinzu, um darüber abzudecken.
			cell.groundColorFilter = new graf.Graphics();
			cell.groundColorFilter.beginFill(0x000000, 1.);
			cell.groundColorFilter.drawRect(groundSprite.x, groundSprite.y, 32, 32);
			cell.graphics.addChild(cell.groundColorFilter);

			cell.gs = groundSprite;
		}
		var f = 0.5 * (cell.humidity);
		cell.groundColorFilter.alpha = f;

		cell.gs.setTexture(cell.plowed ? ridgeTexture : groundTexture);

		// Fügt Pesticide Deckgrafiken hinzu
		if(0 < cell.pesticide && cell.pesticideGraphics == undefined){
			cell.pesticideGraphics = new graf.Sprite(pesticideTexture);
			cell.pesticideGraphics.position = cell.gs.position;
			// Wir möchten nicht, dass pesticide-Deckgrafiken über Pflanzen gezogen werden, daher finden wir den Mais -Sprite -Index und fügen die pesticidegrafiken nach ihm ein.
			var cropIndex = cell.cornSprite != undefined ? cell.graphics.getChildIndex(cell.cornSprite) : -1;
			if(cropIndex == -1)
				cell.graphics.addChild(cell.pesticideGraphics);
			else
				cell.graphics.addChildAt(cell.pesticideGraphics, cropIndex);
		}
		else if(cell.pesticide == 0 && cell.pesticideGraphics != undefined){
			cell.graphics.removeChild(cell.pesticideGraphics);
			cell.pesticideGraphics = undefined;
		}

		// Fügt Fertilize Deckgrafiken hinzu
		if(0 < cell.fertilize && cell.fertilizeGraphics == undefined){
			cell.fertilizeGraphics = new graf.Sprite(fertilizeTexture);
			cell.fertilizeGraphics.position = cell.gs.position;
			// Wir möchten nicht, dass fertilize-Deckgrafiken über Pflanzen gezogen werden, daher finden wir den Mais -Sprite -Index und fügen die fertilizegrafiken nach ihm ein.
			var cropIndex = cell.cornSprite != undefined ? cell.graphics.getChildIndex(cell.cornSprite) : -1;
			if(cropIndex == -1)
				cell.graphics.addChild(cell.fertilizeGraphics);
			else
				cell.graphics.addChildAt(cell.fertilizeGraphics, cropIndex);
		}
		else if(cell.fertilize == 0 && cell.fertilizeGraphics != undefined){
			cell.graphics.removeChild(cell.fertilizeGraphics);
			cell.fertilizeGraphics = undefined;
		}


		for(var weedsIndex = 0; weedsIndex < weedsTextures.length; weedsIndex++){
			if(cell.weeds < weedsThresholds[weedsIndex])
				break;
		}
		if(0 < weedsIndex){
			if(cell.weedsSprite == undefined){
				var weedsSprite = new graf.Sprite(weedsTextures[weedsIndex - 1]);

				weedsSprite.position = cell.gs.position;
				cell.graphics.addChild(weedsSprite);
				cell.weedsSprite = weedsSprite;
			}
			else
				cell.weedsSprite.setTexture(weedsTextures[weedsIndex - 1]);
		}
		else if(cell.weedsSprite != undefined){
			cell.graphics.removeChild(cell.weedsSprite);
			cell.weedsSprite = undefined;
		}
		var cornIndex = 0;
		var textures = cornTextures;
		var thresholds = cornThresholds;
		if(cell.crop){
			if(cell.crop.type == "Potato"){
				textures = potatoTextures;
				thresholds = potatoThresholds;
			}
			else if(cell.crop.type == "Carrot"){
				textures = carrotTextures;
				thresholds = carrotThresholds;
			}
			else if(cell.crop.type == "Tomato"){
				textures = tomatoTextures;
				thresholds = tomatoThresholds;
			}
			else if(cell.crop.type == "Mushroom"){
				textures = mushTextures;
				thresholds = mushThresholds;
			}
			for(; cornIndex < textures.length; cornIndex++){
				if(cell.crop.amount < thresholds[cornIndex])
					break;
			}
		}
		if(0 < cornIndex){
			if(cell.cornSprite == undefined){
				var cornSprite = new graf.Sprite(textures[cornIndex - 1]);

				cornSprite.position = cell.gs.position;
				cell.graphics.addChild(cornSprite);
				cell.cornSprite = cornSprite;
			}
			else
				cell.cornSprite.setTexture(textures[cornIndex - 1]);
		}
		else if(cell.cornSprite != undefined){
			cell.graphics.removeChild(cell.cornSprite);
			cell.cornSprite = undefined;
		}
	}

	game.init();

	//Cursor-Textur
	var cursorTexture = new graf.Texture.fromImage("assets/cursor.png");
	var cursorSprite = new graf.Sprite(cursorTexture);
	stage.addChild(cursorSprite);

	var overlay = new graf.DisplayObjectContainer();

	// Status-bar unter dem Curser
	var statusCursor = {x: 0, y: 0};
	var statusPanel = new graf.DisplayObjectContainer();
	var statusPanelFrame = new graf.Graphics();
	statusPanelFrame.beginFill(0x000000, 0.5);
	statusPanelFrame.lineStyle(2, 0xffffff, 1);
	statusPanelFrame.drawRect(0, 0, 120, 145);
	statusPanel.addChild(statusPanelFrame);
	var statusText = new graf.Text("", {font: "10px Helvetica", fill: "#ffffff"});
	statusText.y = 5;
	statusText.x = 5;
	statusPanel.addChild(statusText);
	statusPanel.x = 10;
	statusPanel.y = 10;
	overlay.addChild(statusPanel);

	//Energie-Bar
	function Bar(x, y){
		graf.DisplayObjectContainer.call(this);
		this.x = x;
		this.y = y;
		this.backBar = new graf.Graphics();
		this.backBar.beginFill(0xff0000, 1.0);
		this.backBar.drawRect(0, 0, 100, 3); //Rote-Bar
		this.addChild(this.backBar);
		this.topBar = new graf.Graphics();
		this.topBar.beginFill(0x00ff00, 1.0);
		this.topBar.drawRect(0, 0, 100, 3); //Gruene-Bar
		this.addChild(this.topBar);
	}
	Bar.prototype = new graf.DisplayObjectContainer();

	Bar.prototype.setFactor = function(factor){
		this.topBar.scale.x = factor;
	}

	// Globale Status-Bar
	var gstatusPanel = new graf.DisplayObjectContainer();
	var gstatusPanelFrame = new graf.Graphics();
	gstatusPanelFrame.beginFill(0x000000, 0.5);
	gstatusPanelFrame.lineStyle(2, 0xffffff, 1);
	gstatusPanelFrame.drawRect(0, 0, 120, 75);
	gstatusPanel.addChild(gstatusPanelFrame);
	var gstatusText = new graf.Text("", {font: "10px Helvetica", fill: "#ffffff"});
	gstatusText.y = 5; //Energie-Text pos x
	gstatusText.x = 5; //Energie-Text pos y
	gstatusPanel.addChild(gstatusText);
	var gstatusWPBar = new Bar(6, 20); //Energie-Leiste
	gstatusPanel.addChild(gstatusWPBar);
	var gstatusCashText = new graf.Text("", {font: "10px Helvetica", fill: "#ffffff"});
	gstatusCashText.x = 5; //Cash-Text pos x
	gstatusCashText.y = 30; //Cash-Text pos y
	gstatusPanel.addChild(gstatusCashText);
	gstatusWeatherText = new graf.Text("", {font: "10px Helvetica", fill: "#ffffff"});
	gstatusWeatherText.x = 5; //Wetter-Text pos x
	gstatusWeatherText.y = 45; //Wetter-Text pos y
	gstatusPanel.addChild(gstatusWeatherText);
	var weatherIcons = [
		{caption: i18n.t("Sunny"), texture: graf.Texture.fromImage("assets/sunny.png")},
		{caption: i18n.t("Partly cloudy"), texture: graf.Texture.fromImage("assets/partlycloudy.png")},
		{caption: i18n.t("Cloudy"), texture: graf.Texture.fromImage("assets/cloudy.png")},
		{caption: i18n.t("Rainy"), texture: graf.Texture.fromImage("assets/rainy.png")}
	];
	var weatherSprites = [];
	for(var i = 0; i < weatherIcons.length; i++){
		var sprite = new graf.Sprite(weatherIcons[i].texture);
		sprite.x = 80; //Wetter-Icon pos x
		sprite.y = 40; //Wetter-Icon pos y
		weatherSprites.push(sprite);
		gstatusPanel.addChild(sprite);
	}
	gstatusPanel.x = 10; //Status-Panel untenlinks pos x
	gstatusPanel.y = height - 85; //Status-Panel untenlinks pos y
	overlay.addChild(gstatusPanel);

	var buttonTip = new graf.DisplayObjectContainer();
	var buttonTipFiller = new graf.Graphics();
	buttonTipFiller.beginFill(0x000000, 0.5);
	buttonTipFiller.lineStyle(2, 0xffffff, 1);
	buttonTipFiller.drawRect(0, 0, 170, 60);
	buttonTip.addChild(buttonTipFiller);
	var buttonTipWorkingPowerText = new graf.Text("", {font: "10px Helvetica", fill: "#ffffff"});
	buttonTipWorkingPowerText.x = 5;
	buttonTipWorkingPowerText.y = 5;
	buttonTip.addChild(buttonTipWorkingPowerText);
	buttonTip.x = width - 500; //Infobar pos x
	buttonTip.y = 10; //Infobar pos y
	buttonTip.visible = false;
	overlay.addChild(buttonTip);

	var buttons = [];

	/// Internal Button class
	function Button(iconImage, caption, clickEvent, active){
		graf.DisplayObjectContainer.apply(this, arguments);

		// Interactivity initialization
		this.interactive = true;
		this.click = function(){
			clickCallback = clickEvent;
			// Update activation state fuer mode select buttons
			for(var i = 0; i < buttons.length; i++)
				buttons[i].setActive(buttons[i] == this);
		}
		this.tap = this.click;
		this.mouseover = function(){
			buttonTipWorkingPowerText.setText(clickEvent.description());
			buttonTip.visible = true;
		}
		this.mouseout = function(){
			buttonTip.visible = false;
		}
		this.hitArea = new graf.Rectangle(0, 0, 115, 40); //Rechte Leiste Hitboxen

		if(buttons.length != 0 && buttons[buttons.length-1] != null){
			this.x = buttons[buttons.length-1].x + 0; //Buttonabstand x
			this.y = buttons[buttons.length-1].y + 50; //Buttonabstand y
		}

		// Click event processing
		buttons.push(this);

		// Button background graphics, teilweise transparent um Dinge dahinter zu zeigen
		var filler = new graf.Graphics();
		filler.beginFill(0x000000, 0.5);
		filler.lineStyle(1, 0x7f7f7f, 1);
		filler.drawRect(0, 0, 115, 40); //Transparente Graue Box
		this.addChild(filler);

		// Button frame graphics, welche versteckt werden koennen, wenn diese inaktiv sind
		this.frame = new graf.Graphics();
		this.frame.lineStyle(2, 0xffffff, 1);
		this.frame.drawRect(0, 0, 115, 40); //Weisser Rahmen
		this.addChild(this.frame);

		// Icon images
		if(iconImage){
			var icon = new graf.Sprite(graf.Texture.fromImage(iconImage));
			icon.x = 4; //Icon Images pos x
			icon.y = 4; //Icon Images pos y
			this.addChild(icon);
		}

		// Button caption text
		this.text = null;
		if(caption){
			this.font = i18n.exists("buttonFont:" + caption) ? i18n.t("buttonFont:" + caption) :  "15px Helvetica";
			this.text = new graf.Text(i18n.t(caption), {font: this.font, fill: "#ffffff"});
			this.text.x = 40; //Rechte-Bar Textposition x
			this.text.y = 12; //Rechte-Bar Textposition y
			this.addChild(this.text);
		}
		this.setActive(active);
	}
	Button.prototype = new graf.DisplayObjectContainer;

	Button.prototype.setActive = function(active){
		this.frame.visible = active;
		if(this.text)
			this.text.setStyle({font: this.font, fill: active ? "#ffffff" : "#afafaf"});
	}

		//Rechte Werkzeug und Seeds Leiste
	var clickCallback = FarmGame.prototype.select;
	var selectButton = new Button("assets/cursor.png", i18n.t("Select"), FarmGame.prototype.select, true);
	selectButton.x = width - 130;
	selectButton.y = 10;
	overlay.addChild(selectButton);

	overlay.addChild(new Button("assets/plow.png", "Plow", FarmGame.prototype.plow, false));
	overlay.addChild(new Button("assets/cornSeed.png", "Corn", FarmGame.prototype.seed, false));
	overlay.addChild(new Button("assets/potatoSeed.png", "Potato", FarmGame.prototype.seedTuber, false));
	overlay.addChild(new Button("assets/carrotSeed.png", "Carrot", FarmGame.prototype.seedTiber, false));
	overlay.addChild(new Button("assets/tomatoSeed.png", "Tomato", FarmGame.prototype.seedTomber, false));
	overlay.addChild(new Button("assets/mushSeed.png", "Mushroom", FarmGame.prototype.seedMush, false));
	overlay.addChild(new Button("assets/harvest.png", "Harvest", FarmGame.prototype.harvest, false));
	overlay.addChild(new Button("assets/water.png", "Water", FarmGame.prototype.water, false));
	overlay.addChild(new Button("assets/weeding.png", "Weed", FarmGame.prototype.weeding, false));
	overlay.addChild(new Button("assets/pesticide.png", "Pesticide", FarmGame.prototype.pesticideing, false));
	overlay.addChild(new Button("assets/fertilizer.png", "Fertilize", FarmGame.prototype.fertilize, false));

	stage.addChild(overlay);
	requestAnimationFrame(animate);

	// Variable, um sich an das letzte Mal des Animationsrahmens zu erinnern.
	var lastTime = null;

	function animate(timestamp) {
		// Berechnet die Delta-Zeit dieses Frame für den Game-Update-Prozess.
		if(lastTime === null)
			lastTime = timestamp;
		var deltaTime = timestamp - lastTime;
		lastTime = timestamp;

		game.update(deltaTime);

		var statusCell = game.cells[statusCursor.x][statusCursor.y];
		statusText.setText(i18n.t("Pos") + ": " + statusCursor.x + ", " + statusCursor.y + "\n"
			+ i18n.t("Weeds") + ": " + Math.floor(100 * statusCell.weeds) + " (" + Math.floor(100 * statusCell.weedRoots) + ")\n"
			+ i18n.t("Plowed") + ": " + (statusCell.plowed ? "Yes" : "No") + "\n"
			+ i18n.t("Humidity") + ": " + Math.floor(statusCell.humidity * 100) + "\n"
			+ i18n.t("Pesticide") + ": " + (statusCell.pesticide ? "Yes" : "No") + "\n"
			+ i18n.t("Fertility") + ": " + Math.floor(statusCell.fertility * 100) + "\n"
			+ i18n.t("Pest") + ": " + Math.floor(100 * statusCell.potatoPest) + "\n"
			+ (statusCell.crop ? i18n.t(statusCell.crop.type) + " " + i18n.t("growth") + ": " + Math.floor(statusCell.crop.amount * 100) : "") + "\n" //growthspeed
			+ (statusCell.crop ? i18n.t(statusCell.crop.type) + " " + i18n.t("quality") + ": " + Math.floor(statusCell.crop.getQuality() * 100) : "") + "\n"
			+ (statusCell.crop ? i18n.t(statusCell.crop.type) + " " + i18n.t("value") + ": " + Math.floor(statusCell.crop.eval()) : ""));

		cursorSprite.x = statusCursor.x * 32;
		cursorSprite.y = statusCursor.y * 32;

		gstatusText.setText(i18n.t("Working Power") + ": " + Math.floor(game.workingPower));
		gstatusWPBar.setFactor(game.workingPower / 100);
		gstatusCashText.setText(i18n.t("Cash") + ": $" + Math.floor(game.cash));
		gstatusWeatherText.setText(i18n.t("Weather") + ": (" + Math.floor(game.weather * 100) + ")\n"
			+ weatherIcons[Math.floor(game.weather * weatherIcons.length)].caption);
		for(var i = 0; i < weatherSprites.length; i++)
			weatherSprites[i].visible = i / weatherSprites.length <= game.weather && game.weather < (i+1) / weatherSprites.length;

		renderer.render(stage);

		requestAnimationFrame(animate);
	}
}
