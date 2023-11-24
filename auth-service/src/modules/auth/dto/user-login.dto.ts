import { StringField } from '../../../decorators';

export class UserLoginDto {
  @StringField()
  readonly email!: string;

  @StringField()
  readonly password!: string;
}
