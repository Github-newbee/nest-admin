import { HttpService } from '@nestjs/axios'
import { Injectable, NotFoundException } from '@nestjs/common'
import dayjs from 'dayjs'
import { isNil } from 'lodash'
import {
  fileRename,
  getExtname,
  getFilePath,
  getFileType,
  getSize,
  saveLocalFile,
} from '~/utils/file.util'
import { postRequest } from '~/utils/http.util'

@Injectable()
export class MeituService {
  private readonly baseUrl = 'https://openapi.mtlab.meitu.com/v1'
  private readonly apiKey = '47ea7a0a3247407c8ded86fcc5e3cd8c'
  private readonly apiSecret = '26d38ed8f0cf4aa38de5a0b8aa293d4f'

  constructor(
    private readonly httpService: HttpService,
  ) {}

  async saveFile(file: any, uid: number) {
    if (isNil(file))
      throw new NotFoundException('Have not any file to upload!')

    const fileName = file.filename
    const size = getSize(file.file.bytesRead)
    const extName = getExtname(fileName)
    const type = getFileType(extName)
    const name = fileRename(fileName)
    const currentDate = dayjs().format('YYYY-MM-DD')
    const path = getFilePath(name, currentDate, type)
    // 保存文件到本地
    saveLocalFile(await file.toBuffer(), name, currentDate, type)

    // 将文件转换为 Base64 编码
    const fileBuffer = await file.toBuffer()
    const base64File = fileBuffer.toString('base64')

    // 构建请求体
    const requestBody = {
      parameter: {
        rsp_media_type: 'url',
      },
      extra: {},
      media_info_list: [
        {
          media_data: base64File,
          media_profiles: {
            media_data_type: 'jpg',
          },
        },
      ],
    }
    // 使用通用的 HTTP POST 请求方法
    const response = await postRequest(
      this.httpService,
      this.baseUrl,
      'EmojMaterialH5',
      this.apiKey,
      this.apiSecret,
      requestBody,
    )
    console.log('🚀 ~ MeituService ~ saveFile ~ response:', response)

    // 处理响应
    const fileUrl = response.media_info_list[0].media_data

    // 保存文件信息到数据库
    // await this.storageRepository.save({
    //   name,
    //   fileName,
    //   extName,
    //   path,
    //   type,
    //   size,
    //   userId: userId.toString(), // 确保 userId 是字符串类型
    // });

    return fileUrl
  }
}
