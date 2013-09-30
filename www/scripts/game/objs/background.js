define([], function() {
	
	var exports = {};

	var Background = exports.Background = function(atlas) {
		this.atlas = atlas;
	};

	Background.prototype.render = function(ctx) {
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, 396, 396);
		ctx.restore();
	};

	exports.create = function(atlas) {
		return new Background(atlas);
	};

	return exports;

});