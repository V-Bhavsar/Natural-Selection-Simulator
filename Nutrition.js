function Nutrition(x, y, minorRadius, majorRadius) {
	this.x = x;
	this.y = y;
	this.minorRadius = minorRadius;
	this.majorRadius = majorRadius;
	this.location = createVector(x, y);

	var theta = PI/12;

	this.draw = function() {
		noStroke();
		var red = color(0, 255, 0)
		fill(red);
		beginShape();
		for (var i = 0; i < 2*PI; i += 2*theta) {
			var vertX = x + Math.cos(i) * this.majorRadius;
			var vertY = y + Math.sin(i) * this.majorRadius;
			vertex(vertX, vertY);
			vertX = x + Math.cos(i + theta*0.5) * this.minorRadius;
			vertY = y + Math.sin(i + theta*0.5) * this.minorRadius;
			vertex(vertX, vertY);
		}
		endShape(CLOSE);

	}
}