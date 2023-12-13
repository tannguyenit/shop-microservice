import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { UserDto, type UserDtoOptions } from './dto/user.dto';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto, UserDtoOptions> {
  @Column({ unique: true, nullable: true, type: 'varchar' })
  email!: string;

  @Column({ nullable: true, type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar' })
  displayName!: string;

  @Column({ type: 'varchar' })
  photoURL!: string;

  @Column({ type: 'varchar' })
  phoneNumber!: string;

  @Column({ type: 'varchar' })
  country!: string;

  @Column({ type: 'varchar' })
  address!: string;

  @Column({ type: 'varchar' })
  state!: string;

  @Column({ type: 'varchar' })
  city!: string;

  @Column({ type: 'varchar' })
  zipCode!: string;

  @Column({ type: 'varchar' })
  about!: string;

  @Column({ type: 'varchar' })
  role!: string;

  @Column({ type: 'int' })
  isPublic!: boolean;
}
