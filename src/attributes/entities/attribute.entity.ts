import { Attribute as IAttribute } from '@prisma/client';

export class Attribute implements Omit<IAttribute, 'productId'> {
  id: number;
  name: string;
  value: string;
  label: string;
}
