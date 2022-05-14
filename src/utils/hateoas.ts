type HateoasLinks = {
  self: string;
  next?: string;
  prev?: string;
  custom?: { [key: string]: string };
};

export function buildHeatoasLinksForItem(prefix: string, itemId: string) {
  return buildHateoasLinks({
    self: `${prefix}${itemId}`,
  });
}

export function buildHateoasLinks({
  self,
  next,
  prev,
  ...custom
}: HateoasLinks) {
  return {
    self: {
      href: self,
    },
    next: next ? { href: next } : undefined,
    prev: prev ? { href: prev } : undefined,
    ...Object.entries(custom).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: { href: value } }),
      {},
    ),
  };
}
