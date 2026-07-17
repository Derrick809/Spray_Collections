const CATALOG_STORAGE_KEY = 'cianelle-luxe-products';
const LEGACY_CATALOG_STORAGE_KEY = 'products';
const CATALOG_BROADCAST_CHANNEL = 'cianelle-catalog';

const getStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
};

export const mergeProductsWithDefaults = (storedProducts, defaultProducts) => {
  if (!Array.isArray(storedProducts)) {
    return defaultProducts;
  }

  const merged = [...defaultProducts];
  const byId = new Map(merged.map((item) => [item.id, item]));

  storedProducts.forEach((item) => {
    if (!item?.id) {
      return;
    }

    if (byId.has(item.id)) {
      byId.set(item.id, { ...byId.get(item.id), ...item });
      return;
    }

    byId.set(item.id, item);
  });

  return Array.from(byId.values());
};

export const readStoredProducts = (defaultProducts, storage = getStorage()) => {
  if (!storage) {
    return defaultProducts;
  }

  const parsedCandidates = [];

  for (const key of [CATALOG_STORAGE_KEY, LEGACY_CATALOG_STORAGE_KEY]) {
    try {
      const rawValue = storage.getItem(key);
      if (!rawValue) {
        continue;
      }

      const parsed = JSON.parse(rawValue);
      if (Array.isArray(parsed)) {
        parsedCandidates.push(parsed);
      }
    } catch {
      // ignore invalid stored payloads and fall back to defaults
    }
  }

  if (!parsedCandidates.length) {
    return defaultProducts;
  }

  return mergeProductsWithDefaults(parsedCandidates.flat(), defaultProducts);
};

export const persistProducts = (products, storage = getStorage()) => {
  if (!storage) {
    return;
  }

  const normalizedProducts = products.map((item) => ({
    ...item,
    id: item.id || `product-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    price: Number(item.price) || 0,
    available: item.available !== false,
  }));

  storage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(normalizedProducts));
  storage.setItem(LEGACY_CATALOG_STORAGE_KEY, JSON.stringify(normalizedProducts));
};

export const notifyCatalogChange = () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof BroadcastChannel === 'undefined') {
    return;
  }

  try {
    const channel = new BroadcastChannel(CATALOG_BROADCAST_CHANNEL);
    channel.postMessage({ type: 'catalog-updated' });
    channel.close();
  } catch {
    // ignore broadcast failures and fall back to storage persistence
  }
};
