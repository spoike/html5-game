define(['random', 'preloader', 'objs/happy', 'objs/background', 'objs/cursor', 'ui', 'text'], function(r, preloader, objs, backgrounds, cursors, ui, text) {
	
	// requestAnimationFrame polyfill
	(function() {
	  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	  window.requestAnimationFrame = requestAnimationFrame;
	})();

	// TODO: Implement game loop
	// http://www.html5rocks.com/en/tutorials/canvas/notearsgame/
	// TODO: Use translate to move objects around?
	// http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
	
	var happyFaceAmount = 25;

	var update = function() {
		var i, sprite, allDead = true;
		
		for(i = 0; i < sprites.length; i++) {
			sprite = sprites[i];
			sprite.update();
			allDead &= sprite.isDead;
		}

		gameUi.update();

		if (allDead) {
			gameUi.isGameOver = true;
		}

	};
	
	var render = function(ctx) {
		var i, sprite;

		/* Draw map */
		bg.render(ctx);

		for (i = 0; i < sprites.length; i++) {
			sprite = sprites[i];
			if (sprite.isDead) sprite.render(ctx);
		}
		for (i = 0; i < sprites.length; i++) {
			sprite = sprites[i];
			if (!sprite.isDead) sprite.render(ctx);
		}

		cursor.render(ctx);

		gameUi.render(ctx);
	};

	var gameLoop = function(time) {
		update();
		render(ctx);
		window.requestAnimationFrame(gameLoop);
	};
	
	var sprites = [];
	var bg;
	var cursor;
	var gameUi;
	var ctx;

	preloader.loadImages(['/img/sheet.png'], function(imgs) {
		var FPS = 30;
		var interval = 1000/FPS;
		var canvas = document.getElementById('game');
		if (!canvas.getContext) {
			return; 
		}
		
		ctx = canvas.getContext('2d');

		window.requestAnimationFrame(gameLoop);
		
		// Create background
		bg = backgrounds.create(imgs[0]);
		// Create sprites
		for (i = 0; i < happyFaceAmount; i++) {
			var s = new objs.Happy(imgs[0]);
			sprites.push(s);
		};
		// Create cursor
		cursor = cursors.create(imgs[0]);
		// Create UI
		text.init(imgs[0]);
		gameUi = ui.create(imgs[0]);
		
		// Set up user events
		var canvas = document.getElementById('game');
		canvas.addEventListener('click', function(evt) {
			var x = evt.offsetX;
			var y = evt.offsetY;
			var sprite;
			var score = 0;
			
			var i;
			for (i = 0; i < sprites.length; i++) {
				sprite = sprites[i];
				if (!sprite.isDead) {
					sprite.hit(x, y);
					if (sprite.isDead) {
						score++;
					}
				}
			}
			score *= score;
			ui.incrScore(score*50);

			if (gameUi.isGameOver) {
				for(i = 0; i < sprites.length; i++) {
					sprite = sprites[i];
					sprite.isDead = false;
				}
				gameUi.isGameOver = false;
				ui.setScore(0);
			}
		});

		canvas.addEventListener('mouseout', function(evt) {
			cursor.isVisible = false;
		});

		canvas.addEventListener('mouseover', function(evt) {
			cursor.isVisible = true;
		});

		document.addEventListener('mousemove', function(evt) {
			var x = evt.offsetX;
			var y = evt.offsetY;

			cursor.x = x;
			cursor.y = y;
		});
	});
		
});