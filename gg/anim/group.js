"use strict";

GG.ANIM.Group = function() {
    // call super constructors
    GG.ANIM.Container.call(this);
    GG.ANIM.Node.apply(this, arguments);

    // set object type constant
    GG.UTILS.constant(this, 'TYPE', 'Group');
};
GG.UTILS.extend(GG.ANIM.Group, GG.ANIM.Container);
GG.UTILS.extend(GG.ANIM.Group, GG.ANIM.Node);