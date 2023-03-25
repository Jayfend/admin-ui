import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, InputLabel, Stack, LinearProgress, Input, Typography, Switch } from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';
import * as gameService from 'services/gameServices';

// ============================|| FIREBASE - REGISTER ||============================ //

const EditGenre = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState();
    const [genreID, setGenreID] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const profileApi = async () => {
            const result = await gameService.getGenre(id);
            setGenre(result.name);
            setGenreID(result.id);
        };
        profileApi();
    }, []);

    const updateGenre = async (gen) => {
        setLoading(true);
        const response = await gameService.putGenre(gen);
        if (response.status == 200) {
            const timerId = setTimeout(() => {
                clearTimeout(timerId);
                setLoading(false);
                navigate('/list-genre');
            }, 700);
        } else {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setGenre(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const value = {
            genreID: genreID,
            genreName: genre
        };
        updateGenre(value);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Sửa thể loại
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            {genre ? (
                <form noValidate onSubmit={(e) => onSubmit(e)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="name">Tên</InputLabel>
                                <Input
                                    name="name"
                                    value={genre ? genre : ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            {loading ? (
                                <Box sx={{ width: '100%' }}>
                                    <Grid item xs={12}>
                                        <Box sx={{ color: 'chart.ss', display: 'inline', fontSize: 18 }}>
                                            <strong>Thành công</strong>
                                        </Box>
                                    </Grid>
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
            ) : (
                <>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </>
            )}
        </>
    );
};

export default EditGenre;
