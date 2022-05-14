import { faker } from '@faker-js/faker';
import { ProductStatus } from '@prisma/client';

const PRODUCT_STATUS = ['ACTIVE', 'DRAFT'];

function getRandomProductStatus() {
  return faker.helpers.arrayElement(PRODUCT_STATUS) as ProductStatus;
}

function getRandomNumber(min: number, max: number) {
  return faker.datatype.number({ min, max });
}

export function getRandomAccount(): string {
  return faker.random.word().toLowerCase();
}

export function getRandomReferenceCode(): string {
  return faker.helpers.maybe(() => faker.random.alphaNumeric(10), {
    probability: 0.5,
  });
}

export function getRandomName(): string {
  return faker.helpers.maybe(() => faker.commerce.productName(), {
    probability: 0.9,
  });
}

export function getRandomStatus(): ProductStatus {
  return faker.helpers.maybe(getRandomProductStatus, {
    probability: 0.8,
  });
}

export function getRandomSlug(): string {
  return faker.helpers.maybe(() => faker.lorem.slug(getRandomNumber(1, 5)), {
    probability: 0.5,
  });
}

export function getRandomDescription(): string {
  return faker.helpers.maybe(
    () => faker.lorem.sentence(getRandomNumber(10, 30)),
    { probability: 0.7 },
  );
}

export function getRandomIdentifiers() {
  return faker.helpers.maybe(
    () =>
      faker.helpers.uniqueArray(
        () => faker.random.alphaNumeric(5),
        getRandomNumber(1, 5),
      ),
    { probability: 0.6 },
  );
}

export function getRandomAttributes() {
  return faker.helpers.uniqueArray(
    () => ({
      name: faker.random.word(),
      value: faker.random.word(),
      label: faker.helpers.maybe(() => faker.random.word(), {
        probability: 0.5,
      }),
    }),
    getRandomNumber(0, 3),
  );
}
