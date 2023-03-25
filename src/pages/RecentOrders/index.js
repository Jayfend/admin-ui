import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { getOrder } from 'services/clientServices';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getOrder();
            setOrder(result.resultObj);
        };
        fetchApi();
    }, []);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <SlArrowUp /> : <SlArrowDown />}
                    </IconButton>
                    Danh sách game
                </TableCell>
                <TableCell component="th" scope="row">
                    {order[row]?.username}
                </TableCell>
                <TableCell align="right">
                    {Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 10 }).format(order[row]?.totalPrice)} VNĐ
                </TableCell>
                <TableCell align="right">
                    <div type="date">{order[row]?.purchasedate.slice(0, 10)}</div>
                </TableCell>
                <TableCell></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right"></TableCell>
                                        <TableCell>Tên</TableCell>
                                        <TableCell>Giá</TableCell>
                                        <TableCell>Giảm giá(%)</TableCell>
                                        <TableCell>Tổng($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order[row]?.listgame.map((gameRow) => (
                                        <TableRow key={gameRow.gameID}>
                                            <TableCell align="right"></TableCell>
                                            <TableCell>{gameRow.name}</TableCell>
                                            <TableCell>
                                                {Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 10 }).format(gameRow.price)} VNĐ
                                            </TableCell>
                                            <TableCell>{gameRow.discount} %</TableCell>
                                            <TableCell>
                                                {Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 10 }).format(
                                                    Math.round(gameRow.price - (gameRow.price * gameRow.discount) / 100)
                                                )}{' '}
                                                VNĐ
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.number.isRequired
};

export default function RecentOrder() {
    const [orderRecent, setOrderRecent] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getOrder();
            setOrderRecent(result.resultObj);
        };
        fetchApi();
    }, []);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12} lg={4}>
                    <Typography variant="h1" component="h2">
                        Danh sách hóa đơn
                    </Typography>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Tên tài khoản</TableCell>
                            <TableCell align="right">Tổng tiền</TableCell>
                            <TableCell align="right">Ngày mua</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderRecent?.map((row, index) => (
                            <Row key={row.cartID} row={index} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
