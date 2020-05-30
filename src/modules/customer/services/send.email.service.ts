import { injectable, inject } from 'tsyringe';
import IMail from '@domain/container/providers/mail/imail';
import IMessage from '@domain/container/providers/mail/imessage';

@injectable()
class SendEmailService {
  private mailProvider: IMail;

  constructor(
    @inject('MailProvider')
      mailProvider: IMail,
  ) {
    this.mailProvider = mailProvider;
  }

  public async run({
    from, to, subject, text,
  }: IMessage): Promise<any> {
    return this.mailProvider.sendMail(from, to, subject, text);
  }
}


export default SendEmailService;
