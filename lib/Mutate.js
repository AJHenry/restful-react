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
import * as qs from "qs";
import * as React from "react";
import RestfulReactProvider, { RestfulReactConsumer } from "./Context";
import { composePath, composeUrl } from "./util/composeUrl";
import { processResponse } from "./util/processResponse";
/**
 * The <Mutate /> component without Context. This
 * is a named class because it is useful in
 * debugging.
 */
var ContextlessMutate = /** @class */ (function(_super) {
  __extends(ContextlessMutate, _super);
  function ContextlessMutate() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      loading: false,
      error: null,
    };
    /**
     * Abort controller to cancel the current fetch query
     */
    _this.abortController = new AbortController();
    _this.signal = _this.abortController.signal;
    _this.mutate = function(body, mutateRequestOptions) {
      return __awaiter(_this, void 0, void 0, function() {
        var _a,
          __internal_hasExplicitBase,
          base,
          parentPath,
          path,
          verb,
          providerRequestOptions,
          makeRequestPath,
          request,
          response,
          _b,
          data,
          responseError,
          error;
        var _this = this;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              (_a = this.props),
                (__internal_hasExplicitBase = _a.__internal_hasExplicitBase),
                (base = _a.base),
                (parentPath = _a.parentPath),
                (path = _a.path),
                (verb = _a.verb),
                (providerRequestOptions = _a.requestOptions);
              this.setState(function() {
                return { error: null, loading: true };
              });
              makeRequestPath = function() {
                var url;
                if (__internal_hasExplicitBase) {
                  url =
                    verb === "DELETE" && typeof body === "string"
                      ? composeUrl(base, "", composePath(path, body))
                      : composeUrl(base, "", path || "");
                } else {
                  url =
                    verb === "DELETE" && typeof body === "string"
                      ? composeUrl(base, parentPath, composePath(path, body))
                      : composeUrl(base, parentPath, path);
                }
                if (_this.props.queryParams) {
                  url += "?" + qs.stringify(_this.props.queryParams);
                }
                return url;
              };
              request = new Request(
                makeRequestPath(),
                __assign(
                  { method: verb, body: typeof body === "object" ? JSON.stringify(body) : body },
                  typeof providerRequestOptions === "function" ? providerRequestOptions() : providerRequestOptions,
                  mutateRequestOptions,
                  {
                    headers: __assign(
                      { "content-type": typeof body === "object" ? "application/json" : "text/plain" },
                      typeof providerRequestOptions === "function"
                        ? providerRequestOptions().headers
                        : (providerRequestOptions || {}).headers,
                      mutateRequestOptions ? mutateRequestOptions.headers : {},
                    ),
                  },
                ),
              );
              return [4 /*yield*/, fetch(request, { signal: this.signal })];
            case 1:
              response = _c.sent();
              return [4 /*yield*/, processResponse(response)];
            case 2:
              (_b = _c.sent()), (data = _b.data), (responseError = _b.responseError);
              // avoid state updates when component has been unmounted
              if (this.signal.aborted) {
                return [2 /*return*/];
              }
              if (!response.ok || responseError) {
                error = {
                  data: data,
                  message: "Failed to fetch: " + response.status + " " + response.statusText,
                  status: response.status,
                };
                this.setState({
                  error: error,
                  loading: false,
                });
                if (!this.props.localErrorOnly && this.props.onError) {
                  this.props.onError(
                    error,
                    function() {
                      return _this.mutate(body, mutateRequestOptions);
                    },
                    response,
                  );
                }
                throw error;
              }
              this.setState({ loading: false });
              return [2 /*return*/, data];
          }
        });
      });
    };
    return _this;
  }
  ContextlessMutate.prototype.componentWillUnmount = function() {
    this.abortController.abort();
  };
  ContextlessMutate.prototype.render = function() {
    var _a = this.props,
      children = _a.children,
      path = _a.path,
      base = _a.base,
      parentPath = _a.parentPath;
    var _b = this.state,
      error = _b.error,
      loading = _b.loading;
    return children(
      this.mutate,
      { loading: loading, error: error },
      { absolutePath: composeUrl(base, parentPath, path) },
    );
  };
  ContextlessMutate.defaultProps = {
    base: "",
    parentPath: "",
    path: "",
  };
  return ContextlessMutate;
})(React.Component);
/**
 * The <Mutate /> component _with_ context.
 * Context is used to compose path props,
 * and to maintain the base property against
 * which all requests will be made.
 *
 * We compose Consumers immediately with providers
 * in order to provide new `parentPath` props that contain
 * a segment of the path, creating composable URLs.
 */
function Mutate(props) {
  return React.createElement(RestfulReactConsumer, null, function(contextProps) {
    return React.createElement(
      RestfulReactProvider,
      __assign({}, contextProps, { parentPath: composePath(contextProps.parentPath, props.path) }),
      React.createElement(
        ContextlessMutate,
        __assign({}, contextProps, props, { __internal_hasExplicitBase: Boolean(props.base) }),
      ),
    );
  });
}
export default Mutate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXV0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL011dGF0ZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLG9CQUFvQixFQUFFLEVBQWlCLG9CQUFvQixFQUE2QixNQUFNLFdBQVcsQ0FBQztBQUVqSCxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQXFGekQ7Ozs7R0FJRztBQUNIO0lBQTJFLHFDQUcxRTtJQUhEO1FBQUEscUVBeUdDO1FBckdpQixXQUFLLEdBQXlDO1lBQzVELE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDO1FBUUY7O1dBRUc7UUFDSyxxQkFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDeEMsWUFBTSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBTXRDLFlBQU0sR0FBRyxVQUFPLElBQWtCLEVBQUUsb0JBQWtDOzs7Ozs7d0JBQ3JFLEtBT0YsSUFBSSxDQUFDLEtBQUssRUFOWiwwQkFBMEIsZ0NBQUEsRUFDMUIsSUFBSSxVQUFBLEVBQ0osVUFBVSxnQkFBQSxFQUNWLElBQUksVUFBQSxFQUNKLElBQUksVUFBQSxFQUNZLHNCQUFzQixvQkFBQSxDQUN6Qjt3QkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQU0sT0FBQSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO3dCQUVoRCxlQUFlLEdB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
