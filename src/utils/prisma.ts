import {
  parsePageAndSizeToSkipAndTake,
  parseQueryToWhereArgs,
} from './pagination-and-filter.utils';

export type FindManyArgs = {
  skip: number;
  take: number;
  where: {
    [key: string]: {
      equals: string;
    };
  };
};

export function parseOptionsToPrismaFindManyArgs(options: any): FindManyArgs {
  const { page, size, ...query } = options;

  const { skip, take } = parsePageAndSizeToSkipAndTake(page, size);

  return {
    skip,
    take,
    where: parseQueryToWhereArgs(query),
  };
}
