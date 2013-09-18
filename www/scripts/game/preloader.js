define([], function() {

	var exports = {};
	
	exports.loadImages = function(imgSrcs, cbLoaded, cbStep) {
		var i, img, images = [], loaded = 0;
		for (i = 0; i < imgSrcs.length; i++) {
			img = new Image();
			images.push(img);
			img.onload = function() {
				loaded++;
				if (cbStep) {
					cbStep(loaded, imgSrcs.length);
				}
				if (loaded === imgSrcs.length) {
					cbLoaded(images);
				}
			};
			img.src = imgSrcs[i];
		};
	};
	
	return exports;
	
});