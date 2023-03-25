import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, InputLabel, Stack, LinearProgress, Input, Typography, Alert } from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';
import config from 'configs/index';
import * as userServices from 'services/userServices';

// ============================|| FIREBASE - REGISTER ||============================ //

const EditUser = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const profileApi = async () => {
            const result = await userServices.getUserProfile(id);
            setUser(result.resultObj);
        };
        profileApi();
    }, []);

    const putUser = async (data) => {
        setLoading(true);
        const result = await userServices.putUser(data);

        if (result.data.isSuccess === true) {
            setNotify('Thay đổi thông tin thành công');
            const timeOut = setTimeout(() => {
                clearTimeout(timeOut);
                navigate(config.routes.user);
            }, 700);
        } else {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const variable = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            email: user.email,
            phoneNumber: user.phoneNumber
        };
        putUser(variable);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Thay đổi thông tin tài khoản
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <form noValidate onSubmit={(e) => onSubmit(e)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="firstName">Họ</InputLabel>
                            <Input
                                name="firstName"
                                value={user?.firstName ? user?.firstName : ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></Input>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="lastName">Tên</InputLabel>
                            <Input
                                name="lastName"
                                value={user?.lastName ? user?.lastName : ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></Input>
                        </Stack>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="email">Emal</InputLabel>
                            <Input
                                name="email"
                                value={user?.email ? user?.email : ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></Input>
                        </Stack>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="dob">Ngày sinh</InputLabel>
                            <Input
                                type="datetime-local"
                                name="dob"
                                value={user?.dob ? user?.dob : ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></Input>
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="phoneNumber">Số điện thoại</InputLabel>
                            <Input
                                name="phoneNumber"
                                type="number"
                                value={user?.phoneNumber ? user?.phoneNumber : ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></Input>
                        </Stack>
                    </Grid>
                    {notify ? (
                        <Grid item xs={12}>
                            <Alert severity="success">{notify}</Alert>
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <InputLabel>{notify}</InputLabel>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        {loading ? (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        ) : (
                            <AnimateButton>
                                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                                    Lưu
                                </Button>
                            </AnimateButton>
                        )}
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
            </form>
        </>
    );
};

export default EditUser;
