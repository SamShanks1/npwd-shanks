import React from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useMailsValue, useSetModalVisible } from '../hooks/state';
import { useSetSelectedMail } from '../hooks/state';
import { mailInt } from '@typings/mail';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import { useMailAPI } from '../hooks/useMailAPI';

const useStyles = makeStyles((theme: Theme) => ({
  noMail: {
    color: theme.palette.text.secondary,
  },
}));

// TODO: add search bar later
const MailList = () => {
  const classes = useStyles();
  const mails = useMailsValue();
  const setMail = useSetSelectedMail();
  const setModalVisible = useSetModalVisible();
  const { updateRead } = useMailAPI();

  const handleMailModal = (mail: mailInt) => {
    if (!mail.read) {
      updateRead({ id: mail.mailid })
    }
    setMail(mail);
    setModalVisible(true);
  };

  const mailDate = (dateData: string) => {
    const date = new Date(dateData);
    return (
      ('0' + date.getDate()).slice(-2) +
      '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      date.getFullYear()
    );
  };

  if (mails && mails.length)
    return (
      <List disablePadding>
        {mails.map((mail) => (
          <ListItem key={mail.mailid} button divider onClick={() => handleMailModal(mail)}>
            {mail.read === 0 ? (
              <Box
                sx={{
                  bgcolor: '#4260f5',
                  borderRadius: '10px',
                  minWidth: '8px',
                  minHeight: '8px',
                  marginRight: '10px',
                }}
              />
            ) : (
              <Box
                sx={{
                  borderRadius: '10px',
                  minWidth: '8px',
                  minHeight: '8px',
                  marginRight: '10px',
                }}
              />
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontWeight: '500' }}>{mail.sender}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ color: '#dedede', fontSize: '13px' }}>
                    {mailDate(mail.date)}
                  </Typography>
                </Box>
              </Box>
              <Typography>{mail.subject}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100%"
      className={classes.noMail}
    >
      <Typography color="inherit" variant="h6" style={{ fontWeight: 300 }}>
        You have no mail
      </Typography>
    </Box>
  );
};

export default MailList;
