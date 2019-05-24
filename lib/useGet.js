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
var __read =
  (this && this.__read) ||
  function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
      r,
      ar = [],
      e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
import debounce from "lodash/debounce";
import merge from "lodash/merge";
import qs from "qs";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import url from "url";
import { Context } from "./Context";
import { processResponse } from "./util/processResponse";
import { useDeepCompareEffect } from "./util/useDeepCompareEffect";
export function resolvePath(base, path, queryParams) {
  var appendedBase = base.endsWith("/") ? base : base + "/";
  var trimmedPath = path.startsWith("/") ? path.slice(1) : path;
  return url.resolve(appendedBase, queryParams ? trimmedPath + "?" + qs.stringify(queryParams) : trimmedPath);
}
function _fetchData(props, state, setState, context, abortController) {
  return __awaiter(this, void 0, void 0, function() {
    var _a,
      base,
      path,
      _b,
      resolve,
      queryParams,
      signal,
      requestOptions,
      contextRequestOptions,
      request,
      response,
      _c,
      data,
      responseError,
      error,
      e_1;
    return __generator(this, function(_d) {
      switch (_d.label) {
        case 0:
          (_a = props.base),
            (base = _a === void 0 ? context.base : _a),
            (path = props.path),
            (_b = props.resolve),
            (resolve =
              _b === void 0
                ? function(d) {
                    return d;
                  }
                : _b),
            (queryParams = props.queryParams);
          if (state.loading) {
            // Abort previous requests
            abortController.current.abort();
            abortController.current = new AbortController();
          }
          signal = abortController.current.signal;
          if (state.error || !state.loading) {
            setState(__assign({}, state, { error: null, loading: true }));
          }
          requestOptions =
            (typeof props.requestOptions === "function" ? props.requestOptions() : props.requestOptions) || {};
          contextRequestOptions =
            (typeof context.requestOptions === "function" ? context.requestOptions() : context.requestOptions) || {};
          request = new Request(
            resolvePath(base, path, queryParams),
            merge({}, contextRequestOptions, requestOptions, { signal: signal }),
          );
          _d.label = 1;
        case 1:
          _d.trys.push([1, 4, , 5]);
          return [4 /*yield*/, fetch(request)];
        case 2:
          response = _d.sent();
          return [4 /*yield*/, processResponse(response)];
        case 3:
          (_c = _d.sent()), (data = _c.data), (responseError = _c.responseError);
          if (signal.aborted) {
            return [2 /*return*/];
          }
          if (!response.ok || responseError) {
            error = {
              message:
                "Failed to fetch: " + response.status + " " + response.statusText + (responseError ? " - " + data : ""),
              data: data,
              status: response.status,
            };
            setState(__assign({}, state, { loading: false, error: error }));
            if (!props.localErrorOnly && context.onError) {
              context.onError(
                error,
                function() {
                  return _fetchData(props, state, setState, context, abortController);
                },
                response,
              );
            }
            return [2 /*return*/];
          }
          setState(__assign({}, state, { error: null, loading: false, data: resolve(data) }));
          return [3 /*break*/, 5];
        case 4:
          e_1 = _d.sent();
          setState(
            __assign({}, state, {
              loading: false,
              error: {
                message: "Failed to fetch: " + e_1.message,
                data: e_1.message,
              },
            }),
          );
          return [3 /*break*/, 5];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
var isCancellable = function(func) {
  return typeof func.cancel === "function" && typeof func.flush === "function";
};
export function useGet() {
  var props = typeof arguments[0] === "object" ? arguments[0] : __assign({}, arguments[1], { path: arguments[0] });
  var context = useContext(Context);
  var fetchData = useCallback(
    typeof props.debounce === "object"
      ? debounce(_fetchData, props.debounce.wait, props.debounce.options)
      : typeof props.debounce === "number"
      ? debounce(_fetchData, props.debounce)
      : props.debounce
      ? debounce(_fetchData)
      : _fetchData,
    [props.debounce],
  );
  // Cancel fetchData on unmount (if debounce)
  useEffect(
    function() {
      return isCancellable(fetchData)
        ? function() {
            return fetchData.cancel();
          }
        : undefined;
    },
    [fetchData],
  );
  var _a = __read(
      useState({
        data: null,
        response: null,
        loading: !props.lazy,
        error: null,
      }),
      2,
    ),
    state = _a[0],
    setState = _a[1];
  var abortController = useRef(new AbortController());
  useDeepCompareEffect(
    function() {
      if (!props.lazy) {
        fetchData(props, state, setState, context, abortController);
      }
      return function() {
        abortController.current.abort();
        abortController.current = new AbortController();
      };
    },
    [props.path, props.base, props.resolve, props.queryParams, props.requestOptions],
  );
  return __assign({}, state, {
    absolutePath: resolvePath(props.base || context.base, props.path, props.queryParams),
    cancel: function() {
      setState(__assign({}, state, { loading: false }));
      abortController.current.abort();
      abortController.current = new AbortController();
    },
    refetch: function(options) {
      if (options === void 0) {
        options = {};
      }
      return fetchData(__assign({}, props, options), state, setState, context, abortController);
    },
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlR2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VzZUdldC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFDakMsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3BCLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzdFLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQztBQUV0QixPQUFPLEVBQUUsT0FBTyxFQUE2QixNQUFNLFdBQVcsQ0FBQztBQUUvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFnRG5FLE1BQU0sVUFBVSxXQUFXLENBQWUsSUFBWSxFQUFFLElBQVksRUFBRSxXQUF5QjtJQUM3RixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFJLElBQUksTUFBRyxDQUFDO0lBQzVELElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUVoRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUksV0FBVyxTQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FB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
