import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, InputLabel, Stack, LinearProgress, Input, Typography, Switch, Alert } from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';
import * as gameService from 'services/gameServices';

// ============================|| FIREBASE - REGISTER ||============================ //

const EditGame = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();
    const [image, setImage] = useState();
    const [notify, setNotify] = useState();
    const [fileGame, setFileGame] = useState();
    const [game, setGame] = useState();
    const [active, setActive] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const profileApi = async () => {
            const result = await gameService.getProfileGame(id);
            setGame(result);
        };
        profileApi();
    }, []);

    const newImg = async (img) => {
        const imgNew = await gameService.postNewIMG(img);
    };

    const handleActive = (event) => {
        setActive(event.target.checked);
    };

    const handleChange = (e) => {
        e.preventDefault();
        const newGame = { ...game };
        newGame[e.target.name] = e.target.value;
        setGame(newGame);
    };

    const handleChangeSRM = (e) => {
        e.preventDefault();
        const newGame = { ...game };
        newGame.srm[e.target.name] = e.target.value;
        setGame(newGame);
    };

    const handleChangeSRR = (e) => {
        e.preventDefault();
        const newGame = { ...game };
        newGame.srr[e.target.name] = e.target.value;
        setGame(newGame);
    };

    const handleChangeIMG = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setFileGame(file);
    };

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.url);
        };
    }, [image]);

    const updateGame = async (gameAPI) => {
        setLoading(true);

        console.log(gameAPI);
        if (gameAPI.Name == '' || gameAPI.Price == null || gameAPI.Description == '' || gameAPI.Gameplay == '') {
            setErr('error');
            setNotify('Không được để trống trường dữ liệu có đánh *');
            const timerIdOut = setTimeout(() => {
                clearTimeout(timerIdOut);
                setLoading(false);
            }, 700);
        } else {
            const response = await gameService.putGame(gameAPI);
            if (response.status == 200) {
                setErr('success');
                setNotify('Thành công');
                const timerId = setTimeout(() => {
                    clearTimeout(timerId);
                    setLoading(false);
                    navigate('/list-game');
                }, 700);
            } else {
                setLoading(false);
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (game.discount > 100) {
            var dis = game.discount.toString().slice(0, 2);
            game.discount = Number(dis);
        }

        const status = active ? 1 : 0;
        const variable = {
            GameID: game.gameID,
            Name: game.name,
            Price: game.price,
            Discount: game.discount,
            Description: game.description,
            Publisher: game.publisher,
            Gameplay: game.gameplay,
            // ThumbnailImage: image,
            FileGame: fileGame,
            Status: status,
            SRM: game.srm,
            SRR: game.srr
        };
        updateGame(variable);

        if (image) {
            newImg({
                GameID: game.gameID,
                ThumbnailImage: image,
                Caption: game.name,
                isDefault: true,
                SortOrder: 2
            });
        }
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Sửa trò chơi
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            {game ? (
                <form noValidate onSubmit={(e) => onSubmit(e)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="name">Tên *</InputLabel>
                                <Input
                                    name="name"
                                    value={game?.name ? game.name : ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="price">Giá *</InputLabel>
                                <Input
                                    type="number"
                                    name="price"
                                    value={game?.price ? game?.price : 0}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="discount">Giảm giá (%) *</InputLabel>
                                <Input
                                    type="number"
                                    name="discount"
                                    value={game?.discount ? game?.discount : 0}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="description">Mô tả *</InputLabel>
                                <Input
                                    name="description"
                                    value={game?.description ? game?.description : ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="publisher">Nhà phát hành</InputLabel>
                                <Input
                                    name="publisher"
                                    value={game?.publisher ? game?.publisher : ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="gameplay">Lối chơi *</InputLabel>
                                <Input
                                    name="gameplay"
                                    value={game?.gameplay ? game?.gameplay : ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={2}>
                            <Stack spacing={1}>
                                <InputLabel>Active ?</InputLabel>
                                <Switch checked={active} onChange={handleActive} inputProps={{ 'aria-label': 'controlled' }} />
                            </Stack>
                        </Grid>
                        <Grid item xs={5}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="imgIp">Hình</InputLabel>
                                <Input id="imgIp" type="file" name="img" onChange={handleChangeIMG} />
                            </Stack>
                        </Grid>
                        <Grid item xs={5}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="fileGame">File Game</InputLabel>
                                <Input id="fileGame" type="file" name="fileGame" onChange={handleChangeFile} />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Cấu hình tối thiểu</InputLabel>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Cấu hình đề nghị</InputLabel>
                            </Stack>
                        </Grid>

                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Hệ điều hành</InputLabel>
                                <Input
                                    value={game?.srm?.os ? game?.srm?.os : ''}
                                    name="os"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Hệ điều hành</InputLabel>
                                <Input
                                    name="os"
                                    value={game?.srr?.os ? game?.srr?.os : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ vi xử lý</InputLabel>
                                <Input
                                    value={game?.srm?.processor ? game?.srm?.processor : ''}
                                    name="processor"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ vi xử lý</InputLabel>
                                <Input
                                    name="processor"
                                    value={game?.srr?.processor ? game?.srr?.processor : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ nhớ</InputLabel>
                                <Input
                                    value={game?.srm?.memory ? game?.srm?.memory : ''}
                                    name="memory"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ nhớ</InputLabel>
                                <Input
                                    name="memory"
                                    value={game?.srr?.memory ? game?.srr?.memory : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ sử lý đồ họa</InputLabel>
                                <Input
                                    value={game?.srm?.graphics ? game?.srm?.graphics : ''}
                                    name="graphics"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ sử lý đồ họa</InputLabel>
                                <Input
                                    name="graphics"
                                    value={game?.srr?.graphics ? game?.srr?.graphics : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ nhớ</InputLabel>
                                <Input
                                    value={game?.srm?.storage ? game?.srm?.storage : ''}
                                    name="storage"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ nhớ</InputLabel>
                                <Input
                                    name="storage"
                                    value={game?.srr?.storage ? game?.srr?.storage : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ nhớ trống</InputLabel>
                                <Input
                                    value={game?.srm?.additionalNotes ? game?.srm?.additionalNotes : ''}
                                    name="additionalNotes"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ nhớ trống</InputLabel>
                                <Input
                                    name="additionalNotes"
                                    value={game?.srr?.additionalNotes ? game?.srr?.additionalNotes : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ xử lý âm thanh</InputLabel>
                                <Input
                                    value={game?.srm?.soundcard ? game?.srm?.soundcard : ''}
                                    name="soundcard"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Bộ xử lý âm thanh</InputLabel>
                                <Input
                                    name="soundcard"
                                    value={game?.srr?.soundcard ? game?.srr?.soundcard : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>

                        {err ? (
                            <Grid item xs={12}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity={err}>{notify}</Alert>
                                </Stack>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert icon={false} severity={err}>
                                        {notify}
                                    </Alert>
                                </Stack>
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

export default EditGame;
