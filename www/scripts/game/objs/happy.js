define(['sprite'], function(sprite) {

	var exports = {};
	
	var Happy = exports.Happy = function(atlas) {
		this.atlas = atlas;
		this.happy = new sprite.create16(atlas, 1, 0);
		this.squished = new sprite.create16(atlas, 1, 1);
		this.x = 0;
		this.y = 0;
		this.isDead = false;
	};
	
	Happy.prototype.render = function(ctx) {
		if (!this.isDead) {
			this.happy.render(ctx, this.x, this.y);
		} else {
			this.squished.render(ctx, this.x, this.y);
		}
	};
	
	Happy.prototype.hit = function(x, y) {
		if (x >= this.x-8 && y >= this.y-8 && x <= this.x+8 && y <= this.y+8) {
			this.isDead = true;
		}
	};
	
	return exports;
	
});