import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, IconButton, Box } from '@mui/material';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import * as gameServices from 'services/gameServices';

export default function BestSeller() {
    const [genre, setGenre] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const profileApi = async () => {
            const result = await gameServices.getAllGenre();
            setGenre(result);
        };
        profileApi();
    }, []);

    const onClickDelete = (event, name, id) => {
        if (confirm('Are you sure you want to delete ' + name + '?')) {
            deleteApi(id);
        }
    };

    const onClickEdit = (event, id) => {
        navigate('/edit-genre/' + id);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Danh sách thể loại
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Xóa</TableCell>
                            <TableCell>Sửa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {genre?.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={(event) => onClickDelete(event, row.name, row.id)}>
                                        <AiOutlineDelete />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={(event) => onClickEdit(event, row.id)}>
                                        <AiOutlineEdit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
