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
var __spread =
  (this && this.__spread) ||
  function() {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
  };
var _this = this;
import { pascal } from "case";
import chalk from "chalk";
import openApiValidator from "ibm-openapi-validator";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import isEmpty from "lodash/isEmpty";
import uniq from "lodash/uniq";
import swagger2openapi from "swagger2openapi";
import YAML from "yamljs";
/**
 * Discriminator helper for `ReferenceObject`
 *
 * @param property
 */
export var isReference = function(property) {
  return Boolean(property.$ref);
};
/**
 * Return the typescript equivalent of open-api data type
 *
 * @param item
 * @ref https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#data-types
 */
export var getScalar = function(item) {
  switch (item.type) {
    case "int32":
    case "int64":
    case "number":
    case "integer":
    case "long":
    case "float":
    case "double":
      return "number";
    case "boolean":
      return "boolean";
    case "array":
      return getArray(item);
    case "object":
      return getObject(item);
    case "string":
      return item.enum ? '"' + item.enum.join('" | "') + '"' : "string";
    case "byte":
    case "binary":
    case "date":
    case "dateTime":
    case "date-time":
    case "password":
      return "string";
    default:
      return getObject(item);
  }
};
/**
 * Return the output type from the $ref
 *
 * @param $ref
 */
export var getRef = function($ref) {
  if ($ref.startsWith("#/components/schemas")) {
    return pascal($ref.replace("#/components/schemas/", ""));
  } else if ($ref.startsWith("#/components/responses")) {
    return pascal($ref.replace("#/components/responses/", "")) + "Response";
  } else if ($ref.startsWith("#/components/parameters")) {
    return pascal($ref.replace("#/components/parameters/", "")) + "Parameter";
  } else if ($ref.startsWith("#/components/requestBodies")) {
    return pascal($ref.replace("#/components/requestBodies/", "")) + "RequestBody";
  } else {
    throw new Error("This library only resolve $ref that are include into `#/components/*` for now");
  }
};
/**
 * Return the output type from an array
 *
 * @param item item with type === "array"
 */
export var getArray = function(item) {
  if (item.items) {
    if (!isReference(item.items) && (item.items.oneOf || item.items.allOf)) {
      return "(" + resolveValue(item.items) + ")[]";
    } else {
      return resolveValue(item.items) + "[]";
    }
  } else {
    throw new Error("All arrays must have an `items` key define");
  }
};
/**
 * Return the output type from an object
 *
 * @param item item with type === "object"
 */
export var getObject = function(item) {
  if (isReference(item)) {
    return getRef(item.$ref);
  }
  if (item.allOf) {
    return item.allOf.map(resolveValue).join(" & ");
  }
  if (item.oneOf) {
    return item.oneOf.map(resolveValue).join(" | ");
  }
  if (item.properties) {
    return (
      "{" +
      Object.entries(item.properties)
        .map(function(_a) {
          var _b = __read(_a, 2),
            key = _b[0],
            prop = _b[1];
          var isRequired = (item.required || []).includes(key);
          return "" + key + (isRequired ? "" : "?") + ": " + resolveValue(prop);
        })
        .join("; ") +
      "}"
    );
  }
  if (item.additionalProperties) {
    return "{[key: string]: " + resolveValue(item.additionalProperties) + "}";
  }
  return item.type === "object" ? "{}" : "any";
};
/**
 * Resolve the value of a schema object to a proper type definition.
 * @param schema
 */
export var resolveValue = function(schema) {
  return isReference(schema) ? getRef(schema.$ref) : getScalar(schema);
};
/**
 * Extract responses / request types from open-api specs
 *
 * @param responsesOrRequests reponses or requests object from open-api specs
 */
