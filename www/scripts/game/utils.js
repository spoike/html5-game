define([], function() {
	
	var min = Math.min, 
	    max = Math.max;
	
	Number.prototype.clamp = function(a, b) {
		return min(max(this, a), b);
	};
	
});