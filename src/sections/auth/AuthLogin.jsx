import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import * as Yup from 'yup';
import { Formik } from 'formik';

import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

import axiosClient from 'utils/axios';  // Sigurohu që ke axiosClient të konfiguruar për API-n

export default function AuthLogin({ isDemo = false, onLoginSuccess }) {
    const [checked, setChecked] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [submitError, setSubmitError] = React.useState(null);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: 'info@codedthemes.com',
                    password: '123456',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string()
                        .required('Password is required')
                        .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
                        .max(50, 'Password must be less than 50 characters') // pata rrit nga 10
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitError(null);
                    try {
                        await axiosClient.get('/sanctum/csrf-cookie'); // Marr CSRF token (Laravel Sanctum)
                        const response = await axiosClient.post('/api/login', {
                            email: values.email,
                            password: values.password
                        });
                        if (onLoginSuccess) {
                            onLoginSuccess(response.data);
                            setSubmitError('Login successful. Please check your credentials.');
                        }
                    } catch (error) {
                        setSubmitError('Login failed. Please check your credentials.');
                    }
                    setSubmitting(false);
                }}
            >
                {({ errors, handleBlur, handleChange, touched, values, handleSubmit, isSubmitting }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack sx={{ gap: 1 }}>
                                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                    <OutlinedInput
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                </Stack>
                                {touched.email && errors.email && (
                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Stack sx={{ gap: 1 }}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    color="secondary"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                </Stack>
                                {touched.password && errors.password && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack direction="row" sx={{ gap: 2, alignItems: 'baseline', justifyContent: 'space-between' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={(event) => setChecked(event.target.checked)}
                                                name="checked"
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label={<Typography variant="h6">Keep me sign in</Typography>}
                                    />
                                    <Link variant="h6" component={RouterLink} to="#" color="text.primary">
                                        Forgot Password?
                                    </Link>
                                </Stack>
                            </Grid>
                            {submitError && (
                                <Grid item xs={12}>
                                    <Typography color="error">{submitError}</Typography>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button fullWidth size="large" variant="contained" color="primary" disabled={isSubmitting} type="submit">
                                        {isSubmitting ? 'Logging in...' : 'Login'}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
}

AuthLogin.propTypes = {
    isDemo: PropTypes.bool,
    onLoginSuccess: PropTypes.func
};
