import { Singularity } from "./singularity";
import { Model } from "./model";

export class Collection {

  /**
   * @param  {String} name      Name of the Collection
   * @param  {Object} model     model to transform each document
   */
  constructor ({ name, model }) {
    let collection = this;

    this.collection = new Mongo.Collection(name, {
      /**
       * Transforms our document into a `Class`
       * @param  {Object} doc document from the database
       * @return {Object}     a new instance of a class
       */
      transform(doc) {
        // return a new instance of our model
        return model && new model(doc) || new Model(doc, collection);
      }
    });

    return () => new Singularity(this);
  }

  /**
   * Create a new document
   * @param  {Object} document document to be inserted
   * @return {Promise}
   */
  create (document = {}) {
    // create a new promise so we can `insert` asynchronously
    return new Promise((resolve, reject) => {
      this
        .collection
        .insert(document, (error, result) => { // insert our document
          if (error) {
            reject(error); // if we have an error return the error
          } else {
            resolve(result); // on success return the result, this should be an _id
          }
        });
    });
  }

  /**
   * Update a document
   * @param  {Object} document query use to update
   * @return {Promise}
   */
  update (query = {}, doc = {}, multi = {}) {
    // create a new promise so we can `update` asynchronously
    return new Promise((resolve, reject) => {
      this
        .collection
        .update(query, doc, multi, (error, result) => { // insert our document
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
  first (query = {}, selector = {}) {
    // create a new promise so we can `findOne` asynchronously
    return new Promise((resolve, reject) => {
      try {
        // return the find if everything for formatted correctly
        resolve(this.collection.findOne(query, selector));
      } catch (error) {
        // if we have an error use the message or create a default message
        error.message = error.message || "failed to find document";
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
  find (query = {}, selector = {}) {
    // return the cursor sync so we can track it
    return this.collection.find(query, selector);
  }

  /**
   * Returns the result from MongoDB
   * @param  {Object} query    MongoDB query
   * @param  {Object} selector MongoDB field selectors
   * @return {Promise}
   */
  fetch (query = {}, selector = {}) {
    // create a new promise so we can `find` asynchronously
    return new Promise((resolve, reject) => {
      try {
        // return the cursor if everything is formatted correctly
        resolve(this.collection.find(query, selector).fetch());
      } catch (error) {
        // if we have an error use the message or create a default message
        error.message = error.message || "failed to find document(s)";
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
  remove (query) {
    // create a new promise so we can `remove` asynchronously
    return new Promise((resolve, reject) => {
      this
        .collection
        .remove(query, (error, result) => {
          if (error) {
            // if we have an error use the message or create a default message
            error.message = error.message || "failed to remove document(s)";
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
  aggregate (arr) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.collection.aggregate(arr));
      } catch (error) {
        reject(error);
      }
    });
  }

}
