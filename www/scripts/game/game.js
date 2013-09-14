define(['layer', 'random'], function(layers, r) {
	
	layers.loadLayer('/img/sheet.png', function(l) {
		var x = 0, y = 0, i = 0;
		for (x = 0; x < 25; x++) {
			for (y = 0; y < 25; y++) {
				l.drawSprite(0, 0, 16*x, 16*y);
			}
		}
		
		for (i = 0; i < 5; i++) {
			l.drawSprite(1, 0, 16*r.getRandomInt(0, 24), 16*r.getRandomInt(0,24));
		};
	});
	
});