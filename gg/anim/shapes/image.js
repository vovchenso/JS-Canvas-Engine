"use strict";

GG.ANIM.Shapes.Image = function() {
    this.image = null;
    this.width = 0;
    this.height = 0;

    // call super constructor
    GG.ANIM.Shape.apply(this, arguments);
};
GG.ANIM.Shapes.Image.prototype = {
    setImage: function(image) {
        this.image = image;
    },
    setSize: function(width, height) {
        this.width = width;
        this.height = height;
    },
    _draw: function(context) {
        context.drawImage(this.image, 0, 0, this.width, this.height);
    }
};
GG.UTILS.extend(GG.ANIM.Shapes.Image, GG.ANIM.Shape);