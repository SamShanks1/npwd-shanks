import PlayerService from '../players/player.service';
import {
  Message,
  MessageConversationResponse,
  MessageEvents,
  PreDBMessage,
} from '../../../typings/messages';
import MessagesDB, { _MessagesDB } from './messages.db';
import {
  createMessageGroupsFromPhoneNumber,
  getFormattedMessageConversations,
  getIdentifiersFromParticipants,
  messagesLogger,
} from './messages.utils';
import { PromiseEventResp, PromiseRequest } from '../lib/PromiseNetEvents/promise.types';

class _MessagesService {
  private readonly messagesDB: _MessagesDB;

  constructor() {
    this.messagesDB = MessagesDB;
    messagesLogger.debug('Messages service started');
  }

  async handleFetchMessageConversations(reqObj: PromiseRequest, resp: PromiseEventResp<any>) {
    try {
      const phoneNumber = PlayerService.getPlayer(reqObj.source).getPhoneNumber();
      const messageConversations = await getFormattedMessageConversations(phoneNumber);

      resp({ status: 'ok', data: messageConversations });
    } catch (e) {
      resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });
      messagesLogger.error(`Failed to fetch messages groups, ${e.message}`);
    }
  }

  async handleCreateMessageConversation(
    reqObj: PromiseRequest<{ targetNumber: string }>,
    resp: PromiseEventResp<MessageConversationResponse>,
  ) {
    try {
      const sourcePlayer = PlayerService.getPlayer(reqObj.source);

      const result = await createMessageGroupsFromPhoneNumber(
        sourcePlayer.getPhoneNumber(),
        reqObj.data.targetNumber,
      );

      if (result.error) {
        return resp({ status: 'error' });
      }

      if (!result.doesExist) {
        try {
          const participant = PlayerService.getPlayerFromIdentifier(result.participant);

          if (participant) {
            emitNet(MessageEvents.CREATE_MESSAGE_CONVERSATION_SUCCESS, participant.source, {
              conversation_id: result.conversationId,
              phoneNumber: sourcePlayer.getPhoneNumber(),
            });
          }
        } catch (e) {
          resp({ status: 'error', errorMsg: e.message });
          messagesLogger.error(e.message);
        }
      }

      resp({
        status: 'ok',
        data: {
          conversation_id: result.conversationId,
          phoneNumber: result.phoneNumber,
          updatedAt: Date.now(),
        },
      });
    } catch (e) {
      resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });

      messagesLogger.error(`Failed to create message group, ${e.message}`, {
        source: reqObj.source,
        e,
      });
    }
  }

  async handleFetchMessages(
    reqObj: PromiseRequest<{ conversationId: string; page: number }>,
    resp: PromiseEventResp<Message[]>,
  ) {
    try {
      const messages = await this.messagesDB.getMessages(
        reqObj.data.conversationId,
        reqObj.data.page,
      );

      await this.handleSetMessageRead(reqObj.source, reqObj.data.conversationId);

      messages.sort((a, b) => a.id - b.id);

      resp({ status: 'ok', data: messages });
    } catch (e) {
      resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });
      messagesLogger.error(`Failed to fetch messages, ${e.message}`, {
        source: reqObj.source,
      });
    }
  }

  async handleSendMessage(reqObj: PromiseRequest<PreDBMessage>, resp: PromiseEventResp<Message>) {
    try {
      const player = PlayerService.getPlayer(reqObj.source);
      const authorPhoneNumber = player.getPhoneNumber();
      const messageData = reqObj.data;
      const participants = getIdentifiersFromParticipants(messageData.conversationId);
      const userIdentifier = player.getIdentifier();

      const messageId = await this.messagesDB.createMessage(
        userIdentifier,
        authorPhoneNumber,
        messageData.conversationId,
        messageData.message,
        messageData.is_embed,
        messageData.embed,
      );

      await this.messagesDB.setMessageUnread(
        messageData.conversationId,
        messageData.tgtPhoneNumber,
      );

      resp({
        status: 'ok',
        data: {
          ...messageData,
          conversation_id: messageData.conversationId,
          author: authorPhoneNumber,
          id: messageId,
          message: messageData.message,
          embed: messageData.embed,
          is_embed: messageData.is_embed,
        },
      });

      // participantId is the participants phone number
      for (const participantId of participants) {
        if (participantId !== player.getPhoneNumber()) {
          const participantIdentifier = await PlayerService.getIdentifierByPhoneNumber(
            participantId,
            true,
          );

          const participantPlayer = PlayerService.getPlayerFromIdentifier(participantIdentifier);

          if (participantPlayer) {
            emitNet(MessageEvents.SEND_MESSAGE_SUCCESS, participantPlayer.source, messageData);
            emitNet(MessageEvents.CREATE_MESSAGE_BROADCAST, participantPlayer.source, {
              conversationName: player.getPhoneNumber(),
              conversationId: messageData.conversationId,
              message: messageData.message,
              is_embed: messageData.is_embed,
              embed: messageData.embed,
            });
          }
        }
      }
    } catch (e) {
      resp({ status: 'error', errorMsg: e.message });
      messagesLogger.error(`Failed to send message, ${e.message}`, {
        source: reqObj.source,
      });
    }
  }

  // I didn't bother creating a new interface. Will do it soonTM.
  async handleOnMessageSendResponse(reqObj: any) {
    const messageData = reqObj.data;

    const messageId = await this.messagesDB.createMessage(
      messageData.author,
      messageData.author,
      messageData.conversation_id,
      messageData.message,
    );

    const respData = {
      ...messageData,
      id: messageId,
    };

    emitNet(MessageEvents.SEND_MESSAGE_SUCCESS, reqObj.source, respData);
  }

  async handleSetMessageRead(src: number, groupId: string) {
    try {
      const identifier = PlayerService.getPlayer(src).getPhoneNumber();
      await this.messagesDB.setMessageRead(groupId, identifier);
    } catch (e) {
      messagesLogger.error(`Failed to set message as read, ${e.message}`, {
        source: src,
      });
    }
  }

  async handleDeleteConversation(
    reqObj: PromiseRequest<{ conversationsId: string[] }>,
    resp: PromiseEventResp<void>,
  ) {
    try {
      const sourcePhoneNumber = PlayerService.getPlayer(reqObj.source).getPhoneNumber();

      for (const id of reqObj.data.conversationsId) {
        await this.messagesDB.deleteConversation(id, sourcePhoneNumber);
      }
      resp({ status: 'ok' });
    } catch (e) {
      resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });
      messagesLogger.error(`Failed to delete conversation, ${e.message}`, {
        source: reqObj.source,
      });
    }
  }

  async handleDeleteMessage(reqObj: PromiseRequest<Message>, resp: PromiseEventResp<void>) {
    try {
      await this.messagesDB.deleteMessage(reqObj.data);
      resp({ status: 'ok' });
    } catch (e) {
      resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });
      messagesLogger.error(`Failed to delete message, ${e.message}`, {
        source: reqObj.source,
      });
    }
  }
}

const MessagesService = new _MessagesService();

export default MessagesService;
