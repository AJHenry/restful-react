import cache from "js-cache";

const setCache = (key: string | undefined, value: any | null, timeout: number | undefined): void => {
  // console.log(`Cache: Setting the cache`);
  // cache
  if (!key) {
    return;
  }

  if (!timeout || timeout === 0) {
    cache.set(key, value);
  } else {
    cache.set(key, value, timeout);
  }
  // console.log(`cache value`);
  // console.log(cache.get(strKey));
};

const clearCache = (key: string): void => {
  // console.log(`Clearing the cache`);

  cache.del(key);
};

const getCache = (key: string, def?: any): any => {
  // console.log(`Cache: getting the cache with key ${strKey}`);
  const res = cache.get(key);

  return !res ? (def ? def : null) : res;
};

const toStr = (key: object): any => {
  return JSON.stringify(key);
};

export { setCache, clearCache, getCache, toStr };
