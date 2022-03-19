import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Key } from '@mui/icons-material/';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

export const NavigationBar: React.FC = () => {
  const classes = useStyles();
  const [activePage, setActivePage] = useState(0);
  return (
    <BottomNavigation
      value={activePage}
      onChange={(event, newPage) => {
        setActivePage(newPage);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} icon={<Home />} to="/house" />
      <BottomNavigationAction component={Link} icon={<Key />} to="/house/keys" />
    </BottomNavigation>
  );
};
