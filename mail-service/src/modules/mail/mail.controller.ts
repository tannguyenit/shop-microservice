import {
  Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MailService } from './mail.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('mails')
@ApiTags('mails')
export class MailController {
  constructor(private mailService: MailService) {}

  @EventPattern('user_created')
  handleUserCreate(@Payload() data: any)
  {
    this.mailService.handleUserCreate(data)
  }
}
