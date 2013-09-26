//     ___              _ _ 
//    /   |  __________(_|_)
//   / /| | / ___/ ___/ / / 
//  / ___ |(__  ) /__/ / /  
// /_/  |_/____/\___/_/_/
//
// @author: [turing](http://guoyu.me);
// @desc: convert jpg/png/gif to ascii arts based on node-canvas.
                         
var fs = require('fs'),
    Canvas = require('canvas'),
    ascii = require('./ascii');

var Ascii = function(src, params) {
    this.src = src;
}

Ascii.prototype.load = function(callback) {
    if (this.src) {
        fs.readFile(this.src, function(err, img){
            callback(err, img);
        });
    } else {
        callback(new Error('src picture required.'))
    }
}

Ascii.prototype.pic = function(callback, type) {
    var type = type ? type : 'cli';
    this.load(function(err, img){
        if (!err) {
            var pic = new Canvas.Image;
            pic.src = img;
            var cv = new Canvas(pic.width, pic.height),
                ctx = cv.getContext('2d');
            ctx.drawImage(pic, 0, 0, pic.width, pic.height);
            callback(null, ascii.init(type, ctx, pic));
        } else {
            callback(err);
        }
    });
}

module.exports = Ascii;