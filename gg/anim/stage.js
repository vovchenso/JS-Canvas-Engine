"use strict";


GG.ANIM.Stage = function() {
    this.animating = false;
    this.frameCallback = void 0;

    // register Stage in global Anim objrct
    GG.ANIM.initStage(this);

    // call super constructor
    GG.ANIM.Container.call(this);
    GG.ANIM.Node.apply(this, arguments);

    // init rendere
    this.renderer = new GG.ANIM.Renderer(this.container || this.name);

    // set object type constant
    GG.UTILS.constant(this, 'TYPE', 'Stage');
};
GG.ANIM.Stage.prototype = {
    getStage: function() {
        return this;
    },
    onFrame: function(callback) {
        this.frameCallback = callback;
        return this;
    },
    start: function() {
        this.animating = true;

        var self = this;
        var start = new Date().getTime();

        (function loop(time) {
            time = (time || start) - start;
            self.frameCallback(time);
            self.draw();
            self.animating && requestAnimationFrame(loop);
        })();
    },
    stop: function() {
        this.animating = false;
    },
    getRenderer: function() {
        return this.renderer;
    },
    clear: function() {
        this.getRenderer().clearStage(this);
    },
    draw: function() {
        this.getRenderer().draw(this);
    },
    add: function(child) {
        this._add(child);
        this.getRenderer().registerLayer(child);
        return this;
    }
};
GG.UTILS.extend(GG.ANIM.Stage, GG.ANIM.Container);
GG.UTILS.extend(GG.ANIM.Stage, GG.ANIM.Node);