export var getResReqTypes = function(responsesOrRequests) {
  return uniq(
    responsesOrRequests.map(function(_a) {
      var _b = __read(_a, 2),
        _ = _b[0],
        res = _b[1];
      if (!res) {
        return "void";
      }
      if (isReference(res)) {
        return getRef(res.$ref);
      } else {
        if (res.content && res.content["application/json"]) {
          var schema = res.content["application/json"].schema;
          return resolveValue(schema);
        } else if (res.content && res.content["application/octet-stream"]) {
          var schema = res.content["application/octet-stream"].schema;
          return resolveValue(schema);
        } else {
          return "void";
        }
      }
    }),
  ).join(" | ");
};
/**
 * Return every params in a path
 *
 * @example
 * ```
 * getParamsInPath("/pet/{category}/{name}/");
 * // => ["category", "name"]
 * ```
 * @param path
 */
export var getParamsInPath = function(path) {
  var n;
  var output = [];
  var templatePathRegex = /\{(\w+)}/g;
  // tslint:disable-next-line:no-conditional-assignment
  while ((n = templatePathRegex.exec(path)) !== null) {
    output.push(n[1]);
  }
  return output;
};
/**
 * Import and parse the openapi spec from a yaml/json
 *
 * @param data raw data of the spec
 * @param format format of the spec
 */
var importSpecs = function(data, extension) {
  var schema = extension === "yaml" ? YAML.parse(data) : JSON.parse(data);
  return new Promise(function(resolve, reject) {
    if (!schema.openapi || !schema.openapi.startsWith("3.0")) {
      swagger2openapi.convertObj(schema, {}, function(err, _a) {
        var openapi = _a.openapi;
        if (err) {
          reject(err);
        } else {
          resolve(openapi);
        }
      });
    } else {
      resolve(schema);
    }
  });
};
/**
 * Generate a restful-react component from openapi operation specs
 *
 * @param operation
 * @param verb
 * @param route
 * @param baseUrl
 * @param operationIds - List of `operationId` to check duplication
 */
