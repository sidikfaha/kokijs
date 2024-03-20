export interface CacheOptions {
    retention: number;
  }
  
  export interface ICache<T> {
    data: T;
    expire: number;
  }
  