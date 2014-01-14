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