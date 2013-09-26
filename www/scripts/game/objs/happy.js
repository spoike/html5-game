define(['sprite', 'random'], function(sprite, r) {

	var exports = {};
	
	var getRandomVelocity = function() {
		var v = r.getRandomInt(1, 3);
		if (r.getRandomInt(0, 1) === 0) {
			v = 0-v;
		}
		return v;
	};

	var Happy = exports.Happy = function(atlas) {
		this.atlas = atlas;
		this.happy = sprite.create(atlas, 1, 0);
		this.squished = sprite.create(atlas, 1, 1);
		this.x = 16*r.getRandomInt(0, 24);
		this.y = 16*r.getRandomInt(0, 24);
		this.isDead = false;
		this.vx = getRandomVelocity();
		this.vy = getRandomVelocity();
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

	var hitDiameter = 32;	
	Happy.prototype.hit = function(x, y) {
		var d = Math.sqrt(Math.pow(x-(this.x+8), 2)+Math.pow(y-(this.y+8), 2));
		if (d <= hitDiameter) {
			this.isDead = true;
		}
	};
	
	return exports;
	
});