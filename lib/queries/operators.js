const operators = {
  '=' : '$eq',
  '!=' : '$ne',
  'in' : '$in',
  'nin' : '$nin',
  '>' : '$gt',
  '>=' : '$gte',
  '<' : '$lt',
  '<=' : '$lte',
  'or' : '$or'
  // add logical operators
};

export const getOperator = (is) => {
  return operators[is] || operators['='];
};
