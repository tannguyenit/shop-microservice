import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { MailEntity } from '../mail.entity';

export interface IMailDtoOptions {
}

export class MailDto extends AbstractDto {
  constructor(entityName: MailEntity, _?: IMailDtoOptions) {
    super(entityName);
  }
}
