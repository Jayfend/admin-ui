import { useState, useEffect } from 'react';
import RecentOrder from 'pages/RecentOrders/index';

import BestSeller from './BestsellerTable';
import { Grid, Typography, Stack, Box } from '@mui/material';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import BestSellerChart from './BestSellerChart';
import SellerPerMY from './SellerPerMY';
import Income from './Income';
import IncomePerMY from './IncomePerMY';

import * as userServices from 'services/userServices';
import * as gameServices from 'services/gameServices';
import * as clientServices from 'services/clientServices';

function Dash() {
    const [user, setUser] = useState();
    const [game, setGame] = useState();
    const [income, setIncome] = useState();
    const [bill, setBill] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const userS = await userServices.getUserTable(1, 500);
            const gameS = await gameServices.getGameTable(1, 500);
            const billS = await clientServices.getOrder();

            setUser(userS.resultObj.items.length.toString());
            setGame(gameS.items.length.toString());
            setBill(billS.resultObj.length.toString());
            setIncome(totalIncome(billS.resultObj));
        };
        fetchApi();
    }, []);

    const totalIncome = (arr) => {
        var total = 0;
        arr.map((ic) => {
            return (total += ic.totalPrice);
        });
        return new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 10 }).format(total).toString();
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={6} sm={6} md={3} lg={3}>
                <Box sx={{ p: 2, bgcolor: 'custom.blue1', color: 'primary.contrastText', borderRadius: 2 }}>
                    <AnalyticEcommerce title="Số người dùng" count={user} />
                </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
                <Box sx={{ p: 2, bgcolor: 'custom.blue2', color: 'primary.contrastText', borderRadius: 2 }}>
                    <AnalyticEcommerce title="Số lượng game" count={game} />
                </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
                <Box sx={{ p: 2, bgcolor: 'custom.blue3', color: 'primary.contrastText', borderRadius: 2 }}>
                    <AnalyticEcommerce title="Đơn mua" count={bill} />
                </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
                <Box sx={{ p: 2, bgcolor: 'custom.blue4', color: 'primary.contrastText', borderRadius: 2 }}>
                    <AnalyticEcommerce title="Tổng thu nhập" count={income + ' VNĐ'} />
                </Box>
            </Grid>
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
            <Grid item xs={12} md={12} lg={7}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h3">Game nhiều lượt mua nhất</Typography>
                        </Stack>
                    </Box>
                    <BestSellerChart />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={12} lg={5}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h3">Tổng thu nhập</Typography>
                        </Stack>
                    </Box>
                    <Income />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h3">Game nhiều lượt mua nhất theo tháng</Typography>
                        </Stack>
                    </Box>
                    <SellerPerMY />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={12} lg={5}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h3">Thu nhập từ game theo tháng</Typography>
                        </Stack>
                    </Box>
                    <IncomePerMY />
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <RecentOrder />
                </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Stack spacing={1}>
                    <BestSeller />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Dash;
