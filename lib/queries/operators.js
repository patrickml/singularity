const operators = {
  '=': '$eq',
  '!=': '$ne',
  in: '$in',
  '!in': '$nin',
  '>': '$gt',
  '>=': '$gte',
  '<': '$lt',
  '<=': '$lte',
  or: '$or',
  exists: '$exists',
  // add logical operators
};

export const getOperator = (is) => operators[is] || operators['='];
