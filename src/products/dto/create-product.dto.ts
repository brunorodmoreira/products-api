export enum ProductStatus {
  ACTIVE,
  INACTIVE,
  DRAFT,
}

export class CreateProductDto {
  id?: number;
  account: string;
  referenceCode?: string;
  identifiers: string[];
  name?: string;
  description?: string;
  slug?: string;
  status?: ProductStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
