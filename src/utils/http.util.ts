import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

export async function postRequest(
  httpService: HttpService,
  baseUrl: string,
  endpoint: string,
  apiKey: string,
  apiSecret: string,
  data: any,
): Promise<any> {
  const url = `${baseUrl}/${endpoint}?api_key=${apiKey}&api_secret=${apiSecret}`
  const response = await lastValueFrom(
    httpService.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  )
  return response.data
}
