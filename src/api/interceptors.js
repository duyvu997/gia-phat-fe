// import axios from 'axios';
// import { logoutAction, setAuthState } from 'state/auth/reducer';
// import store from '../state/index';
// import apiConfig from './config';

// const newInstance = axios.create();
// const handleRefreshToken = async () => {
//   try {
//     const { auth } = store.getState();
//     const response = await newInstance({
//       url: `${apiConfig.API.AUTH_SERVICE}/refresh-tokens`,
//       method: 'post',
//       data: {
//         refreshToken: auth?.refresh?.token,
//       },
//     });
//     const { data } = response;
//     store.dispatch(
//       setAuthState({
//         ...data,
//       })
//     );
//     return data;
//   } catch (error) {
//     store.dispatch(logoutAction());
//     return null;
//   }
// };
// // Add a request interceptor
// axios.interceptors.request.use(
//   async (config) => {
//     const newConfig = { ...config };
//     const { auth } = store.getState();
//     const token = auth?.access?.token;
//     if (token) {
//       if (newConfig.hasToken) {
//         newConfig.headers.Authorization = `Bearer ${token}`;
//         const accessExpiredTime = new Date(auth?.access?.expires).getTime();
//         const refreshExpiredTime = new Date(auth?.refresh?.expires).getTime();
//         const now = Date.now();
//         if (accessExpiredTime < now && now < refreshExpiredTime) {
//           const response = await handleRefreshToken().catch((error) => {
//             console.log('error', error);
//           });
//           if (response) newConfig.headers.Authorization = `Bearer ${response?.access?.token}`;
//         }
//         if (now > refreshExpiredTime) {
//           store.dispatch(logoutAction());
//         }
//       }
//     }

//     return newConfig;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
