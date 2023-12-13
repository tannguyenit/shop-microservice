import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type FindOptionsWhere, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { ClientProxy } from '@nestjs/microservices';

import { UserRegisterDto } from '../auth/dto/user-register.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @Inject('MAIL_SERVICE') private readonly mailClient: ClientProxy
  ) {}

  /**
   * Find single user
   */
  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(findData);
  }

  @Transactional()
  async createUser(
    userRegisterDto: UserRegisterDto,
  ): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);

    await this.userRepository.save(user);
    this.mailClient.emit('user_created', user)

    return user;
  }
}
