"use strict";

/**
 * Transform object
 */
GG.ANIM.Transform = function() {
	this.matrix = [1, 0, 0, 1, 0, 0];
};
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