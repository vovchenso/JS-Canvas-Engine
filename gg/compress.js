"use strict";

// Compress Module
// @todo: support all types (for now it suorts only arrays)
GG.COMPRESS = (function() {

    var DELIMITER = 0x00,
        RADIX = 32;

    var _pack = function(item) {
        item = item.toString(RADIX);

        var result = '';
        var length = item.length;

        for (var i = 0; i < length; i += 2) {
            var word = item[i];
            if ((i + 1) < length) {
                word += item[i + 1];
            }
            result += String.fromCharCode(parseInt(word, RADIX));
        }

        return result;
    };

    var _unpack = function(str) {
        var result = '';
        var length = str.length;

        for (var i = 0; i < length; i++) {
            result += str[i].charCodeAt().toString(RADIX);
        }

        return parseInt(result, RADIX);
    };

    return {
        pack: function(data) {
            for (var item in data) {
                data[item] = _pack(data[item]);
            }
            return data.join(DELIMITER);
        },
        unpack: function(data) {
            data = data.split(DELIMITER);
            for (var item in data) {
                data[item] = _unpack(data[item]);
            }
            return data;
        }
    }

})();