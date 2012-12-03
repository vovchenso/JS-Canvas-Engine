"use strict";

// Main Module
GG.DOM = (function() {
	
	var _cache = {};
    
	return {		
		get: function(selector, parent) {
			parent = parent || document;
			return parent.querySelector(selector);
		}
	}
    
})();