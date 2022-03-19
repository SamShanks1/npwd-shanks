import { common, red } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material';

export const MAIL_APP_PRIMARY_COLOR = '#EA4335';
export const MAIL_APP_ICON_COLOR = common.white;
export const MAIL_APP_TEXT_COLOR = common.black;

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: MAIL_APP_PRIMARY_COLOR,
      dark: red[900],
      light: red[500],
      contrastText: MAIL_APP_TEXT_COLOR,
    },
    secondary: {
      main: '#FBBC05',
      dark: red[900],
      light: red[500],
      contrastText: MAIL_APP_TEXT_COLOR,
    },
  },
};

export default theme;
