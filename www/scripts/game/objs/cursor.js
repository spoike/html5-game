define(['sprite'], function(s) {

	var exports = {};

	var Cursor = exports.Cursor = function(atlas) {
		this.sprite = s.create(atlas, 3, 0, 32);
		this.x = 0;
		this.y = 0;
		this.isVisible = false;
	};

	Cursor.prototype.render = function(ctx) {
		if (this.isVisible) this.sprite.render(ctx, this.x-16, this.y - 16);
	};

	exports.create = function(atlas) {
		return new Cursor(atlas);
	};

	return exports;

});