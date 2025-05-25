import { create } from "zustand";

/**
 * User store that demonstrates a more complex Zustand store
 * - Multiple state properties
 * - More complex actions
 * - Using previous state
 */
const useUserStore = create(set => ({
  // State
  user: null,
  isLoading: false,
  error: null,

  // Actions
  login: userData => {
    // First set loading state
    set({ isLoading: true, error: null });

    // Simulate API call (would be async in real app)
    setTimeout(() => {
      set({
        user: userData,
        isLoading: false
      });
    }, 1000);
  },

  logout: () => {
    set({ user: null });
  },

  updateProfile: updates => {
    set(state => ({
      user: state.user ? { ...state.user, ...updates } : null
    }));
  },

  setError: errorMessage => {
    set({ error: errorMessage, isLoading: false });
  }
}));

export default useUserStore;
