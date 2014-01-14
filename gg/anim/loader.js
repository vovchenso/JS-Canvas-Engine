

GG.ANIM.Loader = function() {
    
    var _length = 0,
        _loaded = 0,
        _onComplete = null,
        _quene = null;

    var _get = function(data, callback) {
        for (var item in data) {
            callback(data[item]);
            if (typeof data[item].images !== 'undefined') {
                _get(data[item].images, callback);
            }
        }
    };

    var _load = function() {
        for (var item in _quene) {
            _get(_quene[item].images, function(object) {
                object.image = new Image();
                object.image.src = object.path;
                object.image.onload = function() {
                    if (++_loaded == _length) {
                        (_onComplete)();
                    }
                }
            });
        }
    };

    var _init = function() {
        for (var item in _quene) {
            _get(_quene[item].images, function() {
                _length++;
            });
        }
    };

    this.setQuene = function(quene) {
        _quene = quene;
        _init();
        return this;
    };

    this.process = function(completeCallback) {
        _onComplete = completeCallback;
        _load();
    };
    
};