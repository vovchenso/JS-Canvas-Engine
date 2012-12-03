"use strict";


/**
 * Main node object 
 */
GG.ANIM.Node = function(name, data) {
	this.name = name;
	this.parent = null;
    
	this.visible = true;
	this.opacity = 1;
	this.x = 0;
	this.y = 0;
	this.rotation = 0;
	this.zIndex = 1;
	this.scale = {
		x: 1,
		y: 1
	};
	this.center = {
		x: 0,
		y: 0
	};
    
	GG.UTILS.reset(this, data);
};
GG.ANIM.Node.prototype = {
	show: function() {
		this.visible = true;
		return this;
	},
	hide: function() {
		this.visible = false;
		return this;
	},
	setCenter: function(x, y) {
		this.center.x = +x;
		this.center.y = +y;
		return this;
	},
	setScale: function(scaleX, scaleY) {
		scaleY = scaleY || scaleX;
		this.scale.x = 1 + scaleX / 100;
		this.scale.y = 1 + scaleY / 100;
		return this;
	},
	grow: function(dx, dy) {
		dy = dy || dx;
		this.scale.x += dx / 100;
		this.scale.y += dy / 100;
		return this;
	},
	move: function(x, y) {
		this.x += x;
		this.y += y;
		return this;
	},
	moveTo: function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	},
	setRotation: function(deg) {
		this.rotation = deg;
		return this;
	},
	rotate: function(deg) {
		this.rotation += GG.UTILS.radian(deg);
		return this;
	},
	setOpacity: function(opacity) {
		this.opacity = opacity;
		return this;
	},
	getPosition: function() {
		return {
			x: this.x,
			y: this.y
		};
	},
	getOpacity: function() {
		return this.opacity;
	},
	getAbsOpacity: function() {
		var opacity = 1;
		var node = this;
		while (!(node instanceof GG.ANIM.Stage)) {
			opacity *= node.getOpacity();
			node = node.getParent();
		}
		return opacity;
	},
	getTransform: function() {
		var matrix = new GG.ANIM.Transform();

		if (this.x != 0 || this.y != 0) {
			matrix.translate(this.x, this.y);
		}
		if (this.rotation != 0) {
			matrix.rotate(this.rotation);
		}
		if (this.scale.x != 1 || this.scale.y != 1) {
			matrix.scale(this.scale.x, this.scale.y);
		}
        if (this.center.x != 0 || this.center.y != 0) {
            matrix.translate(-this.center.x, -this.center.y);
        }

		return matrix;
	},
	reset: function(data) {
		GG.UTILS.reset(this, data);
		return this;
	},
	getName: function() {
		return this.name;
	},
	getParent: function() {
		return this.parent;
	},
	getLayer: function() {
		console.log(this);
		console.log(this instanceof GG.ANIM.Layer);
		return (this instanceof GG.ANIM.Layer)
			? this
			: this.getParent().getLayer();
	},
	getStage: function() {
		return (this instanceof GG.ANIM.Stage)
			? this
			: this.getParent().getStage();
	}
};