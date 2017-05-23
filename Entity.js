function Entity(x, y, genes) {
	//Entity traits
	this.size = 6;
	this.mutationRate = 0.02;
	this.location = createVector(x, y);
	this.velocity = createVector(0, 2);
	this.acceleration = createVector(0, 0);
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
}