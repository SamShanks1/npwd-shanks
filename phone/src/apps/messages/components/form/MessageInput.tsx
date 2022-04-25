import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Box, Button, styled, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import IosShareIcon from '@mui/icons-material/IosShare';
import { TextField } from '@ui/components/Input';
import { useMessageAPI } from '../../hooks/useMessageAPI';
import { MessageConversation } from '@typings/messages';
import useMessages from '../../hooks/useMessages';
import { useWordFilter } from '@os/wordfilter/hooks/useWordFilter';
import EmojiIcon from '@mui/icons-material/SentimentSatisfied';
import { toggleKeys } from '../../../../ui/components/Input';
import {
  useSetEmojiModal,
  messageState,
  useEmojiModalValue,
  useSetTextMessage,
  useTextMessageValue,
  useSelectedMessageValue,
} from '../../hooks/state';
import { useSetRecoilState } from 'recoil';
interface IProps {
  onAddImageClick(): void;
  messageConversation: MessageConversation | undefined;
  messageGroupName: string | undefined;
}

const ButtonWrapper = styled(Button)({
  background: 'transparent',
  minWidth: '45px',
  height: '25px',
});

const MessageInput = ({ messageConversation, onAddImageClick }: IProps) => {
  const [t] = useTranslation();
  const message = useTextMessageValue();
  const setMessage = useSetTextMessage();
  // const [message, setMessage] = useState('');
  const { sendMessage } = useMessageAPI();
  const { activeMessageConversation } = useMessages();
  const { clean } = useWordFilter();
  const setModalVisible = useSetEmojiModal();
  const emojiState = useEmojiModalValue();

  useEffect(() => {
    setMessage('');
    setModalVisible(false);
  }, [setMessage, setModalVisible]);

  const handleSubmit = async () => {
    console.log(activeMessageConversation);
    if (message.trim()) {
      await sendMessage({
        conversationId: messageConversation.id,
        conversationList: activeMessageConversation.conversationList,
        message: clean(message),
        tgtPhoneNumber: messageConversation.participant,
      });
      setMessage('');
    }
  };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      await handleSubmit();
    }
  };

  if (!messageConversation.id) return null;

  const EmojiButton = () => (
    <ButtonWrapper onClick={() => setModalVisible(!emojiState)}>
      <EmojiIcon color="action" />
    </ButtonWrapper>
  );

  return (
    <>
      <Paper variant="outlined" sx={{ display: 'flex', alignItems: 'center', maxHeight: '45px' }}>
        <Box pl={3} pt={1} pb={1} flexGrow={1}>
          <TextField
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            aria-multiline="true"
            fullWidth
            InputProps={{ endAdornment: <EmojiButton /> }}
            value={message}
            inputProps={{ style: { fontSize: '1.1em' } }}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('MESSAGES.NEW_MESSAGE')}
          />
        </Box>

        <Box>
          <Button onClick={onAddImageClick}>
            <IosShareIcon />
          </Button>
          <Button onClick={handleSubmit}>
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default MessageInput;
