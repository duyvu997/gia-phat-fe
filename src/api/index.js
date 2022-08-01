import axios from 'axios';
import { stringify, parse } from 'query-string';

import './config';
import './interceptors';

export const API_ERROR_MESSAGE_GENERAL = 'Oops. Something wrong happened';
export const ERROR_MESSAGE_NO_NETWORK = 'OFFLINE_MESSAGE';
let isOnline = true;

if (typeof window !== 'undefined') {
  isOnline = window.navigator.onLine;
  window.addEventListener('offline', () => {
    isOnline = false;
  });

  window.addEventListener('online', () => {
    isOnline = true;
  });
}

axios.interceptors.request.use(
  async (config) => {
    let token;
    const authStringify = window.localStorage.getItem('auth');

    if (authStringify) {
      const {
        state: {
          access: { token: userToken },
        },
      } = JSON.parse(authStringify) || {};

      token = userToken;
    }

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const API = async ({ url, params = '', method = 'get', headers = {}, data = '', cancelTokenSource, ...props }) => {
  const newParams = parse(stringify(params, { arrayFormat: 'comma' }));
  try {
    const response = await axios({
      method,
      url,
      headers: {
        ...headers,
      },
      ...props,
      params: newParams,
      data,
      cancelToken: cancelTokenSource?.token,
    });

    return response && response.data;
  } catch (error) {
    if (isOnline) {
      throw error;
    } else {
      const offlineResponse = {
        response: {
          data: {
            error: {
              message: ERROR_MESSAGE_NO_NETWORK,
            },
          },
        },
      };

      throw offlineResponse;
    }
  }
};

export default API;
