import { Group } from './queries/group';
import { Or } from './queries/or';
import { Where } from './queries/where';

export class Query {
  constructor () {
    this.wheres = [];
    this.groups = [];
    this.options = {};
    return this;
  }

  /**
   * Fields to be selected
   * @param  {Array} ...args  fields to be selected
   * @return {QueryBuilder}   the instance
   */
  select(...args) {
    this.options.fields = this.options.fields || {};
    this.options.fields = _.object(args, new Array(args.length).fill(1));
    return this;
  }

  /**
   * Build a where query
   * @param  {String} key        the key to look up
   * @param  {String} is         the opertator to use
   * @param  {String} value      the value we want to find
   * @return {QueryBuilder}      the instance
   */
  where(key, is, value) {
    this.wheres.push(new Where(key, is, value));
    return this;
  }

  /**
   * Builds a compound `where` using `$or`
   * @param  {Function} callback the operations you want to make with the `$or`
   * @return {QueryBuilder}      instance of the builder
   */
  or(callback) {
    callback(new Or({ builder: this }));
    return this;
  }

  /**
   * Find documents with a value between two values
   * @param  {Function} callback the operations you want to make with the `$or`
   * @return {QueryBuilder}      instance of the builder
   */
  between(key, start, end) {
    this.wheres.push({
      [key]: {
        $gte: start,
        $lte: end
      }
    });
    return this;
  }

  /**
   * Build the sort options
   * @param  {String} key   the key to sort by
   * @param  {[type]} dir   the direction to sort it by
   * @return {QueryBuilder}      the instance
   */
  sort(key, dir) {
    this.options.sort = this.options.sort || {};
    Object.assign(this.options.sort, {
      [key] : dir
    });
    return this;
  }

  /**
   * Build the limit options
   * @param  {String} number   the number of documents your would like to limit
   * @return {QueryBuilder}    the instance
   */
  limit(number) {
    this.options.limit = number;
    return this;
  }

  /**
   * Build the skip options
   * @param  {String} number   the number of documents your would like to skip
   * @return {QueryBuilder}    the instance
   */
  skip(number) {
    this.options.skip = number;
    return this;
  }

  /**
   * Key to groupby for aggregation
   * @param  {String}   key      the key to groupby
   * @param  {Function} callback the operations you want to make with the group
   * @return {QueryBuilder}      instance of the builder
   */
  group(key, callback) {
    callback(new Group({ key, builder: this }));
    return this;
  }

  /**
   * Get the query for our find function
   * @return {Object} the find query
   */
  getQuery() {
    return _.object(
      _.map(this.wheres, (object, index) =>
        _.map(object, (key, value) => [value, key])[0]
      )
    );
  }

  /**
   * Get the query options
   * @return {Object} the query options
   */
  getOptions() {
    return this.options;
  }

  /**
   * Builds and Aggregation $match
   * @return {Object} the $match
   */
  getMatch() {
    return {
      $match: Object.assign({}, this.getQuery())
    };
  }

  /**
   * Builds an Aggregation sort
   * @return {Object} the $sort
   */
  getSort() {
    const { sort } = this.getOptions();
    if (sort) {
      return {
        $sort: Object.assign({}, sort)
      };
    }
    // return a blank object if there isnt anything to sort
    return {};
  }

  /**
   * Builds a projects query
   * @return {Object} the $projection
   */
  getProject() {
    const { fields } = this.getOptions();
    if (fields) {
      return {
        $project: Object.assign({}, fields)
      };
    }
    // return a blank object if there isnt anything to project
    return {};
  }

  /**
   * Returns the aggregation pipeline
   * @return {Array} the pipeline
   */
  getAggregation() {
    let arr = [];
    const options = [
      this.getProject(),
      this.getMatch(),
      this.getSort(),
      ...this.groups
    ];

    return _.compact(options.map((obj) => {
      if (Object.keys(obj).length > 0) {
        return obj;
      }
    }));
  }
}
