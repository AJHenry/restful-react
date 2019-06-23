import cache from "js-cache";
var setCache = function(key, value, timeout) {
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
var clearCache = function(key) {
  // console.log(`Clearing the cache`);
  cache.del(key);
};
var getCache = function(key, def) {
  // console.log(`Cache: getting the cache with key ${strKey}`);
  var res = cache.get(key);
  return !res ? (def ? def : null) : res;
};
var toStr = function(key) {
  return JSON.stringify(key);
};
export { setCache, clearCache, getCache, toStr };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxVQUFVLENBQUM7QUFFN0IsSUFBTSxRQUFRLEdBQUcsVUFBQyxHQUF1QixFQUFFLEtBQWlCLEVBQUUsT0FBMkI7SUFDdkYsMkNBQTJDO0lBQzNDLFFBQVE7SUFDUixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1IsNkNBQTZDO1FBQzdDLE9BQU87S0FDUjtJQUVELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRTtRQUM3QixrRUFBa0U7UUFDbEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdkI7U0FBTTtRQUNMLHdFQUF3RTtRQUN4RSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDaEM7SUFDRCw4QkFBOEI7SUFDOUIsa0NBQWtDO0FBQ3BDLENBQUMsQ0FBQztBQUVGLElBQU0sVUFBVSxHQUFHLFVBQUMsR0FBVztJQUM3QixxQ0FBcUM7SUFFckMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUM7QUFFRixJQUFNLFFBQVEsR0FBRyxVQUFDLEdBQVcsRUFBRSxHQUFTO0lBQ3RDLDhEQUE4RDtJQUM5RCxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBRUYsSUFBTSxLQUFLLEdBQUcsVUFBQyxHQUFXO0lBQ3hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUM7QUFFRixPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMifQ==
