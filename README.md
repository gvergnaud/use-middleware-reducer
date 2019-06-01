# useMiddlewareReducer

An efficient react hook to benefit from the huge middleware ecosystem of [Redux](https://github.com/reduxjs/redux).

With this hook, you can use **any** Redux middleware inside one of your React component, without using Redux itself!

This package exports a [Typescript](https://github.com/Microsoft/TypeScript) type defintion.

## Installation

```
npm install use-middleware-reducer
```

or

```
yarn add use-middleware-reducer
```


## How to use

```tsx

import useMiddlewareReducer from 'use-middleware-reducer'
import logger from 'redux-logger'


const initialState = 0

const reducer = (state, action) => {
  if (action.type === 'INC') return state + 1
  if (action.type === 'DEC') return state - 1
}

const middleware = [
  logger
]

export function Counter() {
  const [state, dispatch] = useMiddlewareReducer(reducer, initialState, middleware)

  return (
    <>
      <p>{state}</p>
      <button onClick={() => dispatch({ type: 'INC' })}>+</button>
      <button onClick={() => dispatch({ type: 'DEC' })}>-</button>
    </>
  )
}
```


## See it in action

Code Sandbox demo: https://codesandbox.io/s/usemiddlewarereducer-example-otz3j