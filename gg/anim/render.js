"use strict";


GG.ANIM.Render = function(container, width, height) {
	this.area = document.createElement('div');
	this.width = width || 0;
	this.height = height || 0;
	
	this.setContainer(container);
};
GG.ANIM.Render.prototype = {
	setContainer: function(container) {
		if (typeof container === 'string') {
			container = document.getElementById(container);
		}
		
		this.width = this.width || container.offsetWidth;
		this.height = this.height || container.offsetHeight;
		
		this.area.innerHTML = '';
		this.area.style.position = 'relative';
		this.area.style.display = 'inline-block';
		this.area.style.width = this.width + 'px';
		this.area.style.height = this.height + 'px';
		
		container.appendChild(this.area);
	},
	registerLayer: function(layer) {
		// @abstract
	},
	removeLayer: function(layer) {
		var child = this.area.querySelector('#' + layer.name);
		child.parentNode.removeChild(child);
	},
	clearStage: function(stage) {
		var layers = stage.getChildren();
		for (var layer in layers) {
			this.clearLayer(layers[layer]);
		}
	},
	clearLayer: function(layer) {
		// @abstract
	},
	draw: function(layer) {
		// @abstract
	},
	drawShape: function(shape, layer) {
		// @abstract
	}
};