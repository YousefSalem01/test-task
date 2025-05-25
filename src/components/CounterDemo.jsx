import React from "react";
import useCounterStore from "../store/useCounterStore";

/**
 * Component that demonstrates using Zustand store
 */
const CounterDemo = () => {
  // Get state and actions from the store
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Counter: {count}</h2>

      <div className="flex gap-2">
        <button onClick={increment} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Increment
        </button>

        <button onClick={decrement} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Decrement
        </button>

        <button onClick={reset} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Reset
        </button>
      </div>
    </div>
  );
};

export default CounterDemo;
