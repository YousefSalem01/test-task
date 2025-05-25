import React from 'react';
import CounterDemo from '../components/CounterDemo';
import UserDemo from '../components/UserDemo';

/**
 * Page that demonstrates Zustand state management
 */
const ZustandDemo = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Zustand State Management Demo</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Counter Store</h2>
          <p className="mb-4 text-gray-700">
            This demonstrates a simple Zustand store with a single state property and basic actions.
          </p>
          <CounterDemo />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Complex User Store</h2>
          <p className="mb-4 text-gray-700">
            This demonstrates a more complex Zustand store with multiple state properties,
            async-like actions, and state updates based on previous state.
          </p>
          <UserDemo />
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">How Zustand Works</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">1. Create a Store</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto">
              {`import { create } from 'zustand'

const useStore = create((set) => ({
  // State
  count: 0,
  
  // Actions
  increment: () => set((state) => ({ 
    count: state.count + 1 
  })),
}))`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">2. Use the Store in Components</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto">
              {`function MyComponent() {
  // Use any part of the state
  const count = useStore((state) => state.count)
  const increment = useStore((state) => state.increment)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">3. Key Benefits</h3>
            <ul className="list-disc pl-6">
              <li>Minimal boilerplate compared to Redux</li>
              <li>No providers needed - stores are available anywhere</li>
              <li>Automatic performance optimization - only re-renders when selected state changes</li>
              <li>TypeScript friendly with built-in type inference</li>
              <li>Middleware support (devtools, persist, immer, etc.)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZustandDemo; 