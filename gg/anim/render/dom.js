"use strict";


GG.ANIM.Render.Dom = function() {
    GG.ANIM.Render.apply(this, arguments);
};
GG.ANIM.Render.Dom.prototype = {
    constructor: GG.ANIM.Render.Dom,
    registerLayer: function(layer) {
        var div = this._createDiv(layer);

        this.area.appendChild(div);
        this.draw(layer);
    },
    draw: function(layer) {

    },
    drawShape: function(shape, layer) {

    },
    _createDiv: function(node) {
        var div = document.createElement('div');

        div.style.position = 'absolute';
        div.style.top = (node.y || 0) + 'px';
        div.style.left = (node.x || 0) + 'px';
        div.style.width = (node.width || this.width) + 'px';
        div.style.height = (node.height || this.height) + 'px';

        div.setAttribute('id', layer.name);

        return div;
    },
};
GG.UTILS.extend(GG.ANIM.Render.Dom, GG.ANIM.Render);