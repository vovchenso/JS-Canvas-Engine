"use strict";

/**
 * Main shape object
 */
GG.ANIM.Shape = function() {
    GG.ANIM.Node.apply(this, arguments);

    // set object type constant
    GG.UTILS.constant(this, 'TYPE', 'Shape');
};
GG.ANIM.Shape.prototype = {
    _draw: function() {/* override */
    }
};
GG.UTILS.extend(GG.ANIM.Shape, GG.ANIM.Node);

// Shapes namespace
GG.ANIM.Shapes = {};