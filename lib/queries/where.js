import { getOperator } from './operators';

export class Where {
  constructor (key, is, value) {
    this.query = {};
    const operator = getOperator(is);

    if (operator === '$eq') {
      this.query = {
        [key]: value
      };
    } else {
      this.query = {
        [key]: {
          [operator]: value
        }
      };
    }
    return this.query;
  }
}
