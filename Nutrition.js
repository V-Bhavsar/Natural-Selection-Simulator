function Nutrition(x, y, minorRadius, majorRadius) {
	this.x = x;
	this.y = y;
	this.minorRadius = minorRadius;
	this.majorRadius = majorRadius;

	var theta = PI/12;

	this.draw = function() {
		noStroke();
		var green = color(0, 255, 0)
		fill(green);
		beginShape();
		for (var i = 0; i < PI; i += theta) {
			var vertX = x + Math.cos(i) * this.majorRadius;
			var vertY = y + Math.sin(i) * this.minorRadius;
			vertex(vertX, vertY);
			vertX = x + Math.cos(i + theta) * this.minorRadius;
			vertY = y + Math.sin(i + theta) * this.minorRadius;
			vertex(vertX, vertY);
		}
		endShape(CLOSE);

	}
}