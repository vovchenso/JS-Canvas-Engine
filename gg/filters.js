"use strict";

// Image filters
// @todo todo todo
GG.ANIM.Filters = (function() {
	
	var tempCanvas = document.createElement('canvas');
	var tempContext = tempCanvas.getContext('2d');
	
	var colorOffset = {
		red: 0,
		green: 1,
		blue: 2,
		alpha: 3
	};
	
	return {
		
		brightness: function(context, width, height) {
		
		},
		
		contrast: function(context, width, height) {
		
		},
		
		luma: function() {
			var imageData = context.getImageData(0, 0, width, height)
			var data = imageData.data;
			var length = data.length;
			
			for (var i = 0; i < length; i += 4) {
				var brightness = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
				data[i] = brightness; 
				data[i + 1] = brightness; 
				data[i + 2] = brightness; 
			}			
			
			context.putImageData(imageData, 0 , 0);
		},
		
		alpha: function(context, width, height, alpha) {
			var imageData = context.getImageData(0, 0, width, height)
			var data = imageData.data;
			var length = data.length;
			
			for (var i = 0; i < length; i += 4) {
				data[i + colorOffset.alpha] = alpha; 
			}			
			
			context.putImageData(imageData, 0 , 0);
		},
		
		chanels: function(context, width, height, red, green, blue) {
			
			if (typeof red !== 'undefined') {
				if (red > 255) red = 255;
				if (red < -255) red = -255;
			} else {
				red = false;
			}
			
			if (typeof green !== 'undefined') {
				if (green > 255) green = 255;
				if (green < -255) green = -255;
			} else {
				green = false;
			}
			
			if (typeof blue !== 'undefined') {
				if (blue > 255) blue = 255;
				if (blue < -255) blue = -255;
			} else {
				blue = false;
			}
			
			var imageData = context.getImageData(0, 0, width, height)
			var data = imageData.data;
			var length = data.length;
			
			for (var i = 0; i < length; i += 4) {
				if (false !== red) {
					red == 0 ? data[i] = 0 : data[i] += red;
				}
				if (false !== green) {
					green == 0 ? data[i + 1] = 0 : data[i + 1] += green;
				}
				if (false !== blue) {
					blue == 0 ? data[i + 2] = 0 : data[i + 2] += blue;
				}
			}			
			
			context.putImageData(imageData, 0 , 0);
		},
		
		grayscale: function(context, width, height) {
			var imageData = context.getImageData(0, 0, width, height)
			var data = imageData.data;
			var length = data.length;
			
			for (var i = 0; i < length; i += 4) {
				var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
				data[i] = brightness; 
				data[i + 1] = brightness; 
				data[i + 2] = brightness; 
			}			
			
			context.putImageData(imageData, 0 , 0);
		},
		
		pixelation: function(context, width, height, pixelation) {
			var imageData = context.getImageData(0, 0, width, height)
			var data = imageData.data;
			
			for (var y = 0; y < height; y += pixelation) {
				for (var x = 0; x < width; x += pixelation) {
					var red		= data[((sourceWidth * y) + x) * 4];
					var green	= data[((sourceWidth * y) + x) * 4 + 1];
					var blue	= data[((sourceWidth * y) + x) * 4 + 2];

					for (var n = 0; n < pixelation; n++) {
						for (var m = 0; m < pixelation; m++) {
							if (x + m < sourceWidth) {
								data[((sourceWidth * (y + n)) + (x + m)) * 4] = red;
								data[((sourceWidth * (y + n)) + (x + m)) * 4 + 1] = green;
								data[((sourceWidth * (y + n)) + (x + m)) * 4 + 2] = blue;
							}
						}
					}
				}
			}
			
			context.putImageData(imageData, 0 , 0); 
		},
		
		invert: function(context, width, height) {
			var imageData = context.getImageData(0, 0, width, height)
			var data = imageData.data;
			var length = data.length;
			
			for (var i = 0; i < length; i += 4) {
				data[i] = 255 - data[i]; 
		        data[i + 1] = 255 - data[i + 1]; 
		        data[i + 2] = 255 - data[i + 2]; 
			}
			
			context.putImageData(imageData, 0 , 0);
		}

	}
	
})();

// Image filters
// @todo
GG.ANIM.Tools = (function() {
	
	
	return {
		texture: function(context, image, width, height) {
			var pattern = context.createPattern(image, 'repeat');
 
			context.rect(0, 0, width, height);
			context.fillStyle = pattern;
			context.fill();
		},
		
		crop: function() {
			
		},
		
		flip: function(context, type) {
			switch (type) {
				case 'horizontal':
					context.scale(-1, 1);
					break;
				case 'vertical':
					context.scale(1, -1);
					break;
				default:
					break;
			}
		}
	}
	
})();