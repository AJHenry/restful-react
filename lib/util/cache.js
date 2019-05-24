import cache from "js-cache";
var setCache = function(key, value, timeout) {
  // console.log(`Cache: Setting the cache`);
  // cache
  var strKey = toStr(key);
  if (!timeout || timeout === 0) {
    cache.set(strKey, value);
  } else {
    cache.set(strKey, value, timeout);
  }
  // console.log(`cache value`);
  // console.log(cache.get(strKey));
};
var clearCache = function(key) {
  // console.log(`Clearing the cache`);
  var strKey = toStr(key);
  cache.del(strKey);
};
var getCache = function(key, def) {
  var strKey = toStr(key);
  // console.log(`Cache: getting the cache with key ${strKey}`);
  var res = cache.get(strKey);
  return !res ? (def ? def : null) : res;
};
var toStr = function(key) {
  return JSON.stringify(key);
};
export { setCache, clearCache, getCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxVQUFVLENBQUM7QUFFN0IsSUFBTSxRQUFRLEdBQUcsVUFBQyxHQUFXLEVBQUUsS0FBaUIsRUFBRSxPQUEyQjtJQUMzRSwyQ0FBMkM7SUFDM0MsUUFBUTtJQUNSLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7UUFDN0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDMUI7U0FBTTtRQUNMLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNuQztJQUNELDhCQUE4QjtJQUM5QixrQ0FBa0M7QUFDcEMsQ0FBQyxDQUFDO0FBRUYsSUFBTSxVQUFVLEdBQUcsVUFBQyxHQUFXO0lBQzdCLHFDQUFxQztJQUNyQyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFMUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFFRixJQUFNLFFBQVEsR0FBRyxVQUFDLEdBQVcsRUFBRSxHQUFTO0lBQ3RDLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQiw4REFBOEQ7SUFDOUQsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU5QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3pDLENBQUMsQ0FBQztBQUVGLElBQU0sS0FBSyxHQUFHLFVBQUMsR0FBVztJQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDO0FBRUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMifQ==