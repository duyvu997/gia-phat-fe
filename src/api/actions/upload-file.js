import API from '../index';
import config from '../config';

export const uploadFiles = async (file) => {
  try {
    const formdata = new FormData();

    formdata.append('files', file);
    const response = await API({
      // url: `${config.API.FILE_SERVICE}/upload`,
      url: 'http://123.57.227.214:3003/api/uploads',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhODU5OTM0ZS1lNzNlLTQzNTQtOTAzNC0yN2ExYmNlZjM4OTUiLCJyb2xlIjoib3JnYW5pemVyIiwiaWF0IjoxNjYzMjQ0MTQzLCJleHAiOjE2NjU4MzYxNDN9.P4I7ZiX2rU1LF1F553rHvTdNGYeXsCP4IRkVumo7G-M',
      },
      method: 'post',
      data: formdata,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
