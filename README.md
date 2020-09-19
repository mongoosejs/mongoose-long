#mongoose-long
===============

Provides Number Long support for [Mongoose](http://mongoosejs.com).

[![Build Status](https://secure.travis-ci.org/aheckmann/mongoose-long.png)](http://travis-ci.org/mongoosejs/mongoose-long)

Example:

```js
const mongoose = require('mongoose')
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose;

const partSchema = new Schema({
  long: {
    type: Long,
  }
});

const Part = db.model('Part', partSchema);
const part = new Part({long: '9223372036854775806'});

part.long = part.long.divide(Long.fromString('2'));
part.save()
```

### install

```
npm install mongoose-long
```

See [node-mongodb-native](http://mongodb.github.com/node-mongodb-native/api-bson-generated/long.html) docs on all the `Long` methods available.

[LICENSE](https://github.com/aheckmann/mongoose-long/blob/master/LICENSE)
