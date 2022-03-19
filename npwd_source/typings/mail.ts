export interface mailInt {
  sender: string;
  subject: string;
  message: string;
  mailid: number;
  read: number;
  date: string;
  button?: buttonContentInt;
}

interface buttonContentInt {
  buttonEvent: string;
    enabled: boolean;
    buttonData:{
      dealer: string;
      itemData: {
        minrep: number;
        item: string;
      };
      amount: number;
      locationLabel: string;
      coords: {
        x: number;
        y: number;
        z: number;
      };
    }
}

export interface buttonInt {
  button: buttonContentInt;
}

export interface updateMailButtonInt {
  mailid: number;
  button: buttonContentInt;
}

export interface AddMailExportData {
  subject?: string;
  message?: string;
}
export interface MailBroadcastAddDTO {
  mail: mailInt;
}

export interface DeleteMailDTO {
  id: number;
}

export enum MailEvents {
  FETCH_ALL_MAIL = 'npwd:fetchAllMail',
  DELETE_MAIL = 'npwd:deleteMail',
  UPDATE_MAIL_READ = 'npwd:updateReadMail',
  UPDATE_MAIL_BUTTON = 'npwd:updateButtonMail',
  BROADCAST_ADD = 'npwd:sendMailBroadcastAdd',
}