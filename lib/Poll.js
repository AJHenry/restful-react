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
import merge from "lodash/merge";
import * as qs from "qs";
import * as React from "react";
import equal from "react-fast-compare";
import { RestfulReactConsumer } from "./Context";
import { composeUrl } from "./util/composeUrl";
import { processResponse } from "./util/processResponse";
/**
 * The <Poll /> component without context.
 */
var ContextlessPoll = /** @class */ (function(_super) {
  __extends(ContextlessPoll, _super);
  function ContextlessPoll() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      data: null,
      previousData: null,
      loading: !_this.props.lazy,
      lastResponse: null,
      polling: !_this.props.lazy,
      finished: false,
      error: null,
    };
    _this.keepPolling = !_this.props.lazy;
    /**
     * Abort controller to cancel the current fetch query
     */
    _this.abortController = new AbortController();
    _this.signal = _this.abortController.signal;
    _this.isModified = function(response, nextData) {
      if (response.status === 304) {
        return false;
      }
      if (equal(_this.state.data, nextData)) {
        return false;
      }
      return true;
    };
    _this.getRequestOptions = function() {
      return typeof _this.props.requestOptions === "function"
        ? _this.props.requestOptions()
        : _this.props.requestOptions || {};
    };
    // 304 is not a OK status code but is green in Chrome 🤦🏾‍♂️
    _this.isResponseOk = function(response) {
      return response.ok || response.status === 304;
    };
    /**
     * This thing does the actual poll.
     */
    _this.cycle = function() {
      return __awaiter(_this, void 0, void 0, function() {
        var _a,
          base,
          path,
          interval,
          wait,
          lastPollIndex,
          requestOptions,
          url,
          request,
          response_1,
          _b,
          data_1,
          responseError,
          error,
          e_1;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              // Have we stopped?
              if (!this.keepPolling) {
                return [2 /*return*/]; // stop.
              }
              if (!(this.props.until && this.props.until(this.state.data, this.state.lastResponse)))
                return [3 /*break*/, 2];
              return [4 /*yield*/, this.stop()];
            case 1:
              _c.sent(); // stop.
              return [2 /*return*/];
            case 2:
              (_a = this.props), (base = _a.base), (path = _a.path), (interval = _a.interval), (wait = _a.wait);
              lastPollIndex = this.state.lastPollIndex;
              requestOptions = this.getRequestOptions();
              url = composeUrl(base, "", path);
              if (this.props.queryParams) {
                url += "?" + qs.stringify(this.props.queryParams);
              }
              request = new Request(
                url,
                __assign({}, requestOptions, {
                  headers: __assign(
                    { Prefer: "wait=" + wait + "s;" + (lastPollIndex ? "index=" + lastPollIndex : "") },
                    requestOptions.headers,
                  ),
                }),
              );
              _c.label = 3;
            case 3:
              _c.trys.push([3, 7, , 8]);
              return [4 /*yield*/, fetch(request, { signal: this.signal })];
            case 4:
              response_1 = _c.sent();
              return [4 /*yield*/, processResponse(response_1)];
            case 5:
              (_b = _c.sent()), (data_1 = _b.data), (responseError = _b.responseError);
              if (!this.keepPolling || this.signal.aborted) {
                // Early return if we have stopped polling or component was unmounted
                // to avoid memory leaks
                return [2 /*return*/];
              }
              if (!this.isResponseOk(response_1) || responseError) {
                error = {
                  message:
                    "Failed to poll: " +
                    response_1.status +
                    " " +
                    response_1.statusText +
                    (responseError ? " - " + data_1 : ""),
                  data: data_1,
                  status: response_1.status,
                };
                this.setState({ loading: false, lastResponse: response_1, error: error });
                if (!this.props.localErrorOnly && this.props.onError) {
                  this.props.onError(
                    error,
                    function() {
                      return Promise.resolve();
                    },
                    response_1,
                  );
                }
              } else if (this.isModified(response_1, data_1)) {
                this.setState(function(prevState) {
                  return {
                    loading: false,
                    lastResponse: response_1,
                    previousData: prevState.data,
                    data: data_1,
                    error: null,
                    lastPollIndex: response_1.headers.get("x-polling-index") || undefined,
                  };
                });
              }
              // Wait for interval to pass.
              return [
                4 /*yield*/,
                new Promise(function(resolvePromise) {
                  return setTimeout(resolvePromise, interval);
                }),
              ];
            case 6:
              // Wait for interval to pass.
              _c.sent();
              this.cycle(); // Do it all again!
              return [3 /*break*/, 8];
            case 7:
              e_1 = _c.sent();
              return [3 /*break*/, 8];
            case 8:
              return [2 /*return*/];
          }
        });
      });
    };
    _this.start = function() {
      _this.keepPolling = true;
      if (!_this.state.polling) {
        _this.setState(function() {
          return { polling: true };
        }); // let everyone know we're done here.
      }
      _this.cycle();
    };
    _this.stop = function() {
      _this.keepPolling = false;
      _this.setState(function() {
        return { polling: false, finished: true };
      }); // let everyone know we're done here.
    };
    return _this;
  }
  ContextlessPoll.prototype.componentDidMount = function() {
    var _a = this.props,
      path = _a.path,
      lazy = _a.lazy;
    if (path === undefined) {
      throw new Error(
        '[restful-react]: You\'re trying to poll something without a path. Please specify a "path" prop on your Poll component.',
      );
    }
    if (!lazy) {
      this.start();
    }
  };
  ContextlessPoll.prototype.componentWillUnmount = function() {
    // Cancel the current query
    this.abortController.abort();
    // Stop the polling cycle
    this.stop();
  };
  ContextlessPoll.prototype.render = function() {
    var _a = this.state,
      response = _a.lastResponse,
      previousData = _a.previousData,
      data = _a.data,
      polling = _a.polling,
      loading = _a.loading,
      error = _a.error,
      finished = _a.finished;
    var _b = this.props,
      children = _b.children,
      base = _b.base,
      path = _b.path,
      resolve = _b.resolve;
    var meta = {
      response: response,
      absolutePath: composeUrl(base, "", path),
    };
    var states = {
      polling: polling,
      loading: loading,
      error: error,
      finished: finished,
    };
    var actions = {
      stop: this.stop,
      start: this.start,
    };
    // data is parsed only when poll has already resolved so response is defined
    var resolvedData = response && resolve ? resolve(data, previousData) : data;
    return children(resolvedData, states, actions, meta);
  };
  ContextlessPoll.defaultProps = {
    interval: 1000,
    wait: 60,
    base: "",
    resolve: function(data) {
      return data;
    },
  };
  return ContextlessPoll;
})(React.Component);
function Poll(props) {
  // Compose Contexts to allow for URL nesting
  return React.createElement(RestfulReactConsumer, null, function(contextProps) {
    var contextRequestOptions =
      typeof contextProps.requestOptions === "function"
        ? contextProps.requestOptions()
        : contextProps.requestOptions || {};
    var propsRequestOptions =
      typeof props.requestOptions === "function" ? props.requestOptions() : props.requestOptions || {};
    return React.createElement(
      ContextlessPoll,
      __assign({}, contextProps, props, { requestOptions: merge(contextRequestOptions, propsRequestOptions) }),
    );
  });
}
export default Poll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Qb2xsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQztBQUNqQyxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEtBQUssTUFBTSxvQkFBb0IsQ0FBQztBQUV2QyxPQUFPLEVBQWlCLG9CQUFvQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFrSnpEOztHQUVHO0FBQ0g7SUFBMkQsbUNBRzFEO0lBSEQ7UUFBQSxxRUFpTEM7UUE3S2lCLFdBQUssR0FBdUM7WUFDMUQsSUFBSSxFQUFFLElBQUk7WUFDVixZQUFZLEVBQUUsSUFBSTtZQUNsQixPQUFPLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDekIsWUFBWSxFQUFFLElBQUk7WUFDbEIsT0FBTyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQ3pCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDO1FBU00saUJBQVcsR0FBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRXZDOztXQUVHO1FBQ0sscUJBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ3hDLFlBQU0sR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUVyQyxnQkFBVSxHQUFHLFVBQUMsUUFBa0IsRUFBRSxRQUFlO1lBQ3ZELElBQUksUUFBUSxDQUFDLE1B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
