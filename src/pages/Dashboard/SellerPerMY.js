import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

import * as chartServices from 'services/chartServices';
import { Box, InputLabel, MenuItem, FormControl, Select, Grid, Stack, Typography, ImageListItem, LinearProgress } from '@mui/material';

// ==============================|| MONTHLY BAR CHART ||============================== //
var today = new Date();

const MonthlyBarChart = () => {
    const theme = useTheme();
    const [game, setGame] = useState();
    const [loading, setLoading] = useState(true);
    const [gameName, setGameName] = useState(['', '', '', '', '']);
    const [f, setF] = useState(false);
    const [series, setSeries] = useState([]);
    const [buyCount, setBuyCount] = useState([1, 0, 0, 0, 0]);
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());
    const [options, setOptions] = useState({
        chart: {
            type: 'bar',
            height: 365,
            toolbar: {
                show: false
            }
        },

        plotOptions: {
            bar: {
                columnWidth: '45%',
                borderRadius: 4
            }
        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: ['', '', '', '', ''],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false
        },
        grid: {
            show: false
        }
    });

    const { m1, m2, m3, m4, m5, m6, m7, m8, m9 } = theme.palette.custom;
    const info = theme.palette.chart.m6;
    const info2 = theme.palette.chart.m3;

    useEffect(() => {
        const profileApi = async () => {
            const result = await chartServices.getBestSellerPerMonthSortbyBuy(year, month, 100);
            setGame(result);
            setBuyCount(fillArrCount(result));
            setGameName(fillArrName(result));
        };
        profileApi();
        setSeries([{ name: 'Lượt mua', data: buyCount }]);
        setOptions({
            ...options,
            xaxis: {
                labels: {
                    style: {
                        colors: [m1, m2, m3, m4, m5, m6, m7, m8, m9]
                    }
                },
                categories: gameName,
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            }
        });
        const timerId = setTimeout(() => {
            clearTimeout(timerId);
            setLoading(false);
        }, 700);
    }, [f, year, month, m1, m2, m3, m4, m5, m6, m7, m8, m9, loading]);

    const handleChangeMonth = (event) => {
        setF(!f);
        setMonth(event.target.value);
        setF(!f);
    };

    const handleChangeYear = (event) => {
        setF(!f);
        setYear(event.target.value);
        setF(!f);
    };

    const fillArrCount = (arr) => {
        const buy = [];
        arr.map((count, i) => {
            if (i <= 4) {
                if (count.buyCount > 0) {
                    buy.push(count.buyCount);
                }
            }
        });
        setF(true);
        return buy;
    };

    const fillArrName = (arr) => {
        const buy = [];
        arr.map((count, i) => {
            if (i <= 4) {
                if (count.buyCount > 0) {
                    if (count.name.length > 20) {
                        buy.push(count.name.slice(0, 20) + '...');
                    } else {
                        buy.push(count.name);
                    }
                }
            }
        });
        setF(true);
        return buy;
    };

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [info],
            tooltip: {
                theme: 'light'
            }
        }));
    }, [info, m1, m2, m3, m4, m5, m6, m7, m8, m9]);

    return (
        <div id="chart">
            <FormControl sx={{ m: 1, minWidth: 120, ml: 4 }} size="small">
                <InputLabel id="demo-select-small">Tháng</InputLabel>
                <Select labelId="demo-select-small" id="demo-select-small" value={month} label="month" onChange={handleChangeMonth}>
                    <MenuItem value={today.getMonth() + 1}>
                        <em>Hiện tại</em>
                    </MenuItem>
                    <MenuItem value={1}>Tháng 1</MenuItem>
                    <MenuItem value={2}>Tháng 2</MenuItem>
                    <MenuItem value={3}>Tháng 3</MenuItem>
                    <MenuItem value={4}>Tháng 4</MenuItem>
                    <MenuItem value={5}>Tháng 5</MenuItem>
                    <MenuItem value={6}>Tháng 6</MenuItem>
                    <MenuItem value={7}>Tháng 7</MenuItem>
                    <MenuItem value={8}>Tháng 8</MenuItem>
                    <MenuItem value={9}>Tháng 9</MenuItem>
                    <MenuItem value={10}>Tháng 10</MenuItem>
                    <MenuItem value={11}>Tháng 11</MenuItem>
                    <MenuItem value={12}>Tháng 12</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-medium">Năm</InputLabel>
                <Select labelId="demo-select-medium" id="demo-select-medium" value={year} label="year" onChange={handleChangeYear}>
                    <MenuItem value={today.getFullYear()}>{today.getFullYear()}</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                </Select>
            </FormControl>

            {buyCount.length > 0 ? (
                <>
                    {!loading ? (
                        <ReactApexChart options={options} series={series} type="bar" width="100%" height={365} />
                    ) : (
                        <Grid container rowSpacing={4.5} columnSpacing={2.75} height={365}>
                            <Box sx={{ p: 3, pb: 0, mt: 3, align: 'center', ml: 3, width: '100%' }}>
                                <Stack sx={{ width: '100%', color: 'grey.500', mt: 10 }} spacing={2}>
                                    <LinearProgress color="secondary" />
                                    <LinearProgress color="success" />
                                    <LinearProgress color="inherit" />
                                </Stack>
                            </Box>
                        </Grid>
                    )}
                </>
            ) : (
                <>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75} height={418}>
                        <Box sx={{ p: 3, pb: 0, mt: 3, align: 'center', ml: 3 }}>
                            <Stack spacing={2}>
                                <Typography variant="h3">Không có game nào được bán ra trong tháng {month}</Typography>
                                <ImageListItem sx={{ width: 280, height: 250 }}>
                                    <img
                                        src={`https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/251576195_208842638030538_3533206260411626160_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=1G0Z9MmRFdcAX8O5ueL&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBNQe8Dxqfkqq5QBAIOzvbOWAU4rW2zsX5LSJaEBGvhEg&oe=63A4290F`}
                                    />
                                </ImageListItem>
                            </Stack>
                        </Box>
                    </Grid>
                </>
            )}
        </div>
    );
};

export default MonthlyBarChart;
