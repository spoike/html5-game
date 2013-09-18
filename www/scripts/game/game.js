define(['layer', 'random', 'preloader', 'objs/happy'], function(layerManager, r, preloader, objs) {
	
	// TODO: Implement game loop
	// http://www.html5rocks.com/en/tutorials/canvas/notearsgame/
	// TODO: Use requestAnimationFrame instead to iterate render
	// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	// TODO: Use translate to move objects around?
	// http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
	
	var update = function() {
		var i;
		
		for(i = 0; i < sprites.length; i++) {
			var sprite = sprites[i];
			if (!sprite.isDead) sprite.x = (sprite.x+1).clamp(0, 380);
		}
		
	};
	
	var render = function(ctx) {
		var i;

		/* Draw map */
		var x = 0, y = 0;
		for (x = 0; x < 25; x++) {
			for (y = 0; y < 25; y++) {
				l.drawSprite(0, 0, 16*x, 16*y);
			}
		}

		for (i = 0; i < sprites.length; i++) {
			sprites[i].render(ctx);
		}
	};
	
	var sprites = [];
	var l;
	
	preloader.loadImages(['/img/sheet.png'], function(imgs) {
		l = layerManager.createLayer(imgs[0]);
		
		var FPS = 30;
		var interval = 1000/FPS;
		var canvas = document.getElementById('game');
		var ctx;
		if (!canvas.getContext) {
			return; 
		}
		
		ctx = canvas.getContext('2d');

		window.setInterval(function() {
			update();
			render(ctx);
		}, interval);
		
		for (i = 0; i < 5; i++) {
			var s = new objs.Happy(imgs[0]);
			s.x = 16*r.getRandomInt(0, 24);
			s.y = 16*r.getRandomInt(0, 24);
			sprites.push(s);
		};
		
		var canvas = document.getElementById('game');
		canvas.addEventListener('click', function(evt) {
			var x = evt.offsetX - canvas.offsetLeft + 8;
			var y = evt.offsetY - canvas.offsetTop - 8;
			
			var i;
			for (i = 0; i < sprites.length; i++) {
				sprites[i].hit(x, y);
			}
		});
	});
		
});