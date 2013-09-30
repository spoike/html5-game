define(['text'], function(text) {

	var exports = {};

	var UI = function(atlas) {
		this.atlas = atlas;
		this.isGameOver = false;
		this.highScore = 0;
		this.loadHighScore();
	};

	var highScoreKey = 'highscore';
	UI.prototype.loadHighScore = function() {
		if (localStorage) {
			var score = localStorage.getItem(highScoreKey);
			if (score !== null) {
				return this.highScore = score;
			};
		}
		return 0;
	};
	UI.prototype.saveHighScore = function(newScore) {
		if (localStorage) {
			if (newScore > this.highScore) {
				this.highScore = newScore;
				localStorage.setItem(highScoreKey, this.highScore);
			}
		}
	};

	var score = 0;
	var visibleScore = 0;
	var step = 1;
	var flair = [];
	var hits = [];

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

		var i, w, h, beginy, f, toRemove = 0;

		ctx.save();

		// score flairs
		for (i = 0; i < flair.length; i++) {
			f = flair[i];
			f[2] = f[2]+1;
			text.write(ctx, '+' + f[3], f[0]-16, f[1]-(f[2]*0.20)-32);
			if (f[2] > 40) {
				toRemove++;
			}
		}
		if(toRemove > 0) {
			flair.splice(0,toRemove);
		}
		toRemove = 0;

		// hit flairs
		for (i = 0; i < hits.length; i++) {
			f = hits[i];
			f[2] = f[2]+1;
			// draw circle
			ctx.beginPath();
			ctx.fillStyle = "rgba(255,255,255,0.2)";
	    	ctx.arc(f[0], f[1], 5*f[2], 0, 2 * Math.PI, false);
			ctx.closePath();
    		ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = "rgba(255,150,150,0.4)";
	    	ctx.arc(f[0], f[1], 2*f[2], 0, 2 * Math.PI, false);
			ctx.closePath();
    		ctx.fill();
			if (f[2] > 8) {
				toRemove++;
			};
		}
		if(toRemove > 0) {
			hits.splice(0,toRemove);
		}

		if (!this.isGameOver) {
			text.write(ctx, 'Score: ' + visibleScore, 10, 10);
			if (this.highScore !== 0) {
				text.write(ctx, 'High Score: ' + this.highScore, 10, 28, 0.6);
			}
		}
		else {
			w = ctx.canvas.width;
			h = ctx.canvas.height;
			ctx.fillStyle = "rgba(0,0,0,0.4)";
			ctx.fillRect(0, 0, w, h);
			beginy = h/2-24;
			var wintext = this.highScore >= score ? 'YOU WIN!' : 'YOU GOT HIGHSCORE';
			text.writeCenter(ctx, wintext, beginy);
			text.writeCenter(ctx, 'Your score: ' + score, beginy + 18);
		}

		ctx.restore();
	};

	UI.prototype.reset = function() {
		this.saveHighScore(score);
		score = 0;
		visibleScore = 0;
	};

	exports.setScore = function(s) {
		score = s;
		visibleScore = s;
	};

	exports.incrScore = function(s, x, y) {
		if (s > 0) {
			score += s;
			flair.push([x, y, 0, s]);
		}
	};

	exports.hit = function(x, y) {
		hits.push([x, y, 0]);
	};

	var instance;
	exports.create = function(atlas) {
		return instance = new UI(atlas);
	};
 
	return exports;

});