var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";
import * as qs from "qs";
import * as React from "react";
import RestfulReactProvider, { RestfulReactConsumer } from "./Context";
import { getCache, setCache, toStr } from "./util/cache";
import { composePath, composeUrl } from "./util/composeUrl";
import { processResponse } from "./util/processResponse";
import { resolveData } from "./util/resolveData";
/**
 * The <Get /> component without Context. This
 * is a named class because it is useful in
 * debugging.
 */
var ContextlessGet = /** @class */ (function(_super) {
  __extends(ContextlessGet, _super);
  function ContextlessGet(props) {
    var _this = _super.call(this, props) || this;
    /**
     * Abort controller to cancel the current fetch query
     */
    _this.abortController = new AbortController();
    _this.signal = _this.abortController.signal;
    _this.state = {
      data: null,
      response: null,
      loading: !_this.props.lazy,
      error: null,
    };
    _this.getRequestOptions = function(extraOptions, extraHeaders) {
      var requestOptions = _this.props.requestOptions;
      if (typeof requestOptions === "function") {
        return __assign({}, extraOptions, requestOptions(), {
          headers: new Headers(
            __assign(
              {},
              typeof extraHeaders !== "boolean" ? extraHeaders : {},
              (extraOptions || {}).headers,
              (requestOptions() || {}).headers,
            ),
          ),
        });
      }
      return __assign({}, extraOptions, requestOptions, {
        headers: new Headers(
          __assign(
            {},
            typeof extraHeaders !== "boolean" ? extraHeaders : {},
            (extraOptions || {}).headers,
            (requestOptions || {}).headers,
          ),
        ),
      });
    };
    _this.fetch = function(requestPath, thisRequestOptions, ignoreCache) {
      return __awaiter(_this, void 0, void 0, function() {
        var _a,
          base,
          __internal_hasExplicitBase,
          parentPath,
          path,
          resolve,
          useCache,
          cacheMode,
          cacheTimeout,
          cacheKey,
          makeRequestPath,
          internalCacheKey,
          data,
          resolved,
          request,
          response,
          _b,
          data,
          responseError,
          error,
          resolved,
          e_1;
        var _this = this;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              (_a = this.props),
                (base = _a.base),
                (__internal_hasExplicitBase = _a.__internal_hasExplicitBase),
                (parentPath = _a.parentPath),
                (path = _a.path),
                (resolve = _a.resolve),
                (useCache = _a.useCache),
                (cacheMode = _a.cacheMode),
                (cacheTimeout = _a.cacheTimeout),
                (cacheKey = _a.cacheKey);
              if (this.state.error || !this.state.loading) {
                this.setState(function() {
                  return { error: null, loading: true };
                });
              }
              makeRequestPath = function() {
                var url;
                if (__internal_hasExplicitBase) {
                  url = composeUrl(base, "", path || "");
                } else {
                  url = composeUrl(base, parentPath, requestPath || path || "");
                }
                if (_this.props.queryParams) {
                  url += "?" + qs.stringify(_this.props.queryParams);
                }
                return url;
              };
              internalCacheKey =
                cacheKey ||
                toStr({
                  path: makeRequestPath(),
                  options: this.getRequestOptions(thisRequestOptions),
                });
              if (!(useCache && (!ignoreCache || cacheMode === "REPLACE"))) return [3 /*break*/, 2];
              data = getCache(internalCacheKey);
              if (!data) return [3 /*break*/, 2];
              return [4 /*yield*/, resolveData({ data: data, resolve: resolve })];
            case 1:
              resolved = _c.sent();
              // avoid state updates when component has been unmounted
              if (this.signal.aborted) {
                return [2 /*return*/];
              }
              this.setState({ loading: false, data: resolved.data, error: resolved.error });
              // If the cache mode is only, don't bother fetching
              if (cacheMode === "ONLY") {
                return [2 /*return*/, data];
              }
              _c.label = 2;
            case 2:
              request = new Request(makeRequestPath(), this.getRequestOptions(thisRequestOptions));
              _c.label = 3;
            case 3:
              _c.trys.push([3, 7, , 8]);
              return [4 /*yield*/, fetch(request, { signal: this.signal })];
            case 4:
              response = _c.sent();
              return [4 /*yield*/, processResponse(response)];
            case 5:
              (_b = _c.sent()), (data = _b.data), (responseError = _b.responseError);
              // avoid state updates when component has been unmounted
              if (this.signal.aborted) {
                return [2 /*return*/];
              }
              if (!response.ok || responseError) {
                error = {
                  message:
                    "Failed to fetch: " +
                    response.status +
                    " " +
                    response.statusText +
                    (responseError ? " - " + data : ""),
                  data: data,
                  status: response.status,
                };
                this.setState({
                  loading: false,
                  error: error,
                });
                if (!this.props.localErrorOnly && this.props.onError) {
                  this.props.onError(
                    error,
                    function() {
                      return _this.fetch(requestPath, thisRequestOptions);
                    },
                    response,
                  );
                }
                return [2 /*return*/, null];
              }
              return [4 /*yield*/, resolveData({ data: data, resolve: resolve })];
            case 6:
              resolved = _c.sent();
              if (!resolved.error && useCache) {
                setCache(internalCacheKey, resolved.data, cacheTimeout);
              }
              this.setState({ loading: false, data: resolved.data, error: resolved.error });
              return [2 /*return*/, data];
            case 7:
              e_1 = _c.sent();
              // avoid state updates when component has been unmounted
              if (this.signal.aborted) {
                return [2 /*return*/];
              }
              this.setState({
                loading: false,
                error: {
                  message: "Failed to fetch: " + e_1.message,
                  data: e_1,
                },
              });
              return [3 /*break*/, 8];
            case 8:
              return [2 /*return*/];
          }
        });
      });
    };
    if (typeof props.debounce === "object") {
      _this.fetch = debounce(_this.fetch, props.debounce.wait, props.debounce.options);
    } else if (typeof props.debounce === "number") {
      _this.fetch = debounce(_this.fetch, props.debounce);
    } else if (props.debounce) {
      _this.fetch = debounce(_this.fetch);
    }
    return _this;
  }
  ContextlessGet.prototype.componentDidMount = function() {
    if (!this.props.lazy) {
      this.fetch();
    }
  };
  ContextlessGet.prototype.componentDidUpdate = function(prevProps) {
    var base = prevProps.base,
      parentPath = prevProps.parentPath,
      path = prevProps.path,
      resolve = prevProps.resolve,
      queryParams = prevProps.queryParams;
    if (
      base !== this.props.base ||
      parentPath !== this.props.parentPath ||
      path !== this.props.path ||
      !isEqual(queryParams, this.props.queryParams) ||
      // both `resolve` props need to _exist_ first, and then be equivalent.
      (resolve && this.props.resolve && resolve.toString() !== this.props.resolve.toString())
    ) {
      if (!this.props.lazy) {
        this.fetch();
      }
    }
  };
  ContextlessGet.prototype.componentWillUnmount = function() {
    this.abortController.abort();
  };
  ContextlessGet.prototype.render = function() {
    var _this = this;
    var _a = this.props,
      children = _a.children,
      wait = _a.wait,
      path = _a.path,
      base = _a.base,
      parentPath = _a.parentPath;
    var _b = this.state,
      data = _b.data,
      error = _b.error,
      loading = _b.loading,
      response = _b.response;
    if (wait && data === null && !error) {
      return React.createElement(React.Fragment, null); // Show nothing until we have data.
    }
    return children(
      data,
      { loading: loading, error: error },
      {
        refetch: function() {
          return _this.fetch(undefined, undefined, true);
        },
      },
      { response: response, absolutePath: composeUrl(base, parentPath, path) },
    );
  };
  ContextlessGet.defaultProps = {
    base: "",
    parentPath: "",
    resolve: function(unresolvedData) {
      return unresolvedData;
    },
    useCache: false,
    cacheMode: "ONLY",
    cacheTimeout: 0,
    cacheKey: null,
  };
  return ContextlessGet;
})(React.Component);
/**
 * The <Get /> component _with_ context.
 * Context is used to compose path props,
 * and to maintain the base property against
 * which all requests will be made.
 *
 * We compose Consumers immediately with providers
 * in order to provide new `parentPath` props that contain
 * a segment of the path, creating composable URLs.
 */
function Get(props) {
  return React.createElement(RestfulReactConsumer, null, function(contextProps) {
    return React.createElement(
      RestfulReactProvider,
      __assign({}, contextProps, { parentPath: composePath(contextProps.parentPath, props.path) }),
      React.createElement(
        ContextlessGet,
        __assign({}, contextProps, props, { __internal_hasExplicitBase: Boolean(props.base) }),
      ),
    );
  });
}
export default Get;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0dldC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLG9CQUFvQixFQUFFLEVBQWlCLG9CQUFvQixFQUE2QixNQUFNLFdBQVcsQ0FBQztBQUNqSCxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBZ0tqRDs7OztHQUlHO0FBQ0g7SUFBMEQsa0NBR3pEO0lBQ0Msd0JBQVksS0FBNEQ7UUFBeEUsWUFDRSxrQkFBTSxLQUFLLENBQUMsU0FTYjtRQUVEOztXQUVHO1FBQ0sscUJBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ3hDLFlBQU0sR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUU3QixXQUFLLEdBQXNDO1lBQ3pELElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDekIsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDO1FBc0NLLHVCQUFpQixHQUFHLFVBQ3pCLFlBQW1DLEVBQ25DLFlBQWtE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
