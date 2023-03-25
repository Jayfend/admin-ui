// material-ui
import { Grid, Stack, InputLabel, ImageList, ImageListItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as gameService from 'services/gameServices';
import { getImage } from 'services/imageServices';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// ============================|| FIREBASE - REGISTER ||============================ //

const ProfileGame = () => {
    const { id } = useParams();
    const [game, setGame] = useState([]);
    const [imagePath, getImagePath] = useState([]);

    useEffect(() => {
        const profileApi = async () => {
            const result = await gameService.getProfileGame(id);
            setGame(result);
        };
        profileApi();
    }, []);

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <Typography variant="h1" component="h2">
                            Thông tin trò chơi
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Tên</InputLabel>
                        <TextField value={game.name ? game.name : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Giá</InputLabel>
                        <TextField value={game.price ? game.price : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Giảm giá (%)</InputLabel>
                        <TextField value={game.discount ? game.discount : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Thể lo</InputLabel>
                        <TextField value={game.genreName ? game.genreName : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Mô tả</InputLabel>
                        <TextField value={game.description ? game.description : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Lỗi chơi</InputLabel>
                        <TextField value={game.gameplay ? game.gameplay : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Hình</InputLabel>
                        <ImageList sx={{ height: 180 }} cols={5} rowHeight={164}>
                            {game?.listImage?.map((item) => (
                                <ImageListItem key={item.id}>
                                    <img
                                        src={`https://localhost:5001/api/Images/Name?Name=${item}`}
                                        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        // alt={item.title}
                                        // loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
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
                        <TextField value={game?.srm?.os ? game?.srm?.os : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Hệ điều hành</InputLabel>
                        <TextField value={game?.srr?.os ? game?.srr?.os : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ vi xử lý</InputLabel>
                        <TextField value={game?.srm?.processor ? game?.srm?.processor : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ vi xử lý</InputLabel>
                        <TextField value={game?.srr?.processor ? game?.srr?.processor : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ nhớ</InputLabel>
                        <TextField value={game?.srm?.memory ? game?.srm?.memory : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ nhớ</InputLabel>
                        <TextField value={game?.srr?.memory ? game?.srr?.memory : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ sử lý đồ họa</InputLabel>
                        <TextField value={game?.srr?.graphics ? game?.srr?.graphics : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ sử lý đồ họa</InputLabel>
                        <TextField value={game?.srm?.graphics ? game?.srm?.graphics : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ nhớ</InputLabel>
                        <TextField value={game?.srr?.storage ? game?.srr?.storage : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ nhớ</InputLabel>
                        <TextField value={game?.srm?.storage ? game?.srm?.storage : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ nhớ trống</InputLabel>
                        <TextField value={game?.srr?.additionalNotes ? game?.srr?.additionalNotes : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ nhớ trống</InputLabel>
                        <TextField value={game?.srm?.additionalNotes ? game?.srm?.additionalNotes : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ xử lý âm thanh</InputLabel>
                        <TextField value={game?.srm?.soundcard ? game?.srm?.soundcard : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Bộ xử lý âm thanh</InputLabel>
                        <TextField value={game?.srr?.soundcard ? game?.srr?.soundcard : ' '} variant="standard" />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default ProfileGame;
