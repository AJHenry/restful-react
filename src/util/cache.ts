import cache from "js-cache";

const setCache = (key: object, value: any | null, timeout: number | undefined): void => {
  // console.log(`Cache: Setting the cache`);
  // cache
  const strKey = toStr(key);
  if (!timeout || timeout === 0) {
    cache.set(strKey, value);
  } else {
    cache.set(strKey, value, timeout);
  }
  // console.log(`cache value`);
  // console.log(cache.get(strKey));
};

const clearCache = (key: object): void => {
  // console.log(`Clearing the cache`);
  const strKey = toStr(key);

  cache.del(strKey);
};

const getCache = (key: object, def?: any): any => {
  const strKey = toStr(key);
  // console.log(`Cache: getting the cache with key ${strKey}`);
  const res = cache.get(strKey);

  return !res ? (def ? def : null) : res;
};

const toStr = (key: object): any => {
  return JSON.stringify(key);
};

export { setCache, clearCache, getCache };
