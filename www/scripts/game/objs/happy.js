define(['sprite', 'random'], function(sprite, r) {

	var exports = {};
	
	var Happy = exports.Happy = function(atlas) {
		this.atlas = atlas;
		this.happy = new sprite.create16(atlas, 1, 0);
		this.squished = new sprite.create16(atlas, 1, 1);
		this.x = 16*r.getRandomInt(0, 24);
		this.y = 16*r.getRandomInt(0, 24);
		this.isDead = false;
		this.vx = r.getRandomInt(-2, 2);
		this.vy = r.getRandomInt(-2, 2);
	};

	Happy.prototype.update = function() {
		if (this.x == 380 || this.x < 1) { this.vx *= -1; }
		if (this.y == 380 || this.y < 1) { this.vy *= -1; }
		if (!this.isDead) {
			this.x = (this.x+this.vx).clamp(0, 380);
			this.y = (this.y+this.vy).clamp(0, 380);
		}

	};
	
	Happy.prototype.render = function(ctx) {
		if (!this.isDead) {
			this.happy.render(ctx, this.x, this.y);
		} else {
			this.squished.render(ctx, this.x, this.y);
		}
	};
	
	Happy.prototype.hit = function(x, y) {
		if (x >= this.x-16 && y >= this.y-16 && x <= this.x+16 && y <= this.y+16) {
			this.isDead = true;
		}
	};
	
	return exports;
	
});