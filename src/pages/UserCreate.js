import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import UserCreateForm from '../modules/user/UserCreateForm';
import { routesString } from '../constants/config';
import { updateUserAction, createUserAction, fetchUserById } from '../api/actions/user';
import { uploadFiles } from '../api/actions/upload-file';

const UserCreate = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(!!id);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      if (id) {
        const user = await fetchUserById(id);

        setData(user);
      }

      setIsLoading(false);
    })();
  }, [id]);

  const handleSave = async (data) => {
    try {
      const { avatarImage } = data;
      const url = avatarImage && (await uploadFiles(avatarImage));
      const mappedData = {
        username: data.userName,
        password: data.password,
        first_name: data.name,
        last_name: '',
        full_name: '',
        phone: data.phone,
        birthday: data.birthday,
        role: data.role === 'STAFF' ? 'staff' : 'admin',
        joined_date: new Date(),
        avatar: url,
      };

      await (id ? updateUserAction(id, mappedData) : createUserAction(mappedData));

      enqueueSnackbar('Successfully!', {
        variant: 'success',
      });
      navigate(routesString.USERS);
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.errors || error?.response?.data?.message || error?.message, {
        variant: 'error',
      });
    }
  };

  const initialValues = useMemo(
    () => ({
      name: data?.first_name,
      phone: data?.phone,
      userName: data?.username,
      password: '',
      repassword: '',
      role: data?.role === 'admin' ? 'ADMIN' : 'STAFF',
      avatar: data?.avatar,
    }),
    [data]
  );
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <UserCreateForm
      onSubmit={handleSave}
      id={id}
      initialValues={initialValues}
    />
  );
};

export default UserCreate;
