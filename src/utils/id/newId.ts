let lastId = 0;

export default function newId(prefix = 'id') {
  lastId++;
  return `${prefix}${lastId}`;
}
