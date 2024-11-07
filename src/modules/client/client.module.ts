import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { UserModule } from './user/user.module'

const modules = [
  UserModule,
]

@Module({
  imports: [
    ...modules,
    RouterModule.register([
      {
        path: 'client',
        module: ClientModule,
        children: [...modules],
      },
    ]),
  ],
  exports: [...modules],
})
export class ClientModule {}
