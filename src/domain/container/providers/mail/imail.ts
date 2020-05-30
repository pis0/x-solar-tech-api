export default interface IMail {
  sendMail(from: string, to: string, subject: string, text: string): Promise<void>;
  // eslint-disable-next-line semi
}
