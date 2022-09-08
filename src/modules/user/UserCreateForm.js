/* eslint-disable react/prop-types */
import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import CONSTANT from '../../constants/enum';
import { TribeBlastSelect } from '../../components/select/Select';
import Dropzone from '../../components/dropzone/Dropzone';
import Iconify from '../../components/Iconify';

const UserCreateForm = ({ onSubmit, initialValues, id }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [userName, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const UserSchema = Yup.object().shape({
    // userName: Yup.string().required('Username is required.'),
    // email: Yup.string().email('Email must be a valid email address.').required('Email is required.'),
    // password: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const response = await onSubmit(values);

      setLoading(false);
      return !!response;
    },
    enableReinitialize: true,
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue, setFieldError } = formik;
  const handleChangeDropzone = (name) => (value) => {
    setFieldValue(name, value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  return (
    <FormikProvider value={formik}>
      <Typography px={2} variant="h4" gutterBottom>
        Thêm nhân viên
      </Typography>
      <Grid container px={2} mt={2}>
        <Grid item xs={12}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                disabled={!!id}
                fullWidth
                type="text"
                label="Họ và tên"
                {...getFieldProps('name')}
                error={Boolean(touched.email && errors.email)}
                helpertext={touched.email && errors.email}
              />
              <TextField
                fullWidth
                type="number"
                label="Số điện thoại"
                {...getFieldProps('phone')}
                error={Boolean(touched.phone && errors.phone)}
                helpertext={touched.phone && errors.phone}
              />
              <TextField
                fullWidth
                type="text"
                label="Tên đăng nhập"
                {...getFieldProps('userName')}
                error={Boolean(touched.userName && errors.userName)}
                helpertext={touched.userName && errors.userName}
              />
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Mật khẩu"
                {...getFieldProps('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helpertext={touched.password && errors.password}
              />
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Nhập lại mật khẩu"
                {...getFieldProps('repassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.repassword && errors.repassword)}
                helpertext={touched.repassword && errors.repassword}
              />

              <TribeBlastSelect
                label="Vai trò"
                error={Boolean(touched.role && errors.role)}
                helpertext={touched.role && errors.role}
                {...getFieldProps('role')}
                children={[
                  {
                    label: CONSTANT.UserRole.STAFF,
                    value: CONSTANT.UserRole.STAFF,
                  },
                  {
                    label: CONSTANT.UserRole.ADMIN,
                    value: CONSTANT.UserRole.ADMIN,
                  },
                ]}
              />

              <Dropzone
                name={'avatarImage'}
                error={touched?.avatarImage && Boolean(errors?.avatarImage || false)}
                errorText={errors?.avatarImage}
                handleUpload={handleChangeDropzone('avatarImage')}
                {...getFieldProps('avatar')}
                placeholder={'Ảnh đại diện'}
              />
            </Stack>
            <LoadingButton type="submit" style={{ marginTop: 20 }} loading={loading} variant="contained" size="large">
              Lưu
            </LoadingButton>
          </Form>
        </Grid>
      </Grid>
    </FormikProvider>
  );
};

export default UserCreateForm;
