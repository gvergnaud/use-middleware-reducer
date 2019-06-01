import * as React from 'react'

export type Dispatch = (action: any) => any

export type MiddlewareAPI<A> = { getState: () => A; dispatch: Dispatch }

export type Middleware<A> = (
  api: MiddlewareAPI<A>
) => (next: Dispatch) => Dispatch

export const useMiddlewareReducer = <A, B>(
  reducer: (state: A | undefined, action: B) => A,
  initialState: A,
  middlewares: Middleware<A>[] = []
): [A, Dispatch] => {
  const [state, setState] = React.useState(initialState)
  const stateRef = React.useRef(state)

  const dispatch = React.useMemo(() => {
    let dispatch: Dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }

    const middlewareAPI = {
      getState: () => stateRef.current,
      dispatch: action => dispatch(action)
    }

    const localDispatch = action =>
      setState(state => {
        const newState = reducer(state, action)
        stateRef.current = newState
        return newState
      })

    dispatch = middlewares
      .map(middleware => middleware(middlewareAPI))
      .reduceRight((acc, middleware) => middleware(acc), localDispatch)

    return dispatch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [state, dispatch]
}

export default useMiddlewareReducer
