import {UserMailer} from "../User/UserModel";

export class MailService implements UserMailer{
    sendVerificationMail(email: string, verificationCode: string) {}
}