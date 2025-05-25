# Zustand State Management

This directory contains the Zustand state management stores for the application.

## What is Zustand?

Zustand is a small, fast, and scalable state management solution. It's designed to be simple to use while offering powerful capabilities.

## Project Structure

```
store/
├── useCounterStore.js   # Basic example store (counter)
├── useUserStore.js      # More complex example store (user management)
└── README.md            # Documentation (this file)
```

## Basic Usage

### Creating a Store

```js
import { create } from "zustand";

const useStore = create(set => ({
  // State
  count: 0,

  // Actions
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 }))
}));

export default useStore;
```

### Using a Store in Components

```jsx
import useStore from "../store/useStore";

function Counter() {
  // Use the store directly
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

## Advantages of Zustand

1. **Minimal Boilerplate**: No reducers, actions, or dispatchers needed
2. **No Context Provider Required**: Access stores directly
3. **Automatic Performance Optimization**: Components only re-render when their subscribed state changes
4. **TypeScript Support**: Built-in type inference
5. **Middleware Support**: Devtools, persist, immer, etc.
6. **Small Package Size**: Lightweight with minimal dependencies

## Demo

Check out the Zustand demo at `/zustand-demo` to see these stores in action.
