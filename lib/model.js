export class Model {
  constructor (doc, collection = false) {

    // because of the contruction of the models we need to check if we arguments
    // using the Default Model class or a custom class we can tell because
    // a custom one will return the query builder
    if(typeof collection === 'function') {
      collection = collection().collection;
    }

    Object.assign(this, doc, { collection, query : {} });
    return this;
  }

  /**
   * Sets a value by key
   * @param  {String} key   a string key that can use dot-notation
   * @param  {Object} value this can be any type of object
   * @return {Model}        the Model instance
   */
  set (key, value) {
    this.query.$set = this.query.$set || {};
    Object.assign(this.query.$set, { [key] : value });
    return this;
  }

  /**
   * Unsets a value by key
   * @param  {String} key   a string key that can use dot-notation
   * @return {Model}        the Model instance
   */
  unset (key) {
    this.query.$unset = this.query.$unset || {};
    Object.assign(this.query.$unset, { [key] : "" });
    return this;
  }

  /**
   * Either updates or creates a new document
   * @return {Promise}
   */
  save () {
    if(this._id) {
      return this.collection.update({ _id : this._id }, this.query);
    } else {
      return this.collection.create(this.query.$set);
    }
  }


  upsert () {

  }

  remove () {

  }
}
