import crypto from 'node:crypto'
import qs from 'node:querystring'
import url from 'node:url'
import util from 'node:util'
import fetch from 'node-fetch'
import { env } from '~/global/env'

const debuglog = util.debuglog('signer')
/**
 * 不参与加签过程的 header key
 */
const HEADER_KEYS_TO_IGNORE = new Set([
  'authorization',
  'content-type',
  'content-length',
  'user-agent',
  'presigned-expires',
  'expect',
])

/**
 * @description 抖音火山引擎大模型调用工具类
 * @param data 模型相关参数
 * @param query query请求参数
 * @param method 请求方法 默认为POST
 * @param contentType 请求的content-type 默认为application/json
 * @returns
 */
async function doRequestModel(data, query, method = 'POST', contentType = 'application/json') {
  const queryString = JSON.stringify(data)
  // 签名生成参数
  const signParams = {
    headers: {
      // x-date header 是必传的
      'X-Date': getDateTimeNow(),
    },
    method,
    query,
    accessKeyId: env('MODEL_ACCESS_KEY_ID'),
    secretAccessKey: env('MODEL_SECRET_ACCESS_KEY'),
    serviceName: 'cv',
    region: 'cn-north-1',
    bodySha: getBodySha(queryString),
  }
  // 正规化 query object， 防止串化后出现 query 值为 undefined 情况
  for (const [key, val] of Object.entries(signParams.query)) {
    if (val === undefined || val === null) {
      signParams.query[key] = ''
    }
  }
  const authorization = sign(signParams)
  const baseUrl = 'https://visual.volcengineapi.com'
  const res = await fetch(`${baseUrl}/?${qs.stringify(signParams.query)}`, {
    headers: {
      ...signParams.headers,
      'Authorization': authorization,
      'Content-Type': contentType,
    },
    method: signParams.method,
    body: queryString,
  })
  const responseText = await res.text()
  return JSON.parse(responseText)
}

export { doRequestModel }

function sign(params) {
  const {
    headers = {},
    query = {},
    region = '',
    serviceName = '',
    method = '',
    pathName = '/',
    accessKeyId = '',
    secretAccessKey = '',
    needSignHeaderKeys = [],
    bodySha,
  } = params
  const datetime = headers['X-Date']
  const date = datetime.substring(0, 8) // YYYYMMDD
  // 创建正规化请求
  const [signedHeaders, canonicalHeaders] = getSignHeaders(headers, needSignHeaderKeys)
  const canonicalRequest = [
    method.toUpperCase(),
    pathName,
    queryParamsToString(query) || '',
    `${canonicalHeaders}\n`,
    signedHeaders,
    bodySha || hash(''),
  ].join('\n')
  const credentialScope = [date, region, serviceName, 'request'].join('/')
  // 创建签名字符串
  const stringToSign = ['HMAC-SHA256', datetime, credentialScope, hash(canonicalRequest)].join('\n')
  // 计算签名
  const kDate = hmac(secretAccessKey, date)
  const kRegion = hmac(kDate, region)
  const kService = hmac(kRegion, serviceName)
  const kSigning = hmac(kService, 'request')
  const signature = hmac(kSigning, stringToSign).toString('hex')
  debuglog('--------CanonicalString:\n%s\n--------SignString:\n%s', canonicalRequest, stringToSign)

  return [
    'HMAC-SHA256',
    `Credential=${accessKeyId}/${credentialScope},`,
    `SignedHeaders=${signedHeaders},`,
    `Signature=${signature}`,
  ].join(' ')
}

function hmac(secret, s) {
  return crypto.createHmac('sha256', secret).update(s, 'utf8').digest()
}

function hash(s) {
  return crypto.createHash('sha256').update(s, 'utf8').digest('hex')
}

function queryParamsToString(params) {
  return Object.keys(params)
    .sort()
    .map((key) => {
      const val = params[key]
      if (typeof val === 'undefined' || val === null) {
        return undefined
      }
      const escapedKey = uriEscape(key)
      if (!escapedKey) {
        return undefined
      }
      if (Array.isArray(val)) {
        return `${escapedKey}=${val.map(uriEscape).sort().join(`&${escapedKey}=`)}`
      }
      return `${escapedKey}=${uriEscape(val)}`
    })
    .filter(v => v)
    .join('&')
}

function getSignHeaders(originHeaders, needSignHeaders) {
  function trimHeaderValue(header) {
    return header.toString?.().trim().replace(/\s+/g, ' ') ?? ''
  }

  let h = Object.keys(originHeaders)
  // 根据 needSignHeaders 过滤
  if (Array.isArray(needSignHeaders)) {
    const needSignSet = new Set([...needSignHeaders, 'x-date', 'host'].map(k => k.toLowerCase()))
    h = h.filter(k => needSignSet.has(k.toLowerCase()))
  }
  // 根据 ignore headers 过滤
  h = h.filter(k => !HEADER_KEYS_TO_IGNORE.has(k.toLowerCase()))
  const signedHeaderKeys = h
    .slice()
    .map(k => k.toLowerCase())
    .sort()
    .join(';')
  const canonicalHeaders = h
    .sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
    .map(k => `${k.toLowerCase()}:${trimHeaderValue(originHeaders[k])}`)
    .join('\n')
  return [signedHeaderKeys, canonicalHeaders]
}

function uriEscape(str) {
  try {
    return encodeURIComponent(str)
      .replace(/[^\w.~\-%]+/g, escape)
      .replace(/\*/g, ch => `%${ch.charCodeAt(0).toString(16).toUpperCase()}`)
  }
  catch (e) {
    return ''
  }
}

function getDateTimeNow() {
  const now = new Date()
  return now.toISOString().replace(/[:-]|\.\d{3}/g, '')
}

// 获取 body sha256
function getBodySha(body) {
  const hash = crypto.createHash('sha256')
  if (typeof body === 'string') {
    hash.update(body)
  }
  else if (body instanceof url.URLSearchParams) {
    hash.update(body.toString())
  }
  else if (Buffer.isBuffer(body)) {
    hash.update(body)
  }
  return hash.digest('hex')
}
