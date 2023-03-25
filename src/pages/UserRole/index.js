// material-ui
import { Grid, Stack, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as userServices from 'services/userServices';
import { Checkbox, Typography, TextField, FormGroup, FormControlLabel, Box, Button } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

const UserRole = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [rolesApi, setRolesApi] = useState([]);
    const navigate = useNavigate();
    const [adminCheck, setAdminCheck] = useState(false);
    const [userCheck, setUserCheck] = useState(false);

    const checkedAble = () => {};
    useEffect(() => {
        const profileApi = async () => {
            const result = await userServices.getUserProfile(id);
            const roleApi = await userServices.getRole();
            setUser(result.resultObj);
            setRolesApi(roleApi);
            result.resultObj.roles.map((role) => {
                if (role === 'User') {
                    setUserCheck(true);
                } else if (role === 'admin') {
                    setAdminCheck(true);
                }
            });
        };
        profileApi();
        checkedAble();
    }, []);

    const putRoleUser = async (id, role) => {
        const response = await userServices.putRoleUser(user.id, role);
        if (response.data.isSuccess === true) {
            navigate('/user');
        }
    };

    const onChangeUser = (e) => {
        if (userCheck) {
            setUserCheck(false);
        } else {
            setUserCheck(true);
        }
    };
    const onChangeAdmin = (e) => {
        if (adminCheck) {
            setAdminCheck(false);
        } else {
            setAdminCheck(true);
        }
    };

    const saveClick = (e) => {
        const rolePut = {
            Id: user.id,
            Roles: [
                {
                    Id: rolesApi[0].id,
                    Name: 'User',
                    Selected: userCheck
                },
                {
                    Id: rolesApi[1].id,
                    Name: 'admin',
                    Selected: adminCheck
                }
            ]
        };
        putRoleUser(user.id, rolePut);
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <Typography variant="h1" component="h2">
                            Thay đổi quyền
                        </Typography>
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
                        <InputLabel>Quyền</InputLabel>
                        <FormGroup>
                            <FormControlLabel
                                onChange={(e) => {
                                    onChangeUser(e);
                                }}
                                name="User"
                                control={<Checkbox />}
                                label="Người dùng"
                                checked={userCheck}
                            />
                            <FormControlLabel
                                onChange={(e) => {
                                    onChangeAdmin(e);
                                }}
                                control={<Checkbox />}
                                label="Quản trị viên"
                                name="admin"
                                checked={adminCheck}
                            />
                        </FormGroup>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                saveClick(e);
                            }}
                        >
                            Save
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </>
    );
};

export default UserRole;
