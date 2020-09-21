export const isFirstItem = (item: object, items: object[]): Boolean =>
  items.indexOf(item) === 0;

export const isLastItem = (item: object, items: object[]): Boolean =>
  items.indexOf(item) === items.length - 1;

export const getIndexesFromUrls = (urls: string[]): number[] => {
  const indexes: number[] = [];

  urls?.forEach((url: string) => {
    const splittedUrls = url.split("/");
    indexes.push(parseInt(splittedUrls[splittedUrls.length - 2], 10) - 1);
  });
  return indexes;
};
