import { Dispatch, Middleware } from './src/index'

export function useMiddlewareReducer<A, B>(
  reducer: (state: A | undefined, action: B) => A,
  initialState: A,
  middlewares: Middleware<A>[]
): [A, Dispatch]

export default useMiddlewareReducer
