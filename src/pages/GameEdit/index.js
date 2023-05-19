import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, InputLabel, Stack, LinearProgress, Input, Typography, Switch, Alert } from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';
import * as gameServices from 'services/gameServices';

// ============================|| FIREBASE - REGISTER ||============================ //

const EditGame = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();
    const [notify, setNotify] = useState();
    const [fileGame, setFileGame] = useState();
    const [game, setGame] = useState();
    const [listImg, setListImg] = useState([]);
    const [active, setActive] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const profileApi = async () => {
            const result = await gameServices.getProfileGame(id);
            setGame(result);
        };

        const getGameIMG = async () => {
            const result = await gameServices.getGameIMG(id);
            setListImg(result);
        };

        profileApi();
        getGameIMG();
    }, []);

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

    const [thumb, setThumb] = useState();
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();
    const [image4, setImage4] = useState();

    const handleChangeThumb = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setThumb(file);
    };

    const handleChangeIMG1 = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage1(file);
    };

    const handleChangeIMG2 = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage2(file);
    };

    const handleChangeIMG3 = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage3(file);
    };

    const handleChangeIMG4 = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage4(file);
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setFileGame(file);
    };

    useEffect(() => {
        return () => {
            thumb && URL.revokeObjectURL(thumb.url);
            image1 && URL.revokeObjectURL(image1.url);
            image2 && URL.revokeObjectURL(image2.url);
            image3 && URL.revokeObjectURL(image3.url);
            image4 && URL.revokeObjectURL(image4.url);
        };
    }, [thumb, image1, image2, image3, image4]);

    const updateGame = async (gameAPI) => {
        setLoading(true);

        if (gameAPI.Name == '' || gameAPI.Price == null || gameAPI.Description == '' || gameAPI.Gameplay == '') {
            setErr('error');
            setNotify('Không được để trống trường dữ liệu có đánh *');
            const timerIdOut = setTimeout(() => {
                clearTimeout(timerIdOut);
                setLoading(false);
            }, 700);
        } else {
            const response = await gameServices.putGame(gameAPI);
            console.log(gameAPI);
            if (response.status == 200) {
                setErr('success');
                setNotify('Thành công');
                const timerId = setTimeout(() => {
                    clearTimeout(timerId);
                    setLoading(false);
                    navigate('/list-game');
                }, 1000);
            } else {
                setLoading(false);
            }
        }
    };

    const updateIMG = async () => {
        setLoading(true);

        if (listImg.length === 0) return;
        if (thumb) {
            const response = await gameServices.putGameIMG({ ...listImg[0], newIMG: thumb });
            if (response.status !== 200) {
                setNotify('Có lỗi khi đổi ảnh');
            }
        }
        if (image1) {
            const response = await gameServices.putGameIMG({ ...listImg[1], newIMG: image1 });
            if (response.status !== 200) {
                setNotify('Có lỗi khi đổi ảnh');
            }
        }
        if (image2) {
            const response = await gameServices.putGameIMG({ ...listImg[2], newIMG: image2 });
            if (response.status !== 200) {
                setNotify('Có lỗi khi đổi ảnh');
            }
        }
        if (image3) {
            const response = await gameServices.putGameIMG({ ...listImg[3], newIMG: image3 });
            if (response.status !== 200) {
                setNotify('Có lỗi khi đổi ảnh');
            }
        }
        if (image4) {
            const response = await gameServices.putGameIMG({ ...listImg[4], newIMG: image4 });
            if (response.status !== 200) {
                setNotify('Có lỗi khi đổi ảnh');
            }
        }

        setLoading(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        updateIMG();

        if (game.discount > 100) {
            var dis = game.discount.toString().slice(0, 2);
            game.discount = Number(dis);
        }

        const variable = {
            GameID: game.id,
            Name: game.name,
            Price: game.price,
            Discount: game.discount,
            Description: game.description,
            PublisherId: game.publisherId,
            Gameplay: game.gameplay,
            Status: active ? true : false,
            // ThumbnailImage: thumb,
            SRM: game.srm,
            SRR: game.srr
            // FileGame: fileGame
        };
        updateGame(variable);
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

                        {/* <Grid item xs={12}>
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
                        </Grid> */}
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
                                <InputLabel htmlFor="fileGame">File Game</InputLabel>
                                <Input id="fileGame" type="file" name="fileGame" onChange={handleChangeFile} />
                            </Stack>
                        </Grid>
                        <Grid item xs={5}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="imgIp">Hình Thumbnail</InputLabel>
                                <Input id="imgIp" type="file" name="img" onChange={handleChangeThumb} />
                            </Stack>
                        </Grid>
                        <>
                            <Grid item xs={3}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="imgIp">Hình 1</InputLabel>
                                    <Input id="imgIp" type="file" name="img" onChange={handleChangeIMG1} />
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="imgIp">Hình 2</InputLabel>
                                    <Input id="imgIp" type="file" name="img" onChange={handleChangeIMG2} />
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="imgIp">Hình 3</InputLabel>
                                    <Input id="imgIp" type="file" name="img" onChange={handleChangeIMG3} />
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="imgIp">Hình 4</InputLabel>
                                    <Input id="imgIp" type="file" name="img" onChange={handleChangeIMG4} />
                                </Stack>
                            </Grid>
                        </>
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
                                    value={game?.srm?.os ? game?.srm?.os : 'Windows® 10 64 Bit (latest update)'}
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
                                    value={game?.srr?.os ? game?.srr?.os : 'Windows® 10 64 Bit (latest update)'}
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
                                    value={
                                        game?.srm?.processor
                                            ? game?.srm?.processor
                                            : 'AMD FX 6300 @ 3.5 Ghz or Intel Core i5-2400 @ 3.1 Ghz.'
                                    }
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
                                    value={
                                        game?.srr?.processor
                                            ? game?.srr?.processor
                                            : 'AMD FX 6300 @ 3.5 Ghz or Intel Core i5-2400 @ 3.1 Ghz.'
                                    }
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>RAM</InputLabel>
                                <Input
                                    value={game?.srm?.memory ? game?.srm?.memory : '8 GB RAM'}
                                    name="memory"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>RAM</InputLabel>
                                <Input
                                    name="memory"
                                    value={game?.srr?.memory ? game?.srr?.memory : '8 GB RAM'}
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
                                    value={
                                        game?.srm?.graphics ? game?.srm?.graphics : 'AMD R9 280x (3 GB) or NVIDIA GeForce GTX 660 (2 GB)'
                                    }
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
                                    value={
                                        game?.srr?.graphics ? game?.srr?.graphics : 'AMD R9 280x (3 GB) or NVIDIA GeForce GTX 660 (2 GB)'
                                    }
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Lưu trữ</InputLabel>
                                <Input
                                    value={game?.srm?.storage ? game?.srm?.storage : '33 GB chỗ trống khả dụng'}
                                    name="storage"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Lưu trữ</InputLabel>
                                <Input
                                    name="storage"
                                    value={game?.srr?.storage ? game?.srr?.storage : '33 GB chỗ trống khả dụng'}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Ghi chú thêm</InputLabel>
                                <Input
                                    value={game?.srm?.additionalNotes ? game?.srm?.additionalNotes : 'Phiên bản 11'}
                                    name="additionalNotes"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Ghi chú thêm</InputLabel>
                                <Input
                                    name="additionalNotes"
                                    value={game?.srr?.additionalNotes ? game?.srr?.additionalNotes : 'Phiên bản 11'}
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
                                    value={
                                        game?.srm?.soundcard
                                            ? game?.srm?.soundcard
                                            : 'DirectX 9.0c compatible sound card with latest drivers'
                                    }
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
                                    value={
                                        game?.srr?.soundcard
                                            ? game?.srr?.soundcard
                                            : 'DirectX 9.0c compatible sound card with latest drivers'
                                    }
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
