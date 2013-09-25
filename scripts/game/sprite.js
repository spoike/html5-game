define([], function() {
	var exports = {};
	
	var gridUnit = 16;
	
	var Sprite = exports.Sprite = function(atlas, idx, idy, w, h) {
		this.atlas = atlas;
		this.w = w;
		this.h = h;
		this.idx = idx;
		this.idy = idy;
		this.scale = 1;
	};
	
	Sprite.prototype.render = function(ctx, x, y) {
		ctx.drawImage(this.atlas, 
			this.idx*gridUnit, this.idy*gridUnit, 
			this.w, this.h, 
			x, y, 
			this.w*this.scale, this.h*this.scale);
	};

	var defaultW = 16;

	exports.setDefaultWidth = function(w) {
		defaultW = w;
	};
	
	exports.create = function(atlas, idx, idy, w, h) {
		w = w || defaultW;    // default: 16 px width
		h = h || w; // default: square
		return new Sprite(atlas, idx, idy, w, h);
	};

	return exports;
});