/**
*
*  Javascript string pad
*  http://www.webtoolkit.info/
*
**/

var STR_PAD_LEFT = 'LEFT';
var STR_PAD_RIGHT = 'RIGHT';
var STR_PAD_BOTH = 'BOTH';

module.exports = function(str, len, pad, dir) {

    if (typeof(len) === "undefined") { len = 0; }
    if (typeof(pad) === "undefined") { pad = ' '; }
    if (typeof(dir) === "undefined") { dir = STR_PAD_RIGHT; }

    if (len + 1 >= str.length) {

        switch (dir){

            case STR_PAD_LEFT:
                str = new Array(len + 1 - str.length).join(pad) + str;
            break;

            case STR_PAD_BOTH:
                var padlen;
                var right = Math.ceil((padlen = len - str.length) / 2);
                var left = padlen - right;
                str = new Array(left+1).join(pad) + str + new Array(right+1).join(pad);
            break;

            default:
                str = str + new Array(len + 1 - str.length).join(pad);
            break;

        } // switch

    }

    return str;

};