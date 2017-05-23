function Entity(x, y, genes) {

	var nutritionHealth = 0.25;
	var diseaseHealth = -0.1;
	var timeHealth = -0.05;

	//Entity traits
	this.size = 6;
	this.mutationRate = 0.02;
	this.reproductationRate = 0.2;
	this.location = createVector(x, y);
	this.velocity = createVector(0, 2);
	this.acceleration = createVector(0, 0);
	this.maxSpeed = 3;
	this.health = 2;
	this.genes = [];

	if (genes === undefined) {
		//Attraction towards nutrition
		this.genes[0] = random(-2, 2);
		//Attraction towards disease
		this.genes[1] = random(-2, 2);
		//Ability to sense nearby nutrition
		this.genes[2] = random(0, 50);
		//Ability to sense nearby disease
		this.genes[3] = random(0, 50);
	} else {
		this.genes = genes;
		for (var i = 0; i < 4; i++) {
			if(random(1) < this.mutationRate) {
				this.genes[i] += random[-0.1, 0.1];
			}
		}
	}

	this.draw = function() {
		var phi = this.velocity.heading();
		push();
		translate(this.location.x, this.location.y);
		rotate(phi);

		//Draw the entity
		var green = color(0, 255, 0);
		var red = color(255, 0, 0);
		var statusColor = lerpColor(red, green, this.health / 2);
		fill(statusColor);
		stroke(statusColor);
		strokeWeight(1);
		line(0, 0, 0, 40);
		beginShape();
		triangle(0, -this.size * 2, -this.size, this.size * 2, this.size, this.size * 2);
		endShape(CLOSE);

		//Draw sense ability indicators
		noFill();
		stroke(green);
		ellipse(0, 0, this.genes[2] * 2);
		stroke(red);
		ellipse(0, 0, this.genes[3] * 2);

		pop()
	}

	this.steer = function(nutritionList, diseaseList) {
		var nutritionSense = this.genes[2];
		var diseaseSense = this.genes[3];

		//If the closest nutrition or disease is within 5px, it will consume it, else, it will steer in that direction
		var headingNutrition = this.encounter(nutritionList, nutritionHealth, nutritionSense)
		var headingDisease = this.encounter(diseaseList, diseaseHealth, diseaseSense)

		headingNutrition.mult(genes[0]);
		headingDisease.mult(genes[1]);

		this.changeDirection(headingNutrition);
		this.changeDirection(headingDisease);
	}

	this.changeDirection = function(desiredHeading) {
		this.acceleration.add(desiredHeading);
	}

	this.seekDirection = function(targetLocation) {
		//Creating a direction vector from current location to desired location
		var steerX = targetLocation.x - this.location.x;
		var steerY = targetLocation.y - this.location.y;

		//Desired Velocity
		var steerVector = createVector(steerX, steerY);
		steerVector.setMag(this.maxSpeed);

		//Creating a vector for newVelocity to by subtracting the currentVelocity from the steerVector
		var newVelocity = p5.Vector.sub(steerVector, this.velocity);
		newVelocity.limit(this.maxSpeed);

		return newVelocity;
	}

	this.updateStatus = function() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
		this.health -= timeHealth;
	}
}