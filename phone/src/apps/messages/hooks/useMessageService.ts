import { useNuiEvent } from 'fivem-nui-react-lib';
import { Message, MessageConversation, MessageEvents } from '@typings/messages';
import { useMessageActions } from './useMessageActions';
import { useCallback } from 'react';
import { useMessageNotifications } from './useMessageNotifications';
import { useLocation } from 'react-router';
import { useActiveMessageConversation } from './state';

export const useMessagesService = () => {
  const { updateLocalMessages, updateLocalConversations, setMessageReadState } =
    useMessageActions();
  const { setNotification } = useMessageNotifications();
  const { pathname } = useLocation();
  const activeConversation = useActiveMessageConversation();

  const handleMessageBroadcast = ({ conversationName, conversation_id, message }) => {
    if (pathname.includes(`/messages/conversations/${conversation_id}`)) {
      return;
    }

    setMessageReadState(conversation_id, 1);
    // Set the current unread count to 1, when they click it will be removed
    setNotification({ conversationName, conversationId: conversation_id, message });
  };

  // This is only called for the receiver of the message. We'll be using the standardized pattern for the transmitter.
  const handleUpdateMessages = useCallback(
    (messageDto: Message) => {
      if (messageDto.conversation_id !== activeConversation.id) return;

      updateLocalMessages(messageDto);
    },
    [updateLocalMessages, activeConversation],
  );

  const handleAddConversation = useCallback(
    (conversation: MessageConversation) => {
      updateLocalConversations({
        participant: conversation.participant,
        isGroupChat: conversation.isGroupChat,
        id: conversation.id,
        conversationList: conversation.conversationList,
        label: conversation.label,
        unread: 0,
      });
    },
    [updateLocalConversations],
  );

  useNuiEvent('MESSAGES', MessageEvents.CREATE_MESSAGE_BROADCAST, handleMessageBroadcast);
  useNuiEvent('MESSAGES', MessageEvents.SEND_MESSAGE_SUCCESS, handleUpdateMessages);
  useNuiEvent('MESSAGES', MessageEvents.CREATE_MESSAGE_CONVERSATION_SUCCESS, handleAddConversation);
};
