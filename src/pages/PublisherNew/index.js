import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, InputLabel, Stack, LinearProgress, Input, Typography, Alert } from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';
import * as gameServices from 'services/gameServices';

function PublisherNew() {
    const [publisher, setPublisher] = useState();
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState();
    const navigate = useNavigate();

    const callApi = async () => {
        const api = gameServices.postPublisher({
            name: publisher
        });

        setNotify('Thêm thành công');
        const timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            navigate('/list-publisher');
        }, 700);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        callApi();
    };
    const handleChange = (e) => {
        setPublisher(e.target.value);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Thêm Nhà phát hành
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <form noValidate onSubmit={(e) => onSubmit(e)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="publisher">Tên nhà phát hành</InputLabel>
                            <Input
                                name="publisher"
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

export default PublisherNew;
