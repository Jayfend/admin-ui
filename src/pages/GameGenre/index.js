// material-ui
import { Grid, Stack, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as gameServices from 'services/gameServices';
import { Checkbox, Typography, TextField, FormGroup, FormControlLabel, Button, LinearProgress, Box } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

const GameGenre = () => {
    const { id } = useParams();
    const [game, setGame] = useState([]);
    const [genreAPI, setGenreAPI] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(true);
    const [checkedState, setCheckedState] = useState();

    useEffect(() => {
        const profileApi = async () => {
            const result = await gameServices.getProfileGame(id);
            const genre = await gameServices.getAllGenre();
            setGame(result);
            setGenreAPI(genre);
            setCheckedState(new Array(genre.length).fill(false));
        };
        profileApi();
    }, []);

    const callPutGenre = async (genres) => {
        setLoading(true);
        const response = await gameServices.putGameGenre(game.gameID, genres);
        if (response.data.isSuccess === true) {
            const timerId = setTimeout(() => {
                clearTimeout(timerId);
                setLoading(false);
                navigate('/list-game');
            }, 700);
        } else {
            setLoading(false);
        }
    };

    const onChangeGenre = (event, position) => {
        const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
        setCheckedState(updatedCheckedState);
    };

    const saveClick = (e) => {
        const cate = [];
        genreAPI.map((genre, index) => {
            cate[index] = {
                id: genre.id.toString(),
                name: genre.name,
                selected: checkedState[index]
            };
        });

        setGenrePut(cate);
    };
    const setGenrePut = (categories) => {
        callPutGenre({
            id: game.gameID,
            categories: categories
        });
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <Typography variant="h1" component="h2">
                            Thay đổi thể loại
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Tên</InputLabel>
                        <TextField value={game.name ? game.name : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Thể loại</InputLabel>
                        <FormGroup>
                            {genreAPI.map((genre, index) => (
                                <FormControlLabel
                                    key={genre.id}
                                    onChange={(e) => {
                                        onChangeGenre(e, index, genre.id);
                                    }}
                                    name={genre.name}
                                    control={<Checkbox />}
                                    label={genre.name}
                                    checked={checkedState[index]}
                                />
                            ))}
                        </FormGroup>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    {loading ? (
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    ) : (
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
                                Lưu
                            </Button>
                        </AnimateButton>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default GameGenre;
