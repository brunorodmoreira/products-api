export function parsePageAndSizeToSkipAndTake(page: string, size: string) {
  const take = Number(size);
  const skip = (Number(page) - 1) * take;

  return { skip, take };
}

export function parseQueryToWhereArgs(query: any): {
  [key: string]: { equals: string };
} {
  const whereArgs = {};
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      const element = query[key];
      whereArgs[key] = {
        equals: element,
      };
    }
  }

  return whereArgs;
}
