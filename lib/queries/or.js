import { Where } from "./where";

export class Or {
  constructor({ builder }) {
    this.builder = builder;
    this.wheres = [];
    return this;
  }

  where (key, is, value) {
    this.wheres.push(new Where(key, is, value));
    return this;
  }

  /**
   * Build the $group query
   * @return {[type]} [description]
   */
  build() {
    this.builder.wheres.push({
      $or: this.wheres
    });
  }

}
