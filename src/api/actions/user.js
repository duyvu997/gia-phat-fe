import API from '../index';
import config from '../config';

export const getUser = async (address) => {
  try {
    const user = await API({
      method: 'GET',
      url: `${config.API.USER_SERVICE}/${address}`,
    });
    return user;
  } catch (error) {
    return error;
  }
};

export const getSignExchangeToken = async (data) => {
  try {
    const result = await API({
      url: `${config.API.USER_SERVICE}/exchangeToken`,
      method: 'post',
      data,
      hasToken: true,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const fetchUsersAction = async (params) => {
  const response = await API({
    url: config.API.USER_SERVICE,
    params,
  });
  return response?.data;
};

export const fetchUserById = async (id) => {
  const response = await API({
    url: `${config.API.USER_SERVICE}/${id}`,
    method: 'GET',
  });
  return response?.data;
};

export const createUserAction = async (data) => {
  const response = await API({
    url: config.API.USER_SERVICE,
    data,
    method: 'post',
  });
  return response;
};

export const updateUserAction = async (id, data) => {
  const response = await API({
    url: `${config.API.USER_SERVICE}/${id}`,
    data,
    method: 'put',
  });
  return response;
};

export const deleteUserAction = async (id) => {
  const response = await API({
    url: `${config.API.USER_SERVICE}/${id}`,
    method: 'delete',
  });

  return response;
};

export const getMe = async () => {
  const response = await API({
    url: `${config.API.USER_SERVICE}/me`,
    method: 'get',
  });

  return response;
};
