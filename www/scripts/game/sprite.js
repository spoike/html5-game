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
	
	exports.create16 = function(atlas, idx, idy) {
		return new Sprite(atlas, idx, idy, 16, 16);
	};
	
	return exports;
});