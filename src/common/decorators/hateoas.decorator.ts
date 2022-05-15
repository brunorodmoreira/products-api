import { SetMetadata } from '@nestjs/common';

type HateoasArgs = {
  collectionWrapper: string;
};

export const Hateoas = (args?: HateoasArgs) =>
  SetMetadata('hateoas', args ?? { collectionWrapper: 'data' });
