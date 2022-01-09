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

See [node-mongodb-native](https://mongodb.github.io/node-mongodb-native/4.2/classes/Long.html) docs on all the `Long` methods available.

[LICENSE](https://github.com/aheckmann/mongoose-long/blob/master/LICENSE)

### TypeScript Usage

Make sure you enable both `compilerOptions.allowSyntheticDefaultImports` and `compilerOptions.esModuleInterop` in your `tsconfig.json`.

```typescript
import mongoose from 'mongoose';
import mongooseLong from 'mongoose-long';

mongooseLong(mongoose);

const Long = mongoose.Schema.Types.Long;
```