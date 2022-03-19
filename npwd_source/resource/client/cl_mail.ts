import { MailBroadcastAddDTO, MailEvents } from '../../typings/mail';
import { RegisterNuiProxy } from './cl_utils';
import { sendMailEvent } from '../utils/messages';

RegisterNuiProxy(MailEvents.FETCH_ALL_MAIL);
RegisterNuiProxy(MailEvents.UPDATE_MAIL_READ);
RegisterNuiProxy(MailEvents.DELETE_MAIL);
RegisterNuiProxy(MailEvents.UPDATE_MAIL_BUTTON);

onNet('npwd:sendMailBroadcastAddNew', (broadcastEvent: MailBroadcastAddDTO) => {
    const date = new Date()
    const stringDate = date.toString()
    broadcastEvent.mail.date = stringDate
    sendMailEvent(MailEvents.BROADCAST_ADD, broadcastEvent);
});
