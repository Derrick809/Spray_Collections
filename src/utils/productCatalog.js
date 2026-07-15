export const mergeProductsWithDefaults = (storedProducts, defaultProducts) => {
  const defaults = Array.isArray(defaultProducts) ? defaultProducts : [];
  const stored = Array.isArray(storedProducts) ? storedProducts : [];

  if (!stored.length) {
    return defaults;
  }

  const merged = [...defaults];
  const byId = new Map(merged.map((item) => [item.id, item]));

  stored.forEach((item) => {
    if (!item?.id) {
      return;
    }

    const existing = byId.get(item.id);
    if (existing) {
      byId.set(item.id, { ...existing, ...item, id: item.id });
      return;
    }

    byId.set(item.id, item);
    merged.push(item);
  });

  return Array.from(byId.values());
};
