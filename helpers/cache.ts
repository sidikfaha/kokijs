import { ICache, CacheOptions } from "../types";

export const getCache = <T>(key: string) => {
  const value = sessionStorage.getItem(key);
  if (!value) return null;

  const cache = JSON.parse(value) as ICache<T>;
  if (Date.now() > cache.expire) {
    sessionStorage.removeItem(key);
    return null;
  }

  return cache.data;
};

export const setCache = <T>(
  key: string,
  value: NonNullable<T>,
  { retention = 5 }: CacheOptions
) => {
  if (!value) return;
  const cacheObject: ICache<T> = {
    data: value,
    expire: Date.now() + retention * 60 * 1000,
  };
  sessionStorage.setItem(key, JSON.stringify(cacheObject));
};