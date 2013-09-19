define(['sprite'], function(s) {
	
	var exports = {};

	var Background = exports.Background = function(atlas) {
		this.sprite = s.create(atlas, 0, 0);
	};

	Background.prototype.render = function(ctx) {
		var x = 0, y = 0;
		for (x = 0; x < 25; x++) {
			for (y = 0; y < 25; y++) {
				this.sprite.render(ctx, 16*x, 16*y);
			}
		}		
	};

	exports.create = function(atlas) {
		return new Background(atlas);
	};

	return exports;

});