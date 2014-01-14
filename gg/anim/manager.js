/**
 * Manager and loader for timeline animation for Gangstar Gree
 * @author Vladimir Maluchenko <vladimir.maluchenko@gameloft.com>
 */

// Timeline Manager
GG.ANIM.Manager = function(_id) {
    var _stage = new GG.ANIM.Stage(_id);
    var _this = this;

    var _timeline = [],
        _layers = {},
        _callback = {};

    var _processFrame = function(frame, time) {
        if (frame.duration > 0 && time > (frame.start + frame.duration)) {
            frame.finished = true;
            frame.onfinish &&
                _callback[frame.onfinish].call(_stage);
        }

        if (time >= frame.start) {
            if (!frame.started) {
                frame.started = true;
                frame.onstart &&
                    _callback[frame.onstart].call(_stage);
            }
            frame.onframe &&
                _callback[frame.onframe].call(_stage, time);
        }
    };

    var _process = function(time) {
        for (var frame in _timeline) {
            !_timeline[frame].finished &&
                _processFrame(_timeline[frame], time);
        }
    };

    var _checkProperties = function(object) {
        if (object.rotation) {
            object.rotation = GG.UTILS.radian(object.rotation);
        }
        if (object.scale) {
            object.scale = {
                x: object.scale,
                y: object.scale
            };
        }
    };

    var _initChildren = function(layer, data) {
        for (var image in data) {
            _checkProperties(data[image]);
            var imageObject = new GG.ANIM.Shapes.Image(image, data[image]);
            layer.add(imageObject);
        }
    };

    this.init = function(data, callback) {
        _layers = data.layers;
        _timeline = data.timeline;
        _callback = data.callback;

        (new GG.ANIM.Loader()).setQuene(_layers).process(function() {

            for (var object in _layers) {
                var _layer = _layers[object];
                _layer.visible = false;
                _checkProperties(_layer);

                var layer = new GG.ANIM.Layer(object, _layer);
                _stage.add(layer);
                _initChildren(layer, _layer.images);
            }
            _stage.draw();

            var instance = _this.instance();
            callback.call(instance);

        });

    };

    this.instance = function() {
        return {
            getStage: function() {
                return _stage;
            },
            run: function() {
                _callback['stageStart'] &&
                        _callback['stageStart'].call(_stage);

                _stage.onFrame(function(time) {
                    _process(time);
                }).start();
            },
            stop: function() {
                _stage.stop();
            },
            reset: function() {
                // @todo
            }
        };
    };
};