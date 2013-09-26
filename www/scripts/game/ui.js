define(['sprite'], function(s) {

	var exports = {};

	var UI = function(atlas) {
		this.atlas = atlas;
		this.isGameOver = false;
	};

	var score = 0;
	var visibleScore = 0;
	var step = 1;

	UI.prototype.writeText = function(ctx, str, x, y) {
		var i, c, cx, cy;
		for (i = 0; i < str.length; i++) {
			c = str.charCodeAt(i);
			cx = c%16;
			cy = Math.floor(c/16);
			ctx.drawImage(this.atlas,
				cx*16, (16+cy)*16,
				16,16,
				x+(i*16),y,
				16,16);
		};
	};

	UI.prototype.update = function() {
		if (visibleScore < score) {
			visibleScore += step;
			step *= 1.2;
			visibleScore = Math.floor(visibleScore);
		} else if (visibleScore > score) {
			step = 1;
			visibleScore = score;
		}
	};

	UI.prototype.writeTextCenter = function(ctx, str, y) {
		var w = ctx.canvas.width;
		beginx = (w/2)-((str.length-1)*8);
		this.writeText(ctx, str, beginx, y);
	};

	UI.prototype.render = function(ctx) {

		var i, charIdx, text, w, h, beginy;

		if (!this.isGameOver) {
			this.writeText(ctx, 'Score: ' + visibleScore, 10, 10);
		}
		else {
			w = ctx.canvas.width;
			h = ctx.canvas.height;
			ctx.save();
			ctx.fillStyle = "rgba(0,0,0,0.4)";
			ctx.fillRect(0, 0, w, h);
			beginy = h/2-24;
			this.writeTextCenter(ctx, 'YOU WIN!', beginy);
			this.writeTextCenter(ctx, 'Your score: ' + score, beginy + 18);

			ctx.restore();
		}

	};

	exports.setScore = function(s) {
		score = s;
		visibleScore = s;
	};

	exports.incrScore = function(s) {
		score += s;
	};

	exports.create = function(atlas) {
		return new UI(atlas);
	};
 
	return exports;

});