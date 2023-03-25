import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    LinearProgress
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import * as authServices from 'services/authServices';
import config from 'configs/index';

// ============================|| FIREBASE - REGISTER ||============================ //

const NewUser = () => {
    const navigate = useNavigate();
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState('');

    const register = async (userName, password, rePassword, email) => {
        if (password != rePassword) {
            setNotify('Mật khẩu không khớp');
        } else {
            setLoading(true);
            // Make Api call
            const response = await authServices.register({
                email: email,
                userName: userName,
                password: password,
                confirmPassword: rePassword
            });
            if (response.isSuccess === false) {
                setLoading(false);
                // Notify('error', response.message);
                setNotify(response.message);
            }
            if (response.isSuccess === true) {
                // Notify('success', 'Register Successfully');
                setNotify('Thành công');

                const timerId = setTimeout(() => {
                    clearTimeout(timerId);
                    setLoading(false);
                    navigate(config.routes.user, { replace: true });
                }, 700);
            }
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Thêm tài khoản mới
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Formik
                initialValues={{
                    userName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={Yup.object().shape({
                    userName: Yup.string().max(255).required('User name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    confirmPassword: Yup.string().max(255).required('Confirm Password is required')
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        register(values.userName, values.password, values.confirmPassword, values.email);
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="userName">Tên tài khoản*</InputLabel>
                                    <OutlinedInput
                                        id="userName"
                                        type="userName"
                                        value={values.userName}
                                        name="userName"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        placeholder="John"
                                        fullWidth
                                        error={Boolean(touched.userName && errors.userName)}
                                    />
                                    {touched.userName && errors.userName && (
                                        <FormHelperText error id="helper-text-userName-signup">
                                            {errors.userName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email">Email *</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email"
                                        type="email"
                                        name="email"
                                        onBlur={handleBlur}
                                        value={values.email}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        placeholder="demo@company.com"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password">Mật khẩu*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        onBlur={handleBlur}
                                        value={values.password}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    <Typography variant="caption" display="block" gutterBottom>
                                        * Mật khẩu phải có ít nhất 6 ký tự và phải có 1 ký tự đặc biệt, 1 số, 1 chữ in hoa
                                    </Typography>
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="confirmPassword">Nhập lại mật khẩu</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                        id="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <FormHelperText error id="helper-text-confirmPassword-signup">
                                            {errors.confirmPassword}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {notify ? (
                                <Grid item xs={12}>
                                    <FormHelperText error>{notify}</FormHelperText>
                                </Grid>
                            ) : (
                                <></>
                            )}

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                {loading ? (
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgress />
                                    </Box>
                                ) : (
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Create Account
                                        </Button>
                                    </AnimateButton>
                                )}
                            </Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default NewUser;
