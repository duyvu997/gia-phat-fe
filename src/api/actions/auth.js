import API from '../index';
import config from '../config';

export const login = async (data) => {
  const response = await API({
    url: `${config.API.USER_SERVICE}/login/admin`,
    data,
    method: 'POST',
  });
  return response;
};
