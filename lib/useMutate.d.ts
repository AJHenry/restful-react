import { MutateMethod, MutateState } from "./Mutate";
import { Omit, UseGetProps } from "./useGet";

export interface UseMutateProps<TData, TQueryParams>
  extends Omit<UseGetProps<TData, TQueryParams>, "lazy" | "debounce"> {
  /**
   * What HTTP verb are we using?
   */
  verb: "POST" | "PUT" | "PATCH" | "DELETE";
}

export interface UseMutateReturn<TData, TError, TRequestBody> extends MutateState<TData, TError> {
  /**
   * Cancel the current fetch
   */
  cancel: () => void;
  /**
   * Call the mutate endpoint
   */
  mutate: MutateMethod<TData, TRequestBody>;
}

export declare function useMutate<
  TData = any,
  TError = any,
  TQueryParams = {
    [key: string]: any;
  },
  TRequestBody = any
>(props: UseMutateProps<TData, TQueryParams>): UseMutateReturn<TData, TError, TRequestBody>;

export declare function useMutate<
  TData = any,
  TError = any,
  TQueryParams = {
    [key: string]: any;
  },
  TRequestBody = any
>(
  verb: UseMutateProps<TData, TQueryParams>["verb"],
  path: string,
  props?: Omit<UseMutateProps<TData, TQueryParams>, "path" | "verb">,
): UseMutateReturn<TData, TError, TRequestBody>;
// # sourceMappingURL=useMutate.d.ts.map
