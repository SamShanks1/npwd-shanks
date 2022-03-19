import { common, red } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material';

export const HOUSE_APP_PRIMARY_COLOR = "#52bab0";
export const HOUSE_APP_ICON_COLOR = common.white;
export const HOUSE_APP_TEXT_COLOR = common.black;

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: HOUSE_APP_PRIMARY_COLOR,
      contrastText: HOUSE_APP_TEXT_COLOR,
    },
  },
};

export default theme;
