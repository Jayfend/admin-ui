import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Paper,
    IconButton,
    FormControlLabel,
    Switch,
    LinearProgress,
    Typography
} from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead } from './component/index';
import * as userServices from 'services/userServices';
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from 'react-icons/ai';
import { GrUserAdmin } from 'react-icons/gr';

function createData(id, firstName, lastName, phoneNumber, roleAssign, userName, email) {
    return {
        id,
        firstName,
        lastName,
        phoneNumber,
        roleAssign,
        userName,
        email
    };
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default function UserTable() {
    const [ro, setRo] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await userServices.getUserTable(1, 30);
            setRo(result.resultObj.items);
            if (ro != undefined) {
                setLoading(false);
            }
        };
        fetchApi();
    }, [loading]);

    const rows = ro.map((value) => {
        return createData(value.id, value.firstName, value.lastName, value.phoneNumber, value.roleAssign, value.userName, value.email);
    });

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const deleteApi = async (id) => {
        setLoading(true);
        const result = await userServices.deleteUser(id);
    };

    const onClickProfile = (event, id) => {
        navigate('/user-profile/' + id);
    };
    const onClickEdit = (event, id) => {
        navigate('/edit-user/' + id);
    };
    const onClickRole = (event, id) => {
        navigate('/edit-user-role/' + id);
    };

    const handleClick = (event, userName, id) => {
        if (confirm('Are you sure you want to delete ' + userName + '?')) {
            deleteApi(id);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Danh sách tài khoản
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={rows.length} />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.userName}</TableCell>
                                            <TableCell align="right">{row.firstName}</TableCell>
                                            <TableCell align="right">{row.lastName}</TableCell>
                                            <TableCell align="right">{row.phoneNumber}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={(event) => handleClick(event, row.userName, row.id)}>
                                                    <AiOutlineDelete />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={(event) => onClickProfile(event, row.id)}>
                                                    <AiOutlineEye />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={(event) => onClickEdit(event, row.id)}>
                                                    <AiOutlineEdit />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={(event) => onClickRole(event, row.id)}>
                                                    <GrUserAdmin />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Grid item xs={12}>
                        {loading ? (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        ) : (
                            <></>
                        )}
                    </Grid>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
