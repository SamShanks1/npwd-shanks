import { Button, Slide, Paper, Typography, Container, Box, Divider } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useStyles from './modal.styles';
import { StatusButton } from '@ui/components/StatusButton';
import { useModalVisible, useSelectedMail } from '../hooks/state';
import { useHistory, useLocation } from 'react-router';
import { useApps } from '@os/apps/hooks/useApps';
import { useMailAPI } from '../hooks/useMailAPI';

export const MailModal: React.FC = () => {
  const classes = useStyles();
  const { deleteMail, updateMailButton } = useMailAPI();
  const [modalVisible, setModalVisible] = useModalVisible();
  const [selectedMail, setselectedMail] = useSelectedMail();

  const history = useHistory();
  const { getApp } = useApps();
  const location = useLocation();

  const mailApp = useMemo(() => getApp('MAIL'), [getApp]);

  const handleDeleteMail = () => {
    deleteMail({ id: selectedMail.mailid })
      .then(() => {
        setModalVisible(false);
      })
      .catch(console.error);
  };

  const handleSubmitButton = () => {
    updateMailButton({ mailid: selectedMail.mailid, button: selectedMail.button })
      .then(() => {
        setModalVisible(false);
      })
      .catch(console.error);
  };

  const _handleClose = () => {
    setModalVisible(false);
  };

  const handleClearContent = () => {
    setselectedMail(null);
    if (location.search) history.push(mailApp.path);
  };

  if (selectedMail === null) return null;

  const MonthFormatting = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateString = (mailDate) => {
    const date = new Date(mailDate);
    return (
      date.getDay() +
      ' ' +
      MonthFormatting[date.getMonth()] +
      ' ' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes()
    );
  };

  return (
    <Slide
      direction="left"
      in={modalVisible}
      mountOnEnter
      unmountOnExit
      onExited={handleClearContent}
    >
      <Paper className={classes.modalRoot} square>
        <Container sx={{ height: '100%' }}>
          <Box sx={{ height: '100%' }}>
            <Box pt={2} pb={1}>
              <Button
                color="secondary"
                size="large"
                startIcon={<ArrowBackIcon fontSize="large" />}
                onClick={_handleClose}
              >
                INBOX
              </Button>
            </Box>
            <Box pl={1} pb={'12px'}>
              <Typography sx={{ fontSize: '20px', fontWeight: 500 }}>
                {selectedMail.sender}
              </Typography>
              <Typography sx={{ fontSize: '19px' }}>{selectedMail.subject}</Typography>
              <Typography sx={{ fontSize: '15px', color: '#dedede' }}>
                {dateString(selectedMail.date)}
              </Typography>
            </Box>
            <Divider />
            <Box
              pl={1}
              pt={'12px'}
              sx={{ fontSize: '18px', height: '70%' }}
              dangerouslySetInnerHTML={{ __html: selectedMail.message }}
            ></Box>
            <Box
              display="inline"
              p={1}
              sx={{ display: 'flex', gap: '15px', justifyContent: 'center' }}
            >
              {selectedMail.button !== undefined && selectedMail.button !== null && (
                <Button color="success" variant="contained" onClick={handleSubmitButton}>
                  ACCEPT
                </Button>
              )}
              <StatusButton color="error" variant="contained" onClick={handleDeleteMail}>
                DELETE
              </StatusButton>
            </Box>
          </Box>
        </Container>
      </Paper>
    </Slide>
  );
};
