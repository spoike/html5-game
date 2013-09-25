define(['sprite'], function(s) {

	var exports = {};

	var UI = function(atlas) {
		this.atlas = atlas;
	};

	var toIndexArr = function(str) {
		var i, c, a = [];

		for (i = 0; i < str.length; i++) {
			c = str.charCodeAt(i);
			a.push([c%32,Math.floor(c/32)]);
		};

		return a;
	};

	UI.prototype.render = function(ctx) {

		var i, charIdx, textIdxs = toIndexArr('SCORE: ' + 1);
		for (i = 0; i < textIdxs.length; i++) {
			charIdx = textIdxs[i];
			ctx.drawImage(this.atlas,
				charIdx[0]*16, (9+charIdx[1])*16,
				16,16,
				10+(i*16),10,
				16,16);
		};
		
	};

	exports.create = function(atlas) {
		return new UI(atlas);
	};
 
	return exports;

});