export var generateRestfulComponent = function(operation, verb, route, operationIds, parameters, schemasComponents) {
  if (parameters === void 0) {
    parameters = [];
  }
  if (!operation.operationId) {
    throw new Error("Every path must have a operationId - No operationId set for " + verb + " " + route);
  }
  if (operationIds.includes(operation.operationId)) {
    throw new Error('"' + operation.operationId + '" is duplicated in your schema definition!');
  }
  operationIds.push(operation.operationId);
  route = route.replace(/\{/g, "${"); // `/pet/{id}` => `/pet/${id}`
  // Remove the last param of the route if we are in the DELETE case
  var lastParamInTheRoute;
  if (verb === "delete") {
    var lastParamInTheRouteRegExp = /\/\$\{(\w+)\}$/;
    lastParamInTheRoute = (route.match(lastParamInTheRouteRegExp) || [])[1];
    route = route.replace(lastParamInTheRouteRegExp, ""); // `/pet/${id}` => `/pet`
  }
  var componentName = pascal(operation.operationId);
  var Component = verb === "get" ? "Get" : "Mutate";
  var isOk = function(_a) {
    var _b = __read(_a, 1),
      statusCode = _b[0];
    return statusCode.toString().startsWith("2");
  };
  var isError = function(_a) {
    var _b = __read(_a, 1),
      statusCode = _b[0];
    return statusCode.toString().startsWith("4") || statusCode.toString().startsWith("5") || statusCode === "default";
  };
  var responseTypes = getResReqTypes(Object.entries(operation.responses).filter(isOk)) || "void";
  var errorTypes = getResReqTypes(Object.entries(operation.responses).filter(isError)) || "unknown";
  var requestBodyTypes = getResReqTypes([["body", operation.requestBody]]);
  var needAResponseComponent = responseTypes.includes("{");
  /**
   * We strip the ID from the URL in order to pass it as an argument to the
   * `delete` function for generated <DeleteResource /> components.
   *
   * For example:
   *
   *  A given request
   *    DELETE https://my.api/resource/123
   *
   *  Becomes
   *    <DeleteResource>
   *      {(deleteThisThing) => <Button onClick={() => deleteThisThing("123")}>DELETE IT</Button>}
   *    </DeleteResource>
   */
  var paramsInPath = getParamsInPath(route).filter(function(param) {
    return !(verb === "delete" && param === lastParamInTheRoute);
  });
  var _a = groupBy(
      __spread(parameters, operation.parameters || []).map(function(p) {
        if (isReference(p)) {
          return get(schemasComponents, p.$ref.replace("#/components/", "").replace("/", "."));
        } else {
          return p;
        }
      }),
      "in",
    ),
    _b = _a.query,
    queryParams = _b === void 0 ? [] : _b,
    _c = _a.path,
    pathParams = _c === void 0 ? [] : _c,
    _d = _a.header,
    headerParams = _d === void 0 ? [] : _d;
  var paramsTypes = paramsInPath
    .map(function(p) {
      try {
        var _a = pathParams.find(function(i) {
            return i.name === p;
          }),
          name_1 = _a.name,
          required = _a.required,
          schema = _a.schema;
        return "" + name_1 + (required ? "" : "?") + ": " + resolveValue(schema);
      } catch (err) {
        throw new Error("The path params " + p + " can't be found in parameters (" + operation.operationId + ")");
      }
    })
    .join("; ");
  var queryParamsType = queryParams
    .map(function(p) {
      return "" + p.name + (p.required ? "" : "?") + ": " + resolveValue(p.schema);
    })
    .join("; ");
  var genericsTypes =
    verb === "get"
      ? (needAResponseComponent ? componentName + "Response" : responseTypes) +
        ", " +
        errorTypes +
        ", " +
        (queryParamsType ? componentName + "QueryParams" : "void")
      : (needAResponseComponent ? componentName + "Response" : responseTypes) +
        ", " +
        errorTypes +
        ", " +
        (queryParamsType ? componentName + "QueryParams" : "void") +
        ", " +
        (verb === "delete" ? "string" : requestBodyTypes);
  var genericsTypesForHooksProps =
    verb === "get"
      ? (needAResponseComponent ? componentName + "Response" : responseTypes) +
        ", " +
        (queryParamsType ? componentName + "QueryParams" : "void")
      : (needAResponseComponent ? componentName + "Response" : responseTypes) +
        ", " +
        (queryParamsType ? componentName + "QueryParams" : "void");
  var output =
    "" +
    (needAResponseComponent
      ? "\nexport " +
        (responseTypes.includes("|")
          ? "type " + componentName + "Response ="
          : "interface " + componentName + "Response") +
        " " +
        responseTypes +
        "\n"
      : "") +
    (queryParamsType ? "\nexport interface " + componentName + "QueryParams {" + queryParamsType + "}\n" : "") +
    "\nexport type " +
    componentName +
    "Props = Omit<" +
    Component +
    "Props<" +
    genericsTypes +
    '>, "path"' +
    (verb === "get" ? "" : ' | "verb"') +
    ">" +
    (paramsInPath.length ? " & {" + paramsTypes + "}" : "") +
    ";\n\n" +
    (operation.summary ? "// " + operation.summary : "") +
    "\nexport const " +
    componentName +
    " = (" +
    (paramsInPath.length ? "{" + paramsInPath.join(", ") + ", ...props}" : "props") +
    ": " +
    componentName +
    "Props) => (\n  <" +
    Component +
    "<" +
    genericsTypes +
    ">" +
    (verb === "get" ? "" : '\n    verb="' + verb.toUpperCase() + '"') +
    "\n    path={`" +
    route +
    "`}\n    {...props}\n  />\n);\n\n";
  // Hooks version
  output +=
    "export type Use" +
    componentName +
    "Props = Omit<Use" +
    Component +
    "Props<" +
    genericsTypesForHooksProps +
    '>, "path"' +
    (verb === "get" ? "" : ' | "verb"') +
    ">" +
    (paramsInPath.length ? " & {" + paramsTypes + "}" : "") +
    ";\n\n" +
    (operation.summary ? "// " + operation.summary : "") +
    "\nexport const use" +
    componentName +
    " = (" +
    (paramsInPath.length ? "{" + paramsInPath.join(", ") + ", ...props}" : "props") +
    ": Use" +
    componentName +
    "Props) => use" +
    Component +
    "<" +
    genericsTypes +
    ">(" +
    (verb === "get" ? "" : '"' + verb.toUpperCase() + '", ') +
    "`" +
    route +
    "`, props);\n\n";
  if (
    headerParams
      .map(function(_a) {
        var name = _a.name;
        return name.toLocaleLowerCase();
      })
      .includes("prefer")
  ) {
    output +=
      "export type Poll" +
      componentName +
      "Props = Omit<PollProps<" +
      genericsTypes +
      '>, "path">' +
      (paramsInPath.length ? " & {" + paramsTypes + "}" : "") +
      ";\n\n" +
      (operation.summary ? "// " + (operation.summary + " (long polling)") : "") +
      "\nexport const Poll" +
      componentName +
      " = (" +
      (paramsInPath.length ? "{" + paramsInPath.join(", ") + ", ...props}" : "props") +
      ": Poll" +
      componentName +
      "Props) => (\n  <Poll<" +
      genericsTypes +
      ">\n    path={`" +
      route +
      "`}\n    {...props}\n  />\n);\n\n";
  }
  return output;
};
/**
 * Generate the interface string
 * A tslint comment is insert if the resulted object is empty
 *
 * @param name interface name
 * @param schema
 */
export var generateInterface = function(name, schema) {
  var scalar = getScalar(schema);
  var isEmptyObject = scalar === "{}";
  return isEmptyObject
    ? "// tslint:disable-next-line:no-empty-interface\nexport interface " + pascal(name) + " " + scalar
    : "export interface " + pascal(name) + " " + scalar;
};
/**
 * Extract all types from #/components/schemas
 *
 * @param schemas
 */
export var generateSchemasDefinition = function(schemas) {
  if (schemas === void 0) {
    schemas = {};
  }
  if (isEmpty(schemas)) {
    return "";
  }
  return (
    Object.entries(schemas)
      .map(function(_a) {
        var _b = __read(_a, 2),
          name = _b[0],
          schema = _b[1];
        return (!schema.type || schema.type === "object") && !schema.allOf && !schema.oneOf && !isReference(schema)
          ? generateInterface(name, schema)
          : "export type " + pascal(name) + " = " + resolveValue(schema) + ";";
      })
      .join("\n\n") + "\n"
  );
};
/**
 * Extract all types from #/components/responses
 *
 * @param responses
 */
export var generateResponsesDefinition = function(responses) {
  if (responses === void 0) {
    responses = {};
  }
  if (isEmpty(responses)) {
    return "";
  }
  return (
    "\n" +
    Object.entries(responses)
      .map(function(_a) {
        var _b = __read(_a, 2),
          name = _b[0],
          response = _b[1];
        var type = getResReqTypes([["", response]]);
        var isEmptyInterface = type === "{}";
        if (isEmptyInterface) {
          return (
            "// tslint:disable-next-line:no-empty-interface\nexport interface " + pascal(name) + "Response " + type
          );
        } else if (type.includes("{") && !type.includes("|") && !type.includes("&")) {
          return "export interface " + pascal(name) + "Response " + type;
        } else {
          return "export type " + pascal(name) + "Response = " + type + ";";
        }
      })
      .join("\n\n") +
    "\n"
  );
};
/**
 * Validate the spec with ibm-openapi-validator (with a custom pretty logger).
 *
 * @param schema openAPI spec
 */
var validate = function(schema) {
  return __awaiter(_this, void 0, void 0, function() {
    var log, wasConsoleLogCalledFromBlackBox, _a, errors, warnings;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          log = console.log;
          wasConsoleLogCalledFromBlackBox = false;
          console.log = function() {
            var props = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              props[_i] = arguments[_i];
            }
            wasConsoleLogCalledFromBlackBox = true;
            log.apply(void 0, __spread(props));
          };
          return [4 /*yield*/, openApiValidator(schema)];
        case 1:
          (_a = _b.sent()), (errors = _a.errors), (warnings = _a.warnings);
          console.log = log; // reset console.log because we're done with the black box
          if (wasConsoleLogCalledFromBlackBox) {
            log("More information: https://github.com/IBM/openapi-validator/#configuration");
          }
          if (warnings.length) {
            log(chalk.yellow("(!) Warnings"));
            warnings.forEach(function(i) {
              return log(chalk.yellow("\nMessage : " + i.message + "\nPath    : " + i.path));
            });
          }
          if (errors.length) {
            log(chalk.red("(!) Errors"));
            errors.forEach(function(i) {
              return log(chalk.red("\nMessage : " + i.message + "\nPath    : " + i.path));
            });
          }
          return [2 /*return*/];
      }
    });
  });
};
/**
 * Main entry of the generator. Generate restful-react component from openAPI.
 *
 * @param data raw data of the spec
 * @param format format of the spec
 * @param transformer custom function to transform your spec
 * @param validation validate the spec with ibm-openapi-validator tool
 */
