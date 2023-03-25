// material-ui
import { Grid, Stack, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as userServices from 'services/userServices';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { ImageListItem, ImageList } from '@mui/material';

// ============================|| FIREBASE - REGISTER ||============================ //

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        const profileApi = async () => {
            const result = await userServices.getUserProfile(id);
            setUser(result.resultObj);
        };
        profileApi();
    }, []);

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <Typography variant="h1" component="h2">
                            Thông tin tài khoản
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        Ảnh đại diện
                        <ImageList sx={{ width: 280, height: 250 }} cols={1} rowHeight={100}>
                            <ImageListItem>
                                <img src={`https://localhost:5001/api/Images/Name?Name=${user.avatarPath}`} />
                            </ImageListItem>
                        </ImageList>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Họ</InputLabel>
                        <TextField value={user.firstName ? user.firstName : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Tên</InputLabel>
                        <TextField value={user.lastName ? user.lastName : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Tên tài khoản</InputLabel>
                        <TextField value={user.userName ? user.userName : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Email</InputLabel>
                        <TextField value={user.email ? user.email : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Số điện thoại</InputLabel>
                        <TextField value={user.phoneNumber ? user.phoneNumber : ' '} variant="standard" />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default UserProfile;
