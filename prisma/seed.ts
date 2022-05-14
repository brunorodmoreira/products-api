import { PrismaClient } from '@prisma/client';
import {
  getRandomAccount,
  getRandomReferenceCode,
  getRandomName,
  getRandomDescription,
  getRandomSlug,
  getRandomStatus,
  getRandomIdentifiers,
  getRandomAttributes,
} from './utils';

const prisma = new PrismaClient();

const NUMBER_OF_PRODUCTS = 100;

async function main() {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  await prisma.attribute.deleteMany();
  await prisma.product.deleteMany();

  for (let i = 0; i < NUMBER_OF_PRODUCTS; i++) {
    await prisma.product.create({
      data: {
        account: getRandomAccount(),
        // referenceCode: chanceOrNull(20, faker.random.alphaNumeric, 10),
        referenceCode: getRandomReferenceCode(),
        name: getRandomName(),
        description: getRandomDescription(),
        // slug: chanceOrNull(20, faker.lorem.slug, getRandomNumber(3, 10)),
        slug: getRandomSlug(),
        status: getRandomStatus(),
        identifiers: getRandomIdentifiers(),
        attributes: {
          create: getRandomAttributes(),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
