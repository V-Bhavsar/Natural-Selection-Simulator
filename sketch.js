var entities = [];
var nutrition = [];
var disease = [];
var numEntities = 10;
var numNutrition = 40;
var numDisease = 20;

var w = 800;
var h = 500;

var showFittest = false;

var nutritionReplicationRate = 0.1;
var diseaseReplicationRate = 0.03;

function setup() {
	createCanvas(w, h);

	for (var i = 0; i < numEntities; i++) {
		var x = random(w);
		var y = random(h);
		entities.push(new Entity(x, y));
	}

	for (var i = 0; i < numNutrition; i++) {
		createNutrition();
	}

	for (var i = 0; i < numDisease; i++) {
		createDisease();
	}
}

function draw() {
	background(75);

	if (random(1) < nutritionReplicationRate) {
		createNutrition();
	}

	if (random(1) < diseaseReplicationRate) {
		createDisease();
	}

	var fittest = findFittestEntity();
	for (var i = entities.length - 1; i >= 0; i--) {
		entities[i].nearBoundary();
		entities[i].steer(nutrition, disease);
		entities[i].updateStatus();
		if (i === fittest && showFittest) {
			entities[i].draw(true);
		} else {
			entities[i].draw(false);
		}

		var babyEntity = entities[i].reproduce();
		if (babyEntity != null) {
			entities.push(babyEntity);
		}

		var isAlive = entities[i].isAlive();

		if (!isAlive) {
			console.log("Entity died!");
			entities.splice(i, 1);
			createNutrition();
		}
	}

	for (var i = 0; i < nutrition.length; i++) {
		nutrition[i].draw();
	}

	for (var i = 0; i < disease.length; i++) {
		disease[i].draw();
	}
}

function mousePressed() {
	if (random(1) < 0.75) {
		nutrition.push(new Nutrition(mouseX, mouseY, 1.5, 9));
	} else {
		disease.push(new Disease(mouseX, mouseY, 1.5, 9));
	}

}

function keyReleased() {
	if (key == 'S') {
		showFittest = !showFittest;
	}
}

function createNutrition() {
	var x = random(width);
	var y = random(height);
	nutrition.push(new Nutrition(x, y, 1.5, 9));
}

function createDisease() {
	var x = random(width);
	var y = random(height);
	disease.push(new Disease(x, y, 1.5, 9));
}

function findFittestEntity() {
	var maxHealth = 0;
	var fittest = 0;
	for (var i = 0; i < entities.length; i++) {
		if (entities[i].health > maxHealth) {
			maxHealth = entities[i].health;
			fittest = i;
		}
	}
	console.log(fittest)
	return fittest;
}
