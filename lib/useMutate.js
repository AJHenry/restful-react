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
import merge from "lodash/merge";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Context } from "./Context";
import { resolvePath } from "./useGet";
import { processResponse } from "./util/processResponse";
export function useMutate() {
  var _this = this;
  var props =
    typeof arguments[0] === "object"
      ? arguments[0]
      : __assign({}, arguments[2], { path: arguments[1], verb: arguments[0] });
  var context = useContext(Context);
  var verb = props.verb,
    _a = props.base,
    base = _a === void 0 ? context.base : _a,
    path = props.path,
    queryParams = props.queryParams,
    resolve = props.resolve;
  var isDelete = verb === "DELETE";
  var _b = __read(
      useState({
        error: null,
        loading: false,
      }),
      2,
    ),
    state = _b[0],
    setState = _b[1];
  var abortController = useRef(new AbortController());
  // Cancel the fetch on unmount
  useEffect(function() {
    return function() {
      return abortController.current.abort();
    };
  }, []);
  var mutate = useCallback(
    function(body, mutateRequestOptions) {
      return __awaiter(_this, void 0, void 0, function() {
        var signal,
          propsRequestOptions,
          contextRequestOptions,
          options,
          request,
          response,
          e_1,
          error,
          _a,
          rawData,
          responseError,
          data,
          error_1,
          error_2;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if (state.error || !state.loading) {
                setState(function(prevState) {
                  return __assign({}, prevState, { loading: true, error: null });
                });
              }
              if (state.loading) {
                // Abort previous requests
                abortController.current.abort();
                abortController.current = new AbortController();
              }
              signal = abortController.current.signal;
              propsRequestOptions =
                (typeof props.requestOptions === "function" ? props.requestOptions() : props.requestOptions) || {};
              contextRequestOptions =
                (typeof context.requestOptions === "function" ? context.requestOptions() : context.requestOptions) ||
                {};
              options = {
                method: verb,
                headers: {
                  "content-type": typeof body === "object" ? "application/json" : "text/plain",
                },
              };
              if (!isDelete) {
                options.body = typeof body === "object" ? JSON.stringify(body) : body;
              }
              request = new Request(
                resolvePath(base, isDelete ? path + "/" + body : path, queryParams),
                merge({}, contextRequestOptions, options, propsRequestOptions, mutateRequestOptions, {
                  signal: signal,
                }),
              );
              _b.label = 1;
            case 1:
              _b.trys.push([1, 3, , 4]);
              return [4 /*yield*/, fetch(request)];
            case 2:
              response = _b.sent();
              return [3 /*break*/, 4];
            case 3:
              e_1 = _b.sent();
              error = {
                message: "Failed to fetch: " + e_1.message,
                data: "",
              };
              setState({
                error: error,
                loading: false,
              });
              if (!props.localErrorOnly && context.onError) {
                context.onError(error, function() {
                  return mutate(body, mutateRequestOptions);
                });
              }
              throw error;
            case 4:
              return [4 /*yield*/, processResponse(response)];
            case 5:
              (_a = _b.sent()), (rawData = _a.data), (responseError = _a.responseError);
              try {
                data = resolve ? resolve(rawData) : rawData;
              } catch (e) {
                error_1 = {
                  data: e.message,
                  message: "Failed to resolve: " + e.message,
                };
                setState(function(prevState) {
                  return __assign({}, prevState, { error: error_1, loading: false });
                });
                throw e;
              }
              if (signal.aborted) {
                return [2 /*return*/];
              }
              if (!response.ok || responseError) {
                error_2 = {
                  data: data,
                  message: "Failed to fetch: " + response.status + " " + response.statusText,
                  status: response.status,
                };
                setState(function(prevState) {
                  return __assign({}, prevState, { error: error_2, loading: false });
                });
                if (!props.localErrorOnly && context.onError) {
                  context.onError(
                    error_2,
                    function() {
                      return mutate(body);
                    },
                    response,
                  );
                }
                throw error_2;
              }
              setState(function(prevState) {
                return __assign({}, prevState, { loading: false });
              });
              return [2 /*return*/, data];
          }
        });
      });
    },
    [context.base, context.requestOptions, context.resolve, state.error, state.loading, path],
  );
  return __assign({}, state, {
    mutate: mutate,
    cancel: function() {
      setState(function(prevState) {
        return __assign({}, prevState, { loading: false });
      });
      abortController.current.abort();
      abortController.current = new AbortController();
    },
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlTXV0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VzZU11dGF0ZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFDakMsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDN0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVwQyxPQUFPLEVBQVEsV0FBVyxFQUFlLE1BQU0sVUFBVSxDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQStCekQsTUFBTSxVQUFVLFNBQVM7SUFBekIsaUJBNklDO0lBdklDLElBQU0sS0FBSyxHQUNULE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBTSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUM7SUFFaEgsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLElBQUEsaUJBQUksRUFBRSxlQUFtQixFQUFuQix3Q0FBbUIsRUFBRSxpQkFBSSxFQUFFLCtCQUFXLEVBQUUsdUJBQU8sQ0FBVztJQUN4RSxJQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssUUFBUSxDQUFDO0lBRTdCLElBQUE7OztVQUdKLEVBSEssYUFBSyxFQUFFLGdCQUdaLENBQUM7SUFFSCxJQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxlQUFlLEVB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
