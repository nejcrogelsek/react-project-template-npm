export declare type PayloadAction<P = void, T extends string = string, M = never, E = never> = {
  payload: P
  type?: T
} & ([M] extends [never]
  ? Record<string, unknown>
  : {
      meta: M
    }) &
  ([E] extends [never]
    ? Record<string, unknown>
    : {
        error: E
      })
