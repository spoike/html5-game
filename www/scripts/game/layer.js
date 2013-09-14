define([], function() {

	var exports = {};

	var Layer = exports.Layer = function(context, atlas) {
		this.context = context;
		this.spriteAtlas = atlas;
	};
	
	Layer.prototype.drawSprite = function(idx, idy, x, y, scale) {
		scale = scale || 1;
		this.context.drawImage(this.spriteAtlas, idx*16, idy*16, 16, 16, x, y, 16*scale, 16*scale);
	};
	
	exports.loadLayer = function(src, cbDone) {
		var canvas = document.getElementById('game');
		if (canvas.getContext) {
			var context = canvas.getContext('2d');
			context.webkitImageSmoothingEnabled = false;
		}
		var atlas = new Image();
		atlas.onload = function() {
			cbDone(new Layer(context, atlas));
		};
		atlas.src = src;
	};
	
	return exports;
	
});