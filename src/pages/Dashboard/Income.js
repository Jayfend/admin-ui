import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import * as gameServices from 'services/gameServices';
import { set } from 'lodash';

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState([]);
    const [gameName, setGameName] = useState(['', '', '', '', '']);
    const [f, setF] = useState(false);
    const [series, setSeries] = useState([]);
    const [buyCount, setBuyCount] = useState([0, 0, 0, 0, 0]);

    useEffect(() => {
        const profileApi = async () => {
            const result = await gameServices.getGameBestSeller();
            setGame(result.items);
            setBuyCount(fillArrCount(sortGame(result.items)));
            setGameName(fillArrName(sortGame(result.items)));
        };
        profileApi();
        setSeries(buyCount);
        setOptions({
            ...options,
            labels: gameName
        });
        const timerId = setTimeout(() => {
            clearTimeout(timerId);
            setLoading(false);
        }, 700);
    }, [f, loading]);

    const sortGame = (arr) =>
        arr.sort((a, b) => {
            const nameA = Math.round((a.price - (a.price * a.discount) / 100) * a.buyCount);
            const nameB = Math.round((b.price - (b.price * b.discount) / 100) * b.buyCount);
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        });

    const fillArrCount = (arr) => {
        const buy = [];
        var another = 0;
        arr.map((count, i) => {
            if (count.buyCount > 0 && i < arr.length && i < 9) {
                buy.push(Math.round((count.price - (count.price * count.discount) / 100) * count.buyCount));
            } else {
                another += Math.round((count.price - (count.price * count.discount) / 100) * count.buyCount);
                buy[9] = another;
            }
        });
        return buy;
    };

    const fillArrName = (arr) => {
        const buy = [];
        arr.map((count, i) => {
            if (count.buyCount > 0 && i < arr.length && i < 9) {
                if (count.name.length < 20) {
                    buy.push(count.name);
                } else {
                    buy.push(count.name.slice(0, 20) + '...');
                }
            } else {
                buy.push('Khác');
            }
        });
        return buy.slice(0, 10);
    };

    const [options, setOptions] = useState({
        chart: {
            width: 380,
            type: 'pie'
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    });

    return (
        <div id="pie">
            <ReactApexChart options={options} series={series} type="pie" height={378} />
        </div>
    );
};

export default MonthlyBarChart;
