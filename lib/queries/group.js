export class Group {
  constructor({ builder, key }) {
    this.key = key;
    this.builder = builder;
    this.query = {};
    return this;
  }

  /**
   * Returns a sum of numerical values. Ignores non-numeric values.
   * @param  {String} key the key to sum
   * @return {Group}      the instance of the group
   */
  sum(key, newKey) {
    Object.assign(this.query, {
      [newKey || key]: { $sum: `$${key}` },
    });
    return this;
  }

  /**
   * Returns an average of numerical values. Ignores non-numeric values.
   * @param  {String} key the key to average
   * @return {Group}      the instance of the group
   */
  avg(key, newKey) {
    Object.assign(this.query, {
      [newKey || key]: { $avg: `$${key}` },
    });
    return this;
  }

  /**
   * Returns the highest expression value for each group.
   * @param  {String} key the key to average
   * @return {Group}      the instance of the group
   */
  max(key, newKey) {
    Object.assign(this.query, {
      [newKey || key]: { $max: `$${key}` },
    });
    return this;
  }

  /**
   * Returns the lowest expression value for each group.
   * @param  {String} key the key to average
   * @return {Group}      the instance of the group
   */
  min(key, newKey) {
    Object.assign(this.query, {
      [newKey || key]: { $min: `$${key}` },
    });
    return this;
  }

  /**
   * Returns the first value for a key in each group.
   * @param  {String} key the key to find
   * @return {Group}      the instance of the group
   */
  first(key, newKey) {
    Object.assign(this.query, {
      [newKey || key]: { $first: `$${key}` },
    });
    return this;
  }

  /**
   * Returns the last value for a key in each group.
   * @param  {String} key the key to find
   * @return {Group}      the instance of the group
   */
  last(key, newKey) {
    Object.assign(this.query, {
      [newKey || key]: { $last: `$${key}` },
    });
    return this;
  }

  /**
   * Build the $group query
   * @return {[type]} [description]
   */
  build() {
    this.builder.groups.push({
      $group: Object.assign({}, this.query, { _id: `$${this.key}` }),
    });
  }

}
