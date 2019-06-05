import cache from "js-cache";

const setCache = (key: string | undefined, value: any | null, timeout: number | undefined): void => {
  // console.log(`Cache: Setting the cache`);
  // cache
  if (!key) {
    // console.log(`Key not defined, returning`);
    return;
  }

  if (!timeout || timeout === 0) {
    // console.log(`No timeout given, setting cache with no timeout`);
    cache.set(key, value);
  } else {
    // console.log(`Timeout given, setting cache with timeout: ${timeout}`);
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
