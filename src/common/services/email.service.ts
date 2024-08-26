import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ENV } from '../env.config';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: ENV.EMAIL_SERVER,
      port: 587,
      secure: false,
      auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS,
      },
    });
  }

  async sendEmail(email: string, subject: string, message: string) {
    await this.transporter.sendMail({
      from: `"Gasto Inteligente💵" <${ENV.EMAIL_USER}>`,
      to: email,
      subject,
      html: message,
    });
  }
}
