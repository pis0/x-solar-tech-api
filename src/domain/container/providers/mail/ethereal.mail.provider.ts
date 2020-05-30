import IMail from '@domain/container/providers/mail/imail';
import nodemailer, { Transporter } from 'nodemailer';

export default class EtherealMailProvider implements IMail {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  public async sendMail(
    from: string,
    to: string,
    subject: string,
    text: string,
  ): Promise<void> {
    const result = await this.client.sendMail({
      from, to, subject, text,
    });
    console.log('Message sent: ', result.messageId, nodemailer.getTestMessageUrl(result));
  }
}
