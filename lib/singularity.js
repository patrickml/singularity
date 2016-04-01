import { Call } from './util/call';
import { Query } from './query';

export class Singularity extends Query {
  constructor(collection) {
    super();
    this.collection = collection;
    this.wheres = [];
    this.groups = [];
    this.options = {};
    return this;
  }

  /**
   * Returns the result from MongoDB
   * @return {Promise}
   */
  fetch() {
    // create a new promise so we can `fetch` asynchronously
    return this.collection.fetch(this.getQuery(), this.getOptions());
  }

  /**
   * Returns the result from MongoDB
   * @return {Promise}
   */
  first() {
    // create a new promise so we can `fetch` asynchronously
    return this.collection.first(this.getQuery(), this.getOptions());
  }

  /**
   * Returns the cursor from MongoDB
   * @param  {Object} query    MongoDB query
   * @param  {Object} selector MongoDB field selectors
   * @return {Promise}
   */
  cursor() {
    // create a new promise so we can `fetch` asynchronously
    return this.collection.find(this.getQuery(), this.getOptions());
  }

  /**
   * Returns the cursor from MongoDB
   * @param  {Object} query    MongoDB query
   * @param  {Object} selector MongoDB field selectors
   * @return {Promise}
   */
  count() {
    // create a new promise so we can `count` asynchronously
    return new Promise((resolve, reject) => {
      try {
        resolve(this.cursor().count());
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Returns an aggregation
   * @param  {Array} args  the aggregation pipeline
   * @return {Promise}
   */
  aggregate(args) {
    if (Meteor.isClient) {
      return Call('aggregate', this.collection.collection._name, this.getAggregation());
    } else {
      return this.collection.aggregate(args || this.getAggregation());
    }
  }

  /**
   * Create a new document
   * @param  {Object} document document to be inserted
   * @return {Promise}
   */
  create(doc = {}) {
    // create a new promise so we can `insert` asynchronously
    return this.collection.create(doc);
  }

  /**
   * Create a new document
   * @param  {Object} document document to be inserted
   * @return {Promise}
   */
  update(query = {}, doc = {}, multi = {}) {
    console.log(query, doc, multi);
    // create a new promise so we can `insert` asynchronously
    return this.collection.update(query, doc, multi);
  }
}
