import PlayerService from '../players/player.service';
import MailDB, { _MailDB } from './mail.db';
import { mailLogger } from './mail.utils';
import { PromiseEventResp, PromiseRequest } from '../lib/PromiseNetEvents/promise.types';
import { DeleteMailDTO, mailInt, updateMailButtonInt } from '../../../typings/mail';

class _MailService {
  private readonly mailDB: _MailDB;

  constructor() {
    this.mailDB = MailDB;
    mailLogger.debug('Mail service started');
  }

  async handleFetchMail(reqObj: PromiseRequest<void>, resp: PromiseEventResp<mailInt[]>) {
    const identifier = PlayerService.getIdentifier(reqObj.source);
    try {
      const mail = await this.mailDB.fetchMail(identifier);
      resp({ status: 'ok', data:mail });
    } catch (e) {
      mailLogger.error(`Error in handleFetchMail, ${e.message}`);
      resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });
    }
  }

  async handleUpdateMailButton(reqObj: PromiseRequest<updateMailButtonInt>, resp: PromiseEventResp<void>) {
    const identifier = PlayerService.getIdentifier(reqObj.source);
    try {
      await this.mailDB.updateButtonMail(reqObj.data.mailid, identifier);
      resp({ status: 'ok' });
      emitNet(reqObj.data.button.buttonEvent, reqObj.source, [reqObj.data.button.buttonData]);
    } catch (e) {
      mailLogger.error(`Error in handleUpdateMailButton, ${e.message}`);
      resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });
    }
  }

    async handleUpdateMailRead(
      reqObj: PromiseRequest<DeleteMailDTO>, 
      resp: PromiseEventResp<DeleteMailDTO>,
    ) {
      const identifier = PlayerService.getIdentifier(reqObj.source);
      try {
        await this.mailDB.updateReadMail(reqObj.data.id, identifier);
        resp({ status: 'ok', data: reqObj.data });
      } catch (e) {
        mailLogger.error(`Error in handleUpdateMailRead, ${e.message}`);
        resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });
      }
    }

  async handleDeleteMail(
    reqObj: PromiseRequest<DeleteMailDTO>,
    resp: PromiseEventResp<DeleteMailDTO>,
  ) {
    const identifier = PlayerService.getIdentifier(reqObj.source);
    try {
      await this.mailDB.deleteMail(reqObj.data.id, identifier);
      resp({ status: 'ok', data: reqObj.data });
    } catch (e) {
      mailLogger.error(`Error in handleDeleteMail, ${e.message}`);
      resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });
    }
  }
}

const MailService = new _MailService();
export default MailService;
