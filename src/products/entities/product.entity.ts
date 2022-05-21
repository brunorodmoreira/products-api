import { Product as IProduct, ProductStatus } from '@prisma/client';

export class Product implements IProduct {
  id: number;
  account: string;
  referenceCode: string;
  identifiers: string[];
  name: string;
  description: string;
  slug: string;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}
