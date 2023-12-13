import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.NATS,
        options: {}
      },
    ]),
  ],
  exports: [UserService],
  providers: [UserService]
})
export class UserModule {}
