import { ResultType } from '../models';

class CacheService {
  private cache: ResultType[] = [];
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  public getMaxSize = () => this.maxSize;

  public getCache(): ResultType[] {
    return this.cache;
  }

  public get = (id: number): ResultType | undefined => {
    return this.cache.find((item) => item.id === id);
  };

  public set = (value: ResultType): void => {
    if (this.cache.length >= this.maxSize) {
      this.updateCache();
    }
    this.cache.push(value);
  };

  public clear = (): void => {
    this.cache = [];
  };

  public setMaxSize = (size: number): void => {
    this.maxSize = size;
    while (this.cache.length > size) {
      this.updateCache();
    }
  };

  private updateCache = (): void => {
    if (this.cache.length > 0) {
      this.cache.shift();
    }
  };
}

export default new CacheService();
