import { Singularity } from './singularity';
import { Model as _Model } from './model';
import { Mongo } from 'meteor/mongo';

export class Collection {

  /**
   * @param  {String} name      Name of the Collection
   * @param  {Object} model     model to transform each document
   */
  constructor({ name, model }) {
    const Model = model || _Model;

    Model.prototype.getCollection = () => this;

    this._collection = new Mongo.Collection(name, {
      /**
       * Transforms our document into a `Class`
       * @param  {Object} doc document from the database
       * @return {Object}     a new instance of a class
       */
      transform(doc) {
        // return a new instance of our model
        return new Model(doc);
      },
    });

    return () => new Singularity(this);
  }

  /**
   * Returns a new instance of `Singularity` this is used for prototypes outside the scope
   * Generally used by extentions to this Collection instance
   * @return {Singularity}  a new `Singularity` instance
   */
  newQuery() {
    return new Singularity(this);
  }

  /**
   * Returns the Mongo Collection instance
   * @return {Collection} the instance of the Mongo Collection
   */
  getRawCollection() {
    return this._collection;
  }

  /**
   * Create a new document
   * @param  {Object} document document to be inserted
   * @return {Promise}
   */
  create(document = {}) {
    // create a new promise so we can `insert` asynchronously
    return new Promise((resolve, reject) => {
      let doc = document;
      // If there is a beforeCreate method call it
      if (this.beforeCreate) doc = this.beforeCreate(document);

      // insert our document
      this.getRawCollection().insert(doc, (error, result) => {
        if (error) {
          reject(error); // if we have an error return the error
        } else {
          resolve(result); // on success return the result, this should be an _id
          // if there is an afterCreate method call it
          if (this.afterCreate) this.afterCreate(result);
        }
      });
    });
  }

  /**
   * Update a document
   * @param  {Object} document query use to update
   * @return {Promise}
   */
  update(query = {}, doc = {}, multi = {}) {
    // create a new promise so we can `update` asynchronously
    return new Promise((resolve, reject) => {
      // insert our document
      this.getRawCollection().update(query, doc, multi, (error, result) => {
        if (error) {
          reject(error); // if we have an error return the error
        } else {
          resolve(result); // on success return the result, this should be an _id
        }
      });
    });
  }

  /**
   * Return a single document from the database
   * @param  {Object} query    MongoDB query
   * @param  {Object} selector MongoDB field selectors
   * @return {Promise}
   */
  first(query = {}, selector = {}) {
    // create a new promise so we can `findOne` asynchronously
    return new Promise((resolve, reject) => {
      try {
        // return the find if everything for formatted correctly
        resolve(this.getRawCollection().findOne(query, selector));
      } catch (error) {
        // return the error
        reject(error);
      }
    });
  }

  /**
   * Returns an MongoDB cursor
   * @param  {Object} query    MongoDB query
   * @param  {Object} selector MongoDB field selectors
   * @return {Promise}
   */
  getCursor(query = {}, selector = {}) {
    // return the cursor sync so we can track it
    return this.getRawCollection().find(query, selector);
  }

  /**
   * Returns the result from MongoDB
   * @param  {Object} query    MongoDB query
   * @param  {Object} selector MongoDB field selectors
   * @return {Promise}
   */
  fetch(query = {}, selector = {}) {
    // create a new promise so we can `find` asynchronously
    return new Promise((resolve, reject) => {
      try {
        // return the cursor if everything is formatted correctly
        resolve(this.getRawCollection().find(query, selector).fetch());
      } catch (error) {
        // return the error
        reject(error);
      }
    });
  }

  /**
   * Removes a document from the database
   * @param  {Object} query MongoDB query
   * @return {Promise}
   */
  remove(query) {
    // create a new promise so we can `remove` asynchronously
    return new Promise((resolve, reject) => {
      this
        .getRawCollection()
        .remove(query, (error, result) => {
          if (error) {
            // return the error
            reject(error);
          } else {
            // return the result, this should be a count
            resolve(result);
          }
        });
    });
  }

  /**
   * Perform an Aggregation on our collection
   * @param  {Array} aggregate    params for the Aggregation
   * @return {Promise}
   */
  aggregate(arr) {
    return new Promise((resolve, reject) => {
      try {
        // return the aggregation result
        resolve(this.getRawCollection().aggregate(arr));
      } catch (error) {
        // return the error
        reject(error);
      }
    });
  }

}
