import { mailInt, MailEvents, DeleteMailDTO, updateMailButtonInt } from '../../../typings/mail';
import MailService from './mail.service';
import { mailLogger } from './mail.utils';
import { onNetPromise } from '../lib/PromiseNetEvents/onNetPromise';

onNetPromise<void, mailInt[]>(MailEvents.FETCH_ALL_MAIL, async (reqObj, resp) => {
    MailService.handleFetchMail(reqObj, resp).catch((e) => {
    mailLogger.error(
      `Error occurred in fetch mail event (${reqObj.source}), Error:  ${e.message}`,
    );
    resp({ status: 'error', errorMsg: 'UNKNOWN_ERROR' });
  });
});

onNetPromise<DeleteMailDTO, DeleteMailDTO>(MailEvents.UPDATE_MAIL_READ, async (reqObj, resp) => {
  MailService.handleUpdateMailRead(reqObj, resp).catch((e) => {
    mailLogger.error(`Error occured in updating mail read state (${reqObj.source}), Error:  ${e.message}`);
    resp({ status: 'error', errorMsg: 'UNKNOWN_ERROR' });
  });
});

onNetPromise<updateMailButtonInt, void>(MailEvents.UPDATE_MAIL_BUTTON, async (reqObj, resp) => {
  MailService.handleUpdateMailButton(reqObj, resp).catch((e) => {
    mailLogger.error(`Error occured in updating mail read state (${reqObj.source}), Error:  ${e.message}`);
    resp({ status: 'error', errorMsg: 'UNKNOWN_ERROR' });
  });
});

onNetPromise<DeleteMailDTO, DeleteMailDTO>(MailEvents.DELETE_MAIL, async (reqObj, resp) => {
  MailService.handleDeleteMail(reqObj, resp).catch((e) => {
    mailLogger.error(
      `Error occured in delete mail event (${reqObj.source}), Error:  ${e.message}`,
    );
    resp({ status: 'error', errorMsg: 'UNKNOWN_ERROR' });
  });
});