var importOpenApi = function(data, format, transformer, validation) {
  if (validation === void 0) {
    validation = false;
  }
  return __awaiter(_this, void 0, void 0, function() {
    var operationIds, schema, output, haveGet, haveMutate, havePoll, imports;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          operationIds = [];
          return [4 /*yield*/, importSpecs(data, format)];
        case 1:
          schema = _a.sent();
          if (transformer) {
            schema = transformer(schema);
          }
          if (!validation) return [3 /*break*/, 3];
          return [4 /*yield*/, validate(schema)];
        case 2:
          _a.sent();
          _a.label = 3;
        case 3:
          output = "";
          output += generateSchemasDefinition(schema.components && schema.components.schemas);
          output += generateResponsesDefinition(schema.components && schema.components.responses);
          Object.entries(schema.paths).forEach(function(_a) {
            var _b = __read(_a, 2),
              route = _b[0],
              verbs = _b[1];
            Object.entries(verbs).forEach(function(_a) {
              var _b = __read(_a, 2),
                verb = _b[0],
                operation = _b[1];
              if (["get", "post", "patch", "put", "delete"].includes(verb)) {
                output += generateRestfulComponent(
                  operation,
                  verb,
                  route,
                  operationIds,
                  verbs.parameters,
                  schema.components,
                );
              }
            });
          });
          haveGet = Boolean(output.match(/<Get</));
          haveMutate = Boolean(output.match(/<Mutate</));
          havePoll = Boolean(output.match(/<Poll</));
          imports = [];
          if (haveGet) {
            imports.push("Get", "GetProps", "useGet", "UseGetProps");
          }
          if (haveMutate) {
            imports.push("Mutate", "MutateProps", "useMutate", "UseMutateProps");
          }
          if (havePoll) {
            imports.push("Poll", "PollProps");
          }
          output =
            '/* Generated by restful-react */\n\nimport React from "react";\nimport { ' +
            imports.join(", ") +
            ' } from "restful-react";\n\nexport type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;\n\n' +
            output;
          return [2 /*return*/, output];
      }
    });
  });
};
export default importOpenApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LW9wZW4tYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdHMvaW1wb3J0LW9wZW4tYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkF5a0JBO0FBemtCQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLGdCQUFnQixNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sR0FBRyxNQUFNLFlBQVksQ0FBQztBQUM3QixPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLElBQUksTUFBTSxhQUFhLENBQUM7QUFjL0IsT0FBTyxlQUFlLE1BQU0saUJBQWlCLENBQUM7QUFFOUMsT0FBTyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBRTFCOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsSUFBTSxXQUFXLEdBQUcsVUFBQyxRQUFhO0lBQ3ZDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBRyxVQUFDLElBQWtCO0lBQzFDLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNqQixLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssT0FBTyxDQUFDO1FBQ2IsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFNBQVMsQ0FBQztRQUNmLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLFFBQVE7WUFDWCxPQUFPLFFBQVEsQ0FBQztRQUVsQixLQUFLLFNBQVM7WUFDWixPQUFPLFNBQVMsQ0FBQztRQUVuQixL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
