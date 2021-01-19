import {UserMailer} from "../User/UserModel";
import * as nodemailer from "nodemailer";
import Mail = require("nodemailer/lib/mailer");

export class MailService implements UserMailer{
    transporter: Mail;

    constructor(user: string, password: string) {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: user,
                pass: password
            }
        });
    }

    sendVerificationMail(email: string, verificationCode: string) {
        this.transporter.sendMail({
            to: email,
            html: `<h3><a href="/verify-email/${verificationCode}">Verify</a></h3>`
        })
    }
}