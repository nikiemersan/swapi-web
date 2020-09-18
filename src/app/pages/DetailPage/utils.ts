export const isFirstItem = (item: object, items: object[]) =>
  items.indexOf(item) === 0;

export const isLastItem = (item: object, items: object[]) =>
  items.indexOf(item) === items.length - 1;
