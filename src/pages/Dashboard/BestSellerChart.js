import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import * as gameServices from 'services/gameServices';
import { Grid, Box, Stack, LinearProgress } from '@mui/material';

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = () => {
    const theme = useTheme();
    const [game, setGame] = useState();
    const [loading, setLoading] = useState(true);
    const [gameName, setGameName] = useState(['', '', '', '', '']);
    const [f, setF] = useState(false);
    const [series, setSeries] = useState([]);
    const [buyCount, setBuyCount] = useState([1, 0, 0, 0, 0]);

    useEffect(() => {
        const profileApi = async () => {
            const result = await gameServices.getGameBestSeller();
            setGame(result.items);
            setBuyCount(fillArrCount(result.items));
            setGameName(fillArrName(result.items));
        };
        profileApi();
        setSeries([{ name: 'Lượt mua', data: buyCount }]);
        setOptions({
            ...options,
            xaxis: {
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
    }, [f, loading]);

    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

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

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [info],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
                    }
                }
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [primary, info, secondary]);

    return (
        <div id="chart">
            {/* <ReactApexChart options={options} series={series} type="bar" width="100%" height={365} /> */}

            {!loading ? (
                <ReactApexChart options={options} series={series} type="bar" height={365} />
            ) : (
                <></>
                // <Grid container rowSpacing={4.5} columnSpacing={2.75} height={365}>
                //     <Box sx={{ p: 3, pb: 0, mt: 3, align: 'center', ml: 3, width: '100%' }}>
                //         <Stack sx={{ width: '100%', color: 'grey.500', mt: 10 }} spacing={2}>
                //             <LinearProgress color="secondary" />
                //             <LinearProgress color="success" />
                //             <LinearProgress color="inherit" />
                //         </Stack>
                //     </Box>
                // </Grid>
            )}
        </div>
    );
};

export default MonthlyBarChart;
