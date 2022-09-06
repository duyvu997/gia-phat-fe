/* eslint-disable react/prop-types */
import { LoadingButton } from '@mui/lab';
import { Button, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserRole } from '../../constants/enum';
import { TribeBlastSelect } from '../../components/select/Select';
import Dropzone from '../../components/dropzone/Dropzone';
import Iconify from '../../components/Iconify';

const UserCreateForm = ({ onSubmit, data, initialValues, id }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const UserSchema = Yup.object().shape({
    // userName: Yup.string().required('Username is required.'),
    // email: Yup.string().email('Email must be a valid email address.').required('Email is required.'),
    // password: Yup.string(),
    // walletAddress: Yup.string().required('Wallet address is required.'),
    // role: Yup.mixed().oneOf([UserRole.ADMIN, UserRole.PLAYER]).required('Role is required.'),
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

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue, setFieldError } = formik;
  const handleChangeDropzone = (name) => (value) => {
    setFieldValue(name, value);
  };
  return (
    <FormikProvider value={formik}>
      <Typography px={2} variant="h4" gutterBottom>
        Create User
      </Typography>
      <Grid container px={2} mt={2}>
        <Grid item xs={12}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                disabled={!!id}
                fullWidth
                autoComplete="email"
                type="text"
                label="Email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                autoComplete="userName"
                type="text"
                label="Username"
                {...getFieldProps('userName')}
                error={Boolean(touched.userName && errors.userName)}
                helperText={touched.userName && errors.userName}
              />
              <TextField
                fullWidth
                autoComplete="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
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
                helperText={touched.password && errors.password}
              />

              {/* <TribeBlastSelect
                label="Role"
                {...getFieldProps('role')}
                error={Boolean(touched.role && errors.role)}
                helperText={touched.role && errors.role}
                children={[
                  {
                    label: UserRole.PLAYER,
                    value: UserRole.PLAYER,
                  },
                  {
                    label: UserRole.ADMIN,
                    value: UserRole.ADMIN,
                  },
                ]}
              /> */}

              <TextField
                fullWidth
                disabled={!!id}
                autoComplete="walletAddress"
                type="text"
                label="Wallet address"
                {...getFieldProps('walletAddress')}
                error={Boolean(touched.walletAddress && errors.walletAddress)}
                helperText={touched.walletAddress && errors.walletAddress}
              />

              <Dropzone
                defaultValue={getFieldProps('avatarImage').value}
                name={'avatarImage'}
                error={touched?.avatarImage && Boolean(errors?.avatarImage || false)}
                errorText={errors?.avatarImage}
                handleUpload={handleChangeDropzone('avatarImage')}
                placeholder={'Anh dai dien'}
              />
            </Stack>
            <LoadingButton type="submit" style={{ marginTop: 20 }} loading={loading} variant="contained" size="large">
              SAVE
            </LoadingButton>
          </Form>
        </Grid>
      </Grid>
    </FormikProvider>
  );
};

export default UserCreateForm;
