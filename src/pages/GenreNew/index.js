import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, InputLabel, Stack, LinearProgress, Input, Typography, Alert } from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';
import * as gameServices from 'services/gameServices';
export default function NewGenre() {
    const [genre, setGenre] = useState();
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState();
    const navigate = useNavigate();

    const callApi = async () => {
        const api = gameServices.postNewGenre({
            genreName: genre
        });

        setNotify('Thay đổi thông tin thành công');
        const timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            navigate('/list-game');
        }, 700);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        callApi();
    };
    const handleChange = (e) => {
        setGenre(e.target.value);
    };
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Thêm thể loại mới
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <form noValidate onSubmit={(e) => onSubmit(e)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="firstName">Tên thể loại</InputLabel>
                            <Input
                                name="firstName"
                                // value={user?.firstName ? user?.firstName : ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></Input>
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                                Thêm
                            </Button>
                        </AnimateButton>
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
            </form>
        </>
    );
}
