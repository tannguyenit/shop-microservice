import { Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { IMailDtoOptions } from './dtos/mail.dto';
import { MailDto } from './dtos/mail.dto';

@Entity({ name: 'mails' })
@UseDto(MailDto)
export class MailEntity extends AbstractEntity<MailDto, IMailDtoOptions> {
}
