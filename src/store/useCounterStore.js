import { create } from 'zustand';

/**
 * Counter store that demonstrates basic Zustand functionality
 * - State: count
 * - Actions: increment, decrement, reset
 */
const useCounterStore = create((set) => ({
  // State
  count: 0,
  
  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useCounterStore; 