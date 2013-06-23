var fs = require('fs');
var path = require('path');


function merge(target, source) {
  for (var x in source) {
    if (!target.hasOwnProperty(x)) target[x] = source[x];
  }
}


function walk(dir, options, iterator, callback) {
  if (options.stop) return;
  
  fs.readdir(dir, function(err, contents) {
    if (err) callback(err);
    if (options.stop) return;
    
    var numItems = contents.length;
    
    contents.forEach(function(name) {

      var item = path.join(dir, name);
      
      fs.stat(item, function(err, stats) {
        if (err) callback(err);
        if (options.stop) return;
        
        var ret = iterator(item, stats);
        if (typeof ret === 'boolean' && ret === false) {
          options.stop = true;
          return callback();
        }

        if (stats.isDirectory() && options.recursive) {
          return walk(item, options, iterator, function(err) {
            if (err) return callback(err);
            if (options.stop) return;
            
            if (--numItems === 0) {
              callback();
            }
          });
        }
        if (--numItems === 0) {
          callback();
        }
      });
    });
  });
}


module.exports = function(dir, options, iterator, callback) {

  if (arguments.length === 3) {
    callback = iterator;
    iterator = options;
    options = {};
  }
  
  merge(options, {
    recursive: true,
    stop: false
  });

  walk(dir, options, iterator, callback);
};
