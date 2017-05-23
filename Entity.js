function Entity(x, y, genes) {

	var nutritionHealth = 0.25;
	var diseaseHealth = -1;
	var timeHealth = 0.005;

	//Entity traits
	this.size = 6;
	this.mutationRate = 0.02;
	this.reproductionRate = 0.001;
	this.location = createVector(x, y);
	this.velocity = createVector(0, -2);
	this.acceleration = createVector(0, 0);
	this.maxSpeed = 5;
	this.maxAcc = 0.5;
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
				this.genes[i] += random(-0.2, 0.2);
			}
		}
	}

	this.draw = function() {
		var phi = this.velocity.heading() + PI/2;
		push();
		translate(this.location.x, this.location.y);
		rotate(phi);

		//Draw the entity
		var green = color(0, 255, 0);
		var red = color(255, 0, 0);
		var statusColor = lerpColor(red, green, this.health / 5);
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
		ellipse(0, 0, this.genes[2] * 5);
		stroke(red);
		ellipse(0, 0, this.genes[3] * 5);

		pop()
	}

	this.steer = function(nutritionList, diseaseList) {
		var nutritionSense = this.genes[2];
		var diseaseSense = this.genes[3];

		//If the closest nutrition or disease is within 5px, it will consume it, else, it will steer in that direction
		var headingNutrition = this.encounter(nutritionList, nutritionHealth, nutritionSense)
		var headingDisease = this.encounter(diseaseList, diseaseHealth, diseaseSense)

		headingNutrition.mult(this.genes[0]);
		headingDisease.mult(this.genes[1]);

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
		newVelocity.limit(this.Acc);

		return newVelocity;
	}

	this.updateStatus = function() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
		this.health -= timeHealth;
	}

	this.encounter = function(list, healthChange, senseAbility) {
		var closestDistance = Infinity;
		var closestParticle = null;

		for (var i = list.length - 1; i >= 0; i--) {
			var distance = this.location.dist(list[i].location);
			if (distance <= this.maxSpeed) {
				list.splice(i, 1);
				this.health += healthChange;
			} else if (distance < closestDistance && distance < senseAbility) {
				closestDistance = distance;
				closestParticle = list[i].location;
			}
		}
		return closestParticle != null ? this.seekDirection(closestParticle) : createVector(0,0);
	}

	this.reproduce = function () {
		if (random(1) < this.reproductionRate) {
			console.log("Entity reproduced!")
			return new Entity(this.location.x, this.location.y, this.genes)
		} else {
			return null;
		}
	}

	this.isAlive = function() {
		return (this.health > 0);
	}

	this.nearBoundary = function() {
		var margin = 20;

		if (this.location.x < margin) {
			var steerVector = createVector(this.maxSpeed, this.velocity.y);
		} else if (this.location.x > width - margin) {
			var steerVector = createVector(-this.maxSpeed, this.velocity.y);
		}
		if (this.location.y < margin) {
			var steerVector = createVector(this.velocity.x, this.maxSpeed);
		} else if (this.location.y > height - margin) {
			var steerVector = createVector(this.velocity.x, -this.maxSpeed);
		}

		if (steerVector != null) {
			steerVector.normalize();
			steerVector.mult(this.maxSpeed);
			var newVelocity = p5.Vector.sub(steerVector, this.velocity);
			newVelocity.limit(this.maxAcc);
			this.changeDirection(newVelocity);
		}
	}
}