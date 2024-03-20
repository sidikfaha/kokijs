export interface CacheOptions {
  lifetime: number;
}

export interface ICache<T> {
  data: T;
  expiresAt: number;
}

export const getCache = <T>(key: string) => {
  const value = sessionStorage.getItem(key);
  if (!value) return null;

  const cache = JSON.parse(value) as ICache<T>;
  if (Date.now() > cache.expiresAt) {
    sessionStorage.removeItem(key);
    return null;
  }

  return cache.data;
};

export const setCache = <T>(
  key: string,
  value: NonNullable<T>,
  { lifetime: retention = 5 }: CacheOptions
) => {
  if (!value) return;
  const cacheObject: ICache<T> = {
    data: value,
    expiresAt: Date.now() + retention * 60 * 1000,
  };
  sessionStorage.setItem(key, JSON.stringify(cacheObject));
};