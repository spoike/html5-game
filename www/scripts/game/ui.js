define(['sprite', 'text'], function(s, text) {

	var exports = {};

	var UI = function(atlas) {
		this.atlas = atlas;
		this.isGameOver = false;
	};

	var score = 0;
	var visibleScore = 0;
	var step = 1;

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

	UI.prototype.render = function(ctx) {

		var i, w, h, beginy;

		ctx.save();

		if (!this.isGameOver) {
			text.write(ctx, 'Score: ' + visibleScore, 10, 10);
		}
		else {
			w = ctx.canvas.width;
			h = ctx.canvas.height;
			ctx.fillStyle = "rgba(0,0,0,0.4)";
			ctx.fillRect(0, 0, w, h);
			beginy = h/2-24;
			text.writeCenter(ctx, 'YOU WIN!', beginy);
			text.writeCenter(ctx, 'Your score: ' + score, beginy + 18);

		}

		ctx.restore();
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