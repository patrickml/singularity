import deepMerge from './deep-merge';

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
   * Pushes a value into an array on the document
   * @param  {String} key   the key of the arrow
   * @param  {Any} value    the value to push
   * @return {Model}        the Model instance
   */
  push(key, value) {
    this.query.$push = this.query.$push || {};
    Object.assign(this.query.$push, { [key]: value });
    return this;
  }

  /**
   * Pulls a value from an array on the document
   * @param  {String} key   the key of the arrow
   * @param  {Any} value    the value to push
   * @return {Model}        the Model instance
   */
  pull(key, value) {
    this.query.$pull = this.query.$pull || {};
    Object.assign(this.query.$pull, { [key]: value });
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
      const query = Object.keys(this.query).length > 0 && this.query || { $set : {} };
      return this.getCollection().update({ _id: this._id }, query).then(clearResult);
    }
    return this.getCollection().create(this.query.$set).then(clearResult);
  }

  /**
   * Updates a document using a set of key values
   * @param  {Object} object the set of keys and values
   * @return {Promise}
   */
  update(object = {}) {
    _.each(object, (value, key) => {
      this.set(key, value);
    });
    return this.save();
  }

  /**
   * Safely get the value of deeply nested values in a document
   * @param  {String} key the dot notation path to the value
   * @return {Any}     can be any type of data
   */
  getValueForKey(key) {
    return _.get(this, key);
  }

  /**
   * Merges a set of data with the existing document
   * this does not update the document but instead returns a new Object
   * containing both the old and new data
   * @param  {Object} changes the data to be merged
   * @return {Object}         the new document
   */
  mergeChanges(changes) {
    return Object.assign({}, deepMerge(this, _.dotToNot(changes)));
  }

  upsert() {

  }

  remove() {

  }
}
