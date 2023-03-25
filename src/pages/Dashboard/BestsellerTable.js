import * as React from 'react';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, Box } from '@mui/material';
import * as gameServices from 'services/gameServices';

export default function BestSeller() {
    const [game, setGame] = useState();

    useEffect(() => {
        const profileApi = async () => {
            const result = await gameServices.getGameBestSeller();
            setGame(result.items);
        };
        profileApi();
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Số lượng bán game
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên</TableCell>
                            <TableCell align="right">Số lượt bán</TableCell>
                            <TableCell align="right">Doanh thu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {game?.map((row) => (
                            <TableRow key={row.gameID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.buyCount}</TableCell>
                                <TableCell align="right">
                                    {Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 10 }).format(
                                        Math.round((row.price - (row.price * row.discount) / 100) * row.buyCount)
                                    )}{' '}
                                    VNĐ
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
