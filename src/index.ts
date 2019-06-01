import * as React from 'react'

export const useMiddlewareReducer = <A, B>(
  reducer: (state: A | undefined, action: B) => A,
  initialState: A,
  middlewares: any[] = []
): [A, (action: any) => void] => {
  const [state, setState] = React.useState(initialState)
  const stateRef = React.useRef(state)

  const dispatch = React.useMemo(() => {
    let dispatch: ((...args: any[]) => void) = (...args: any[]) => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }
    const middlewareAPI = {
      getState: () => stateRef.current,
      dispatch: (...args) => dispatch(...args)
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
