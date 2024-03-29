/* eslint-disable react/prop-types */
import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import CONSTANT from '../../constants/enum';
import { CustomSelect } from '../../components/select/Select';
import Dropzone from '../../components/dropzone/Dropzone';
import Iconify from '../../components/Iconify';

function CustomTextField({ helpertext, ...props }) {
  return <TextField {...props} helperText={helpertext} />;
}

const UserCreateForm = ({ onSubmit, initialValues, id }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const UserSchema = Yup.object().shape({
    name: Yup.string().required('name is required.'),
    userName: Yup.string().required('username is required.'),
    phone: Yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
    password: Yup.string(),
    repassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match'),
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

  const handleShowRePassword = () => {
    setShowRePassword((show) => !show);
  };

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;
  const handleChangeDropzone = (name) => (value) => {
    setFieldValue(name, value);
  };

  return (
    <FormikProvider value={formik}>
      <Typography px={2} variant="h4" gutterBottom>
        Thêm nhân viên
      </Typography>
      <Grid container spacing={2} px={2} mt={2}>
        <Grid item xs={6} md={4}>
          <Dropzone
            name={'avatarImage'}
            error={touched?.avatarImage && Boolean(errors?.avatarImage || false)}
            errorText={errors?.avatarImage}
            handleUpload={handleChangeDropzone('avatarImage')}
            {...getFieldProps('avatar')}
            placeholder={'Ảnh đại diện'}
            defaultValue={getFieldProps('avatar').value}
          />
        </Grid>
        <Grid item xs={6} md={8}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <CustomTextField
                fullWidth
                type="text"
                label="Họ và tên"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helpertext={touched.name && errors.name}
              />
              <CustomTextField
                fullWidth
                type="text"
                label="Số điện thoại"
                {...getFieldProps('phone')}
                error={Boolean(touched.phone && errors.phone)}
                helpertext={touched.phone && errors.phone}
              />
              <CustomTextField
                disabled={!!id}
                fullWidth
                type="text"
                label="Tên đăng nhập"
                {...getFieldProps('userName')}
                error={Boolean(touched.userName && errors.userName)}
                helpertext={touched.userName && errors.userName}
              />
              {!id && (
                <CustomTextField
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
              )}
              {!id && (
                <CustomTextField
                  disabled={!!id}
                  fullWidth
                  type={showRePassword ? 'text' : 'password'}
                  label="Nhập lại mật khẩu"
                  {...getFieldProps('repassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowRePassword} edge="end">
                          <Iconify icon={showRePassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.repassword && errors.repassword)}
                  helpertext={touched.repassword && errors.repassword}
                />
              )}
              <CustomSelect
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

              <CustomTextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="date"
                label="Ngày vào làm"
                {...getFieldProps('joinedDate')}
                error={Boolean(touched.joinedDate && errors.joinedDate)}
                helpertext={touched.joinedDate && errors.joinedDate}
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
