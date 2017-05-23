function Disease(x, y, minorRadius, majorRadius) {
	this.x = x;
	this.y = y;
	this.minorRadius = minorRadius;
	this.majorRadius = majorRadius;

	var theta = PI/4;

	this.draw = function() {
		noStroke();
		var red = color(255, 0, 0)
		fill(red);
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