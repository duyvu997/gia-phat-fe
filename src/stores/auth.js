import create from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_STATE = {
  isLoading: false,
  rebound: true,
  access: {
    token: '',
    expires: '',
  },
  refresh: {
    token: '',
    expires: '',
  },
};

const useAuthStore = create(
  persist(
    (set,) => ({
      ...DEFAULT_STATE,
      setAuthState: (payload) => {
        set({
          ...payload,
        });
      },
      logOut: () => {
        set(DEFAULT_STATE);
      },
    }),
    {
      name: 'auth',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
