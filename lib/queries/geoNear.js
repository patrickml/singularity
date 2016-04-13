import { Where } from './where';

export class GeoNear {
  constructor(builder) {
    this.builder = builder;
    this.query = {};
    return this;
  }

  /**
   * Set the center point
   * @param  {String} type        type of point
   * @param  {Array} coordinates  array of 2d coordinates
   * @return {GeoNear}            the instance
   */
  near(type, coordinates) {
    Object.assign(this.query, {
      near: { type, coordinates },
    });
    return this;
  }

  /**
   * Build a where query
   * @param  {String} key        the key to look up
   * @param  {String} is         the opertator to use
   * @param  {String} value      the value we want to find
   * @return {GeoNear}             the instance
   */
  where(key, is, value) {
    this.query.query = this.query.query || {};
    Object.assign(this.query.query, new Where(key, is, value));
    return this;
  }

  /**
   * Sets the key of the distance field to project
   * @param {GeoNear} field the instance
   */
  setDistanceField(field) {
    this.query.distanceField = field;
    return this;
  }

  /**
   * The key to use as the coordinates
   * @param {GeoNear} key the instance
   */
  setIncludeLocs(key) {
    this.query.includeLocs = key;
    return this;
  }

  /**
   * Sets the multiplier for the distance this is use for converting to mi
   * @param {GeoNear} multiplier the instance
   */
  setDistanceMultiplier(multiplier) {
    this.query.distanceMultiplier = multiplier;
    return this;
  }

  /**
   * Sets the Max Distance for too look out
   * @param {Number} max the max distance
   */
  setMaxDistance(max) {
    this.query.maxDistance = max;
    return this;
  }

  /**
   * Sets `spherical` to be true
   * @param  {Boolean}  bool  either true of false
   * @return {GeoNear}        the instance
   */
  isSpherical(bool = true) {
    this.query.spherical = bool;
    return this;
  }

  /**
   * Build the $geoNear query
   */
  build() {
    this.builder.pipelines.push({
      $geoNear: Object.assign({}, this.query),
    });
  }

}
