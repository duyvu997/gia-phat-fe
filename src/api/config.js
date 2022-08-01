const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003';

const config = {
  API: {
    AUTH_SERVICE: '/login',
    USER_SERVICE: '/users',
  },
};

Object.keys(config.API).forEach((item) => {
  config.API[item] = REACT_APP_API_URL + config.API[item];
});

export default config;
