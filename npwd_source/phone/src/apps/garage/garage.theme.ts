import { ThemeOptions } from '@mui/material';
import { blue, common } from '@mui/material/colors';

export const GARAGE_APP_PRIMARY_COLOR = "#294762";
export const GARAGE_APP_TEXT_COLOR = common.white;

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: GARAGE_APP_PRIMARY_COLOR,
      contrastText: GARAGE_APP_TEXT_COLOR,
    },
  },
};

export default theme;