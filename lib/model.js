export class Model {
  constructor(doc) {
    Object.assign(this, doc, { query: {} });
    return this;
  }

  /**
   * Sets a value by key
   * @param  {String} key   a string key that can use dot-notation
   * @param  {Object} value this can be any type of object
   * @return {Model}        the Model instance
   */
  set(key, value) {
    this.query.$set = this.query.$set || {};
    Object.assign(this.query.$set, { [key]: value });
    return this;
  }

  /**
   * Unsets a value by key
   * @param  {String} key   a string key that can use dot-notation
   * @return {Model}        the Model instance
   */
  unset(key) {
    this.query.$unset = this.query.$unset || {};
    Object.assign(this.query.$unset, { [key]: '' });
    return this;
  }

  /**
   * Either updates or creates a new document
   * @return {Promise}
   */
  save() {
    const clearResult = (result) => {
      // empty the query
      this.query = {};
      return result;
    };
    // if this object already exists, update it, otherwise create a new document
    if (this._id) {
      return this.getCollection().update({ _id: this._id }, this.query).then(clearResult);
    }
    return this.getCollection().create(this.query.$set).then(clearResult);
  }

  upsert() {

  }

  remove() {

  }
}
