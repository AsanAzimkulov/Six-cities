const isArray = function (a: object) {
  return Array.isArray(a);
};

export const isObject = function (o: object) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};
