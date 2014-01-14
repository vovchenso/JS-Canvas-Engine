"use strict";

GG.ANIM.Render.Canvas = function() {
    this.buffers = {};

    GG.ANIM.Render.apply(this, arguments);
};
GG.ANIM.Render.Canvas.prototype = {
    constructor: GG.ANIM.Render.Canvas,
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
    getContext: function(layer) {
        return this.buffers[layer.name].context;
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

        while (parent) {
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
GG.UTILS.extend(GG.ANIM.Render.Canvas, GG.ANIM.Render);