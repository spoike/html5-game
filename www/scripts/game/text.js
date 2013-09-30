define([], function() {

	exports = {};

	var img;

	exports.init = function(atlas) {
		img = atlas;
	};

	exports.write = function(ctx, str, x, y, scale) {
		var i, c, cx, cy;
		scale = scale || 1;
		for (i = 0; i < str.length; i++) {
			c = str.charCodeAt(i);
			cx = c%16;
			cy = Math.floor(c/16);
			ctx.drawImage(img,
				cx*16, (16+cy)*16,
				16,16,
				x+(i*(16*scale)),y,
				16*scale,16*scale);
		};
	};

	exports.writeCenter = function(ctx, str, y) {
		var w = ctx.canvas.width;
		beginx = (w/2)-((str.length-1)*8);
		exports.write(ctx, str, beginx, y);
	};

	return exports;

})