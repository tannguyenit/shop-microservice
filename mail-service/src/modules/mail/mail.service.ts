import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

  constructor(
    private mailerService: MailerService
  ) {}

  async handleUserCreate(data: any) {
    const url = `example.com/auth/confirm?token=token`;

    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Welcome to DemoMicroservice! Notification Email',
      template: './user-create',
      context: {
        name: data.displayName,
        url,
      },
    });
  }
}
