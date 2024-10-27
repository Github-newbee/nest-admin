declare global {
  interface IAuthUser {
    uid: bigint
    pv: number
    /** 过期时间 */
    exp?: number
    /** 签发时间 */
    iat?: number
    roles?: string[]
  }

  export interface IBaseResponse<T = any> {
    message: string
    code: number
    data?: T
  }

  export interface IListRespData<T = any> {
    items: T[]
  }
}

export {}
