import { AbstractDto } from '../../../common/dto/abstract.dto';
import {
  EmailFieldOptional,
  StringFieldOptional,
} from '../../../decorators';
import { type UserEntity } from '../user.entity';

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends AbstractDto {
  @StringFieldOptional()
  password: string;

  @StringFieldOptional()
  displayName: string;

  @StringFieldOptional({ nullable: true })
  email: string;

  @EmailFieldOptional({ nullable: true })
  photoURL?: string | null;

  @StringFieldOptional({ nullable: true })
  phoneNumber?: string | null;

  @StringFieldOptional({ nullable: true })
  country?: string | null;

  @StringFieldOptional()
  address?: string | null;

  @StringFieldOptional()
  state?: string | null;

  @StringFieldOptional()
  city?: string | null;

  @StringFieldOptional()
  zipCode?: string | null;

  @StringFieldOptional()
  about?: string | null;

  @StringFieldOptional()
  role?: string | null;

  @StringFieldOptional()
  isPublic?: Boolean | null;

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email;
    this.password = user.password;
    this.displayName = user.displayName;
    this.photoURL = user.photoURL;
    this.phoneNumber = user.phoneNumber;
    this.country = user.country;
    this.address = user.address;
    this.state = user.state;
    this.city = user.city;
    this.zipCode = user.zipCode;
    this.about = user.about;
    this.role = user.role;
    this.isPublic = user.isPublic;
  }
}
