"use strict";


GG.ANIM.Shapes.Sprite = function() {
	this.sx = 0;
	this.sy = 0;
	this.sWidth = 0;
	this.sHeight = 0;
	// call super constructor
	GG.ANIM.Shapes.Image.apply(this, arguments);
};
GG.ANIM.Shapes.Sprite.prototype = {
	_draw: function(context) {
		context.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight);
	}
};
GG.UTILS.extend(GG.ANIM.Shapes.Sprite, GG.ANIM.Shapes.Image);

/**
 * Transform object
 */
GG.ANIM.Transform = function() {
	this.matrix = [1, 0, 0, 1, 0, 0];
}
GG.ANIM.Transform.prototype = {
	translate: function(x, y) {
		this.matrix[4] += this.matrix[0] * x + this.matrix[2] * y;
		this.matrix[5] += this.matrix[1] * x + this.matrix[3] * y;
	},
	scale: function(sx, sy) {
		sy = sy || sx;
		
		this.matrix[0] *= sx;
		this.matrix[1] *= sx;
		this.matrix[2] *= sy;
		this.matrix[3] *= sy;
	},
	rotate: function(radian) {
		var cos = Math.cos(radian);
		var sin = Math.sin(radian);
        
		var m11 = this.matrix[0] * cos + this.matrix[2] * sin;
		var m12 = this.matrix[1] * cos + this.matrix[3] * sin;
		var m21 = this.matrix[0] * -sin + this.matrix[2] * cos;
		var m22 = this.matrix[1] * -sin + this.matrix[3] * cos;
        
		this.matrix[0] = m11;
		this.matrix[1] = m12;
		this.matrix[2] = m21;
		this.matrix[3] = m22;
	},
	getMatrix: function() {
		return this.matrix;
	}
};


GG.ANIM.Renderer = function(container, width, height) {
	this.area = document.createElement('div');
	this.width = width || 0;
	this.height = height || 0;
	this.contexts = {};
	this.buffers = {};
	
	this.setContainer(container);
};
GG.ANIM.Renderer.prototype = {
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
		// set buffer canvas
		var bufferCanvas = document.createElement('canvas'),
			bufferContext = bufferCanvas.getContext('2d');
		
		bufferCanvas.width = this.width;
		bufferCanvas.height = this.height;
		
		this.buffers[layer.name] = {
			canvas: bufferCanvas,
			context: bufferContext
		};
		
		// set layer canvas
		var canvas = document.createElement('canvas'),
			context = canvas.getContext('2d');
			
		canvas.setAttribute('width', this.width);
		canvas.setAttribute('height', this.height);
		canvas.setAttribute('id', layer.name);
		canvas.style.position = 'absolute';
		this.area.appendChild(canvas);
		
		this.contexts[layer.name] = context;
		this.draw(layer);
	},
	removeLayer: function(layer) {
		// @todo
	},
	getContext: function(layer) {
		return this.buffers[layer.name].context;
	},
	clearStage: function(stage) {
		var layers = stage.getChildren();
		for (var layer in layers) {
			this.clearLayer(layers[layer]);
		}
	},
	clearLayer: function(layer) {
		this.buffers[layer.name].context.clearRect(0, 0, this.width, this.height);
		this.contexts[layer.name].clearRect(0, 0, this.width, this.height);
	},
	draw: function(layer) {
		if (!layer.visible) {
			if (layer.TYPE == 'Layer') {
				this.clearLayer(layer);
			}
			return;
		}
		
		if (layer.TYPE == 'Layer') {
			if (!layer.animating) {
				return;
			}
			this.clearLayer(layer);
		}
		
		var children = layer.getChildren();
		for (var child in children) {
			child = children[child];
			if (child.TYPE == 'Shape') {
				this.drawShape(child, layer);
			} else {
				this.draw(child);
			}
		}
		
		if (layer.TYPE == 'Layer') {
			var buffer = this.buffers[layer.name].canvas;
			this.contexts[layer.name].drawImage(buffer, 0, 0, this.width, this.height);
		}
	},
	drawShape: function(shape, layer) {
		if (!shape.visible) {
			return;
		}
        
		var context = this.buffers[layer.name].context;
		var parent = shape.getParent();
		var tree = [shape];
		
		while(parent) {
			tree.unshift(parent);
			parent = parent.getParent();
		}		
		
		context.save();
		
		for (var child in tree) {
			child = tree[child];
			//console.log(child.TYPE, child.name, child.getTransform().getMatrix());
			context.transform.apply(context, child.getTransform().getMatrix());
			if (child.opacity !== 1) {
				context.globalAlpha = child.getAbsOpacity();
			}
		}
		shape._draw(context);
		context.restore();
	}
};