// mongoose-long

module.exports = exports = function NumberLong (mongoose) {
  var Schema = mongoose.Schema
    , SchemaType = mongoose.SchemaType
    , Types = mongoose.Types
    , mongo = mongoose.mongo;

  /**
   * Long constructor
   *
   * @inherits SchemaType
   * @param {String} key
   * @param {Object} [options]
   */

  function Long (key, options) {
    SchemaType.call(this, key, options);
  }

  /*!
   * inherits
   */

  Long.prototype = Object.create(SchemaType.prototype);
  Long.prototype.constructor = Long;
  Long.cast = SchemaType.cast;
  Long.set = SchemaType.set;
  Long.get = SchemaType.get;

  /**
   * Implement checkRequired method.
   *
   * @param {any} val
   * @return {Boolean}
   */

  Long.prototype.checkRequired = function (val) {
    return null != val;
  };


  Long.set = SchemaType.set;

  /**
   * Implement casting.
   *
   * @param {any} val
   * @param {Object} [scope]
   * @param {Boolean} [init]
   * @return {mongo.Long|null}
   */

  Long.prototype.cast = function (val, scope, init) {
    if (null === val) return val;
    if ('' === val) return null;

    if (val instanceof mongo.Long)
      return val;

    if (val instanceof Number || 'number' == typeof val)
      return mongo.Long.fromNumber(val);

    if (!Array.isArray(val) && val.toString)
      return mongo.Long.fromString(val.toString());

    throw new SchemaType.CastError('Long', val)
  }

  /*!
   * ignore
   */

  function handleSingle (val) {
    return this.cast(val)
  }

  function handleArray (val) {
    var self = this;
    return val.map( function (m) {
      return self.cast(m)
    });
  }

  Long.prototype.$conditionalHandlers.$lt = handleSingle;
  Long.prototype.$conditionalHandlers.$lte = handleSingle;
  Long.prototype.$conditionalHandlers.$gt = handleSingle;
  Long.prototype.$conditionalHandlers.$gte = handleSingle;
  Long.prototype.$conditionalHandlers.$ne = handleSingle;
  Long.prototype.$conditionalHandlers.$in = handleArray;
  Long.prototype.$conditionalHandlers.$nin = handleArray;
  Long.prototype.$conditionalHandlers.$mod = handleArray;
  Long.prototype.$conditionalHandlers.$all = handleArray;
  Long.prototype.$conditionalHandlers.$bitsAnySet = handleArray;
  Long.prototype.$conditionalHandlers.$bitsAllSet = handleArray;

  /**
   * Implement query casting, for mongoose 3.0
   *
   * @param {String} $conditional
   * @param {*} [value]
   */

  Long.prototype.castForQuery = function ($conditional, value) {
    var handler;
    if (2 === arguments.length) {
      handler = this.$conditionalHandlers[$conditional];
      if (!handler) {
          throw new Error("Can't use " + $conditional + " with Long.");
      }
      return handler.call(this, value);
    } else {
      return this.cast($conditional);
    }
  }

  /**
   * Expose
   */

  Schema.Types.Long = Long;
  Types.Long = mongo.Long;
  return Long;
}

