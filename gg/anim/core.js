/** 
 * Javascript Gangstar Gree animation engine
 * @author Vladimir Maluchenko <vladimir.maluchenko@gameloft.com>
 */

"use strict";

// @todo implement user FPS
window.requestAnimationFrame = (function() {
    return  window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || function(callback, /* DOMElement */ element) {
                window.setTimeout(function() {
                    callback(new Date().getTime())
                }, 40); // 1000 / 25
            };
})();

// Main Animation Module
GG.ANIM = (function() {

    var _stages = {};

    return {
        initStage: function(name, data) {
            if (typeof name === 'string') {
                _stages[name] = new GG.ANIM.Stage(name, data);
            } else {
                _stages[name] = name;
            }

            return _stages[name];
        },
        getStage: function(name) {
            if (!name in _stages) {
                throw new Error('There is no stage with name: ' + name);
            }
            return _stages[name];
        }
    };

})();