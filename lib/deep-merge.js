const deepMerge = (target, source) => {
  const newTarget = target;
  for (let key in source) {
    const original = newTarget[key];
    const next = source[key];
    if (original && next && typeof next === 'object') {
      deepMerge(original, next);
    } else {
      newTarget[key] = next;
    }
  }
  return newTarget;
};

export default deepMerge;
