import { Group } from './queries/group';
import { GeoNear } from './queries/geoNear';
import { Or } from './queries/or';
import { Where } from './queries/where';

export class Query {
  constructor() {
    this.wheres = [];
    this.pipelines = [];
    this.options = {};
    this.sets = {};
    return this;
  }

  /**
   * Fields to be selected
   * @param  {Array} ...args  fields to be selected
   * @return {Query}   the instance
   */
  select(...args) {
    this.options.fields = this.options.fields || {};
    const arr = args.length === 1 && _.isArray(args[0]) && args[0] || args;
    Object.assign(this.options.fields, _.object(arr, new Array(arr.length).fill(1)));
    return this;
  }

  /**
   * Creates a projection, generally used for normal querys using `$search`
   * @param  {String} key    the key to project
   * @param  {Object} obj    the obj containing the projection
   * @return {Query}         the instance
   */
  project(key, obj) {
    this.options.fields = this.options.fields || {};
    Object.assign(this.options.fields, { [key]: obj });
    return this;
  }

  /**
   * Build a where query
   * @param  {String} key        the key to look up
   * @param  {String} is         the opertator to use
   * @param  {String} value      the value we want to find
   * @return {Query}             the instance
   */
  where(key, is, value) {
    this.wheres.push(new Where(key, is, value));
    return this;
  }

  /**
   * Converts a find statement into multiple wheres
   * @param  {Object} object  traditional find
   * @return {Query}          the instance
   */
  find(object) {
    _.each(object, (value, key) => {
      this.wheres.push(new Where(key, '=', value));
    });
    return this;
  }

  /**
   * Builds a compound `where` using `$or`
   * @param  {Function} callback  the operations you want to make with the `$or`
   * @return {Query}              instance of the builder
   */
  or(callback) {
    callback(new Or({ builder: this }));
    return this;
  }

  /**
   * Find documents with a value between two values
   * @param  {Function} callback  the operations you want to make with the `$or`
   * @return {Query}              instance of the builder
   */
  between(key, start, end) {
    this.wheres.push({
      [key]: {
        $gte: start,
        $lte: end,
      },
    });
    return this;
  }

  /**
   * Sets a new value for key
   * @param {String} key   this is the key to update
   * @param {Object} value this is the new value
   */
  set(key, value) {
    Object.assign(this.sets, {
      [key]: value,
    });
    return this;
  }

  /**
   * Build the sort options
   * @param  {String} key   the key to sort by
   * @param  {Number} dir   the direction to sort it by
   * @return {Query}        the instance
   */
  sortBy(key, dir) {
    this.options.sort = this.options.sort || {};
    Object.assign(this.options.sort, {
      [key]: dir,
    });
    return this;
  }

  /**
   * Build the limit options
   * @param  {String} number   the number of documents your would like to limit
   * @return {Query}           the instance
   */
  limit(number) {
    this.options.limit = number;
    return this;
  }

  /**
   * Build the skip options
   * @param  {String} number   the number of documents your would like to skip
   * @return {Query}           the instance
   */
  skip(number) {
    this.options.skip = number;
    return this;
  }

  /**
   * Key to groupBy for aggregation
   * @param  {String}   key       the key to groupby
   * @param  {Function} callback  the operations you want to make with the group
   * @return {Query}              instance of the builder
   */
  groupBy(key, callback) {
    callback(new Group({ key, builder: this }));
    return this;
  }

  /**
   * Opens the geoNear query builder
   * @param  {Function} callback  the operations you want to make with the geoNear
   * @return {Query}              instance of the builder
   */
  geoNear(callback) {
    callback(new GeoNear(this));
    return this;
  }

  /**
   * Allow for setting of filter options
   * @param {[type]} options [description]
   */
  setOptions(options) {
    this.options = options;
    return this;
  }

  /**
   * Returns the current set options
   * @return {[type]} [description]
   */
  getSets() {
    return this.sets;
  }

  /**
   * Get the query for our find function
   * @return {Object} the find query
   */
  getQuery() {
    return _.object(
      _.map(this.wheres, (object) =>
        _.map(object, (key, value) => [value, key])[0]
      )
    );
  }

  /**
   * Gets the update query
   * @return {Object} the update query
   */
  getUpdate() {
    const update = {};
    if (Object.keys(this.getSets()).length > 0) {
      update.$set = this.getSets();
    }
    return update;
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
     const query = this.getQuery();
     if (Object.keys(query).length > 0) {
       return {
         $match: query,
       };
     }
     // return a blank object if there isnt anything to match
     return {};
   }

  /**
   * Builds an Aggregation sort
   * @return {Object} the $sort
   */
  getSort() {
    const { sort } = this.getOptions();
    if (sort) {
      return {
        $sort: Object.assign({}, sort),
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
        $project: Object.assign({}, fields),
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
    this.pipelines.push(this.getSort());
    this.pipelines.push(this.getMatch());
    this.pipelines.push(this.getProject());
    return _.compact(this.pipelines.map((obj) => {
      if (Object.keys(obj).length > 0) {
        return obj;
      }
      return undefined;
    }));
  }
}
