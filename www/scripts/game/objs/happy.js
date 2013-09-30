define(['sprite', 'random', 'systems/gore_field'], function(sprite, r, gore_field) {

	var exports = {};

	var getRandomVelocity = function() {
		var v = r.getRandomInt(1, 3);
		if (r.getRandomInt(0, 1) === 0) {
			v = 0-v;
		}
		return v;
	};

	var happyfw;
	var getHappy = function(atlas) {
		if (!happyfw) {
			happyfw = sprite.create(atlas, 1, 0);
		}
		return happyfw;
	};

	var squishedfw;
	var getSquished = function(atlas) {
		if (!squishedfw) {
			squishedfw = sprite.create(atlas, 1, 1);
		}
		return squishedfw;
	};

	var Happy = exports.Happy = function(atlas) {
		this.atlas = atlas;
		this.happy = getHappy(atlas);
		this.squished = getSquished(atlas);
		this.x = 16*r.getRandomInt(0, 24);
		this.y = 16*r.getRandomInt(0, 24);
		this.isDead = false;
		this.vx = getRandomVelocity();
		this.vy = getRandomVelocity();
	};


	var maxSpeed = 2.4;
	var retardation = 0.98;
	Happy.prototype.update = function() {
		if (this.x == 380 || this.x < 1) { this.vx *= -1; }
		if (this.y == 380 || this.y < 1) { this.vy *= -1; }
		if (!this.isDead) {
			this.x = (this.x+this.vx).clamp(0, 380);
			this.y = (this.y+this.vy).clamp(0, 380);

			d = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
			if (d > maxSpeed) {
				this.vx *= retardation;
				this.vy *= retardation;
			}
		}

	};

	var startSquishScale = 1.4;
	var stepSpreadMultiplier = 2;
	var goreAmount = 2;	
	var spreadEndStep = 2;
	var squishScale = 0.5;
	Happy.prototype.renderGore = function(ctx, step) {
		this.squished.render(ctx, this.x + (this.vx*step*stepSpreadMultiplier), this.y + (this.vy*step*stepSpreadMultiplier));
		if (step <= spreadEndStep) {
			this.squished.render(ctx, this.x + (this.vx*step*stepSpreadMultiplier), this.y - (this.vy*step*stepSpreadMultiplier));
			this.squished.render(ctx, this.x - (this.vx*step*stepSpreadMultiplier), this.y + (this.vy*step*stepSpreadMultiplier));
		}
		if (step <= goreAmount) {
			this.squished.scale *= squishScale;
			this.renderGore(ctx, step+1);
		}
	};

	Happy.prototype.render = function(ctx) {
		if (!this.isDead) {
			this.happy.render(ctx, this.x, this.y);
		}
	};

	var hitDiameter = 38;
	Happy.prototype.hit = function(x, y) {
		var d = Math.sqrt(Math.pow(x-(this.x+8), 2)+Math.pow(y-(this.y+8), 2));
		if (d <= hitDiameter) {
			this.impact(x, y);
			this.isDead = true;
			gore_field.draw(function(bufferCtx) {
				this.squished.scale = startSquishScale;
				this.squished.render(bufferCtx, this.x, this.y);
				this.renderGore(bufferCtx, 1);
			}.bind(this));
		}
	};

	var impactDiameter = 132;
	Happy.prototype.impact = function(x, y) {
		var d = Math.distance(this.x, x, this.y, y);
		if (d <= impactDiameter) {
			var vx = this.x - x;
			var vy = this.y - y;
			var div = Math.max(x, y);
			var pow = 1300/d;
			this.vx = vx * pow / div;
			this.vy = vy * pow / div;
		}
	};
	
	return exports;
	
});