import { isObject } from '../recognize-functions/basic';
type objectWithStringKeys = {
  [key: string]: any,
}

export const toCamel = (s: string): string => (s.replace(/([-_][a-z])/ig, ($1) => (
  $1.toUpperCase()
    .replace('-', '')
    .replace('_', ''))
)
);


export const keysToCamel = function (o: object): object {
  if (isObject(o)) {
    const n: objectWithStringKeys = {};
    const keys = Object.keys(o) as string[];

    keys.forEach((k: string) => {
      const camelKey = toCamel(k);
      n[camelKey] = keysToCamel(o[k as keyof typeof o]);
    });

    return n;
  } else if (Array.isArray(o)) {
    return o.map((i) => (keysToCamel(i))
    );
  }

  return o;
};


