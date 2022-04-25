import { ResultSetHeader } from 'mysql2';
import DbInterface from '../db/db_wrapper';
import { mailInt } from '../../../typings/mail';

export class _MailDB {
  async fetchMail(identifier: string): Promise<mailInt[]> {
    const query = 'SELECT `citizenid`, `sender`, `subject`, `message`, `read`, `mailid`, `date`, `button` FROM player_mails WHERE citizenid = ? ORDER BY date DESC';
    const [result] = await DbInterface._rawExec(query, [identifier]);
    const data = <mailInt[]>result
    data.forEach(mail => {
      mail.date = mail.date.toString();
      // mail.button = JSON.parse(mail.button); typescript no likey
    })
    return data;
  }

  async updateReadMail(mailId: number, identifier: string): Promise<void> {
    const query = 'UPDATE player_mails SET `read` = ? WHERE mailid = ? AND citizenid = ?';
    await DbInterface._rawExec(query, [true, mailId, identifier]);
  }

  async updateButtonMail(mailId: number, identifier: string): Promise<void> {
    const query = 'UPDATE player_mails SET button = ? WHERE mailid = ? AND citizenid = ?';
    await DbInterface._rawExec(query, ['', mailId, identifier]);
  }

  async deleteMail(mailId: number, identifier: string): Promise<void> {
    const query = 'DELETE FROM player_mails WHERE mailid = ? AND citizenid = ?';
    await DbInterface._rawExec(query, [mailId, identifier]);
  }


}

const MailDB = new _MailDB();

export default MailDB;
