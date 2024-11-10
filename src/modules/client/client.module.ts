import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ClinetUserModule } from './user/user.module'

const modules = [
  ClinetUserModule,
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
