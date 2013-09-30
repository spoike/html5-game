define(['sprite'], function(s) {
	
	var exports = {};

	var gridUnit = 16;

	var GoreField = function(w, h) {
		this.buffer = document.createElement('canvas');
		this.buffer.width = w || 100;
		this.buffer.height = h || 100;
		var bufferCtx = this.bufferCtx = this.buffer.getContext('2d');
	};

	GoreField.prototype.reset = function() {
		this.bufferCtx.save();
		this.bufferCtx.setTransform(1, 0, 0, 1, 0, 0);
		this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height);
		this.bufferCtx.restore();
	};

	GoreField.prototype.render = function(ctx) {
		ctx.drawImage(this.buffer, 0, 0);
	};

	var instance;

	exports.init = function(w, h) {
		instance = new GoreField(w, h);
	};

	exports.render = function(ctx) {
		instance.render(ctx);
	};

	exports.draw = function(callback) {
		callback(instance.bufferCtx);
	};

	exports.reset = function() {
		instance.reset();
	};

	return exports;

});