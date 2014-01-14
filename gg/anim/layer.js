"use strict";

/**
 * Layer object
 */
GG.ANIM.Layer = function() {
    this.width = null;
    this.height = null;
    this.animating = true;

    // call super constructor
    GG.ANIM.Container.call(this);
    GG.ANIM.Node.apply(this, arguments);

    // set object type constant
    GG.UTILS.constant(this, 'TYPE', 'Layer');
};
GG.ANIM.Layer.prototype = {
    stop: function() {
        this.animating = false;
        return this;
    },
    clear: function() {
        this.getStage().getRenderer().clearLayer(this);
        return this;
    },
    draw: function() {
        this.getStage().getRenderer().draw(this);
        return this;
    },
    add: function(child, refreshLayer) {
        if (child.TYPE !== 'Group' && child.TYPE !== 'Shape') {
            throw new Error('You can add to Layer only Groups or Shapes');
        }
        this._add(child);

        refreshLayer && this.draw();
    }
};
GG.UTILS.extend(GG.ANIM.Layer, GG.ANIM.Container);
GG.UTILS.extend(GG.ANIM.Layer, GG.ANIM.Node);