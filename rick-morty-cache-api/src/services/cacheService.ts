import { CharacterType } from '../models';

class CacheService {
  private cache: Map<string, CharacterType>;
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: string): CharacterType | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: CharacterType): void {
    if (this.cache.size >= this.maxSize) {
      this.updateCache();
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  updateCache(): void {
    const iterator = this.cache.keys();
    const firstKey = iterator.next().value as string;

    if (firstKey) {
      this.cache.delete(firstKey);
    }
  }

  setMaxSize(size: number): void {
    this.maxSize = size;
    while (this.cache.size > size) {
      this.updateCache();
    }
  }
}

export default new CacheService();
