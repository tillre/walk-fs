Walk a directory
----------------

### API

`walk(dir, [options], iterator, callback);`

__Parameters__:

* `dir`: absolute directory
* `options`: optional, properties: `{ recursive: [default is true] }`
* `iterator`: function(path, stats, next), where stats is an instance of fs.Stats
* `callback`: function(err)

Return false from the iterator to stop walking.


### Example

```javascript
var walk = require('walk-fs');

walk(__dirname, function(path, stats, next) {
  console.log(path, stats);
  next();
}, function(err) {
  assert(!err);
});

```

### Install

`npm install walk-fs`
