import create from 'zustand';
import { routesString } from '../constants/config';
import { fetchUsersAction, getMe } from '../api/actions/user';

const useUserStore = create((set,) => ({
  users: [],
  me: {},
  isLoading: false,
  rebound: true,

  fetchUsers: async (params = {}) => {
    try {
      const response = await fetchUsersAction(params);
      set({ users: response });
    } catch (error) {
      throw error.message;
    }
  },
  setMe: (data) => {
    set({ me: data });
  },
  fetchMe: async () => {
    try {
      const response = await getMe();

      if (!response.data) {
        localStorage.clear();
        window.location.href = routesString.LOGIN;
      }

      set({ me: response.data });
    } catch (error) {
      throw error.message;
    }
  },
}));

export default useUserStore;
