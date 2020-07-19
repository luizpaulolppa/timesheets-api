import { User } from "../models/User";
import nodemailer from 'nodemailer';
import mailConfig from '../config/mailConfig';
import EmailTemplate from '../utils/EmailTemplate';
import EmailParameterDTO from "../dtos/EmailParameterDTO";

export default class MailService {

  public async sendConfirmation(user: User): Promise<void> {
    const transporter = nodemailer.createTransport(mailConfig);
    const params: EmailParameterDTO[] = [
      {
        key: 'link',
        value: `${process.env.BASE_URL_WEB_APP}/confirmation?id=${user.id}`
      }
    ];
    const html = await new EmailTemplate().buildEmailTemplate('email-confirmation', params);
    await transporter.sendMail({
      from: 'naoresponda@timesheet.com',
      to: [user.email],
      subject: `Hello ${user.name}`,
      html
    });
  }
}
