import { Message, MessageConversation } from '@typings/messages';
import { ServerPromiseResp } from '@typings/common';

export const MockMessageConversations: MessageConversation[] = [
  {
    id: 1,
    conversationList: '111-1134+215-8139',
    participant: '111-1134',
    unread: 0,
    label: '',
    updatedAt: 5,
    isGroupChat: false,
  },
  {
    id: 2,
    conversationList: '111-1134+321+215-8134',
    participant: '111-1134',
    unread: 0,
    label: 'Group Chat',
    updatedAt: 5,
    isGroupChat: true,
  },
];

const MockConversationMessages: Message[] = [
  {
    id: 2,
    author: '215-8134',
    message: 'Dude, when is this phone done?????',
  },
  {
    id: 3,
    author: '111-1134',
    message: 'Bro, finish phone now?????',
  },
  {
    id: 4,
    author: '444-4444',
    message: "Couldn't be me!",
  },

];

export const MockConversationServerResp: ServerPromiseResp<Message[]> = {
  data: MockConversationMessages,
  status: 'ok',
};
