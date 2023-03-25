// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode) => {
    const colors = presetPalettes;

    const greyPrimary = [
        '#ffffff',
        '#fafafa',
        '#f5f5f5',
        '#f0f0f0',
        '#d9d9d9',
        '#bfbfbf',
        '#8c8c8c',
        '#595959',
        '#262626',
        '#141414',
        '#000000'
    ];
    const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
    const greyConstant = ['#F9F9F9', '#e6ebf1'];

    colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

    const paletteColor = ThemeOption(colors);

    return createTheme({
        palette: {
            mode,
            common: {
                black: '#000',
                white: '#fff'
            },
            ...paletteColor,
            text: {
                primary: paletteColor.grey[700],
                secondary: paletteColor.grey[500],
                disabled: paletteColor.grey[400]
            },
            action: {
                disabled: paletteColor.grey[300]
            },
            divider: paletteColor.grey[200],
            background: {
                paper: paletteColor.grey[0],
                default: paletteColor.grey.A50
            },
            custom: {
                blue1: '#bae7ff',
                blue2: '#91d5ff',
                blue3: '#69c0ff',
                blue4: '#40a9ff'
            },
            chart: {
                ss: '#5CB85C',
                ff: '#FF4444',
                m1: '#26A0FC',
                m3: '#71FFCE',
                m4: '#FEBC3B',
                m5: '#FF6178',
                m6: '#8B75D7',
                m7: '#6D848E',
                m8: '#46B3A9',
                m9: '#D830EB',
                m10: '#00E396'
            }
        }
    });
};

export default Palette;
