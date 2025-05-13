import {ReactNativeFile} from 'extract-files'
import {RNS3} from 'react-native-aws3'
import {log} from '../utils/helpers'
import getEnvVars from './environment'

const accessKey: string = 'AKIASSLHSG4WHXQEPGVW'
const secretKey: string = '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'

export type ContentRef = {
  url: string
  mimeType: 'image/jpeg' | 'image/png' | 'video/mp4' | 'application/pdf'
}

type Options = {
  bucket: string
  region: string
  accessKey: string
  secretKey: string
  successActionStatus: number
  keyPrefix: string
}

const optionsForImages: Options = {
  keyPrefix: getEnvVars().keyPrefix,
  bucket: 'vms-app-assets',
  region: 'ap-south-1',
  accessKey,
  secretKey,
  successActionStatus: 201,
}
const optionsForVideos: Options = {
  keyPrefix: getEnvVars().keyPrefix,
  bucket: 'vms-app-assets-videos',
  region: 'ap-south-1',
  accessKey,
  secretKey,
  successActionStatus: 201,
}

const optionsForPdf: Options = {
  keyPrefix: getEnvVars().keyPrefix,
  bucket: 'vms-app-assets-pdf',
  region: 'ap-south-1',
  accessKey,
  secretKey,
  successActionStatus: 201,
}

/* export class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      // tslint:disable-next-line:no-bitwise
      const r = (Math.random() * 16) | 0
      // tslint:disable-next-line:no-bitwise
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
} */

export function extractFileNameFromUrl(url: string) {
  log(`extract file name from url: `, url)
  const uidArr = url.split('/')
  return uidArr[uidArr.length - 1]
}

export function getFileName(url: string) {
  if (!url) {
    return {
      onlyFileName: undefined,
      fileNameWithExtension: undefined,
    }
  }
  const fileNameWithExtension = url.split('/').pop().split('#')[0].split('?')[0]
  const onlyFileName = fileNameWithExtension.replace(/\.[^/.]+$/, '')
  return {
    onlyFileName,
    fileNameWithExtension,
  }
}

// export async function convertMediaForFileUpload(
//   content: ContentRef,
//   useBlob: boolean = false,
// ) {
//   log('content input at convert medie file', content)

//   if (useBlob) {
//     console.log('Inside useBlob')
//     const fetchResponse = await fetch(content.url)
//     const blob = await fetchResponse.blob()
//     console.log('Blob' + JSON.stringify(blob))
//     return blob
//   }

//   const uploadFile = new ReactNativeFile({
//     name: extractFileNameFromUrl(content.url),
//     type:
//       content.contentType === ContentType.IMAGE
//         ? 'image/jpeg'
//         : content.contentType === ContentType.VIDEO
//         ? 'video/mp4'
//         : 'audio/mp3',
//     uri: content.url,
//   })
//   return uploadFile
// }

export function convertMediaForFileUpload(content: ContentRef) {
  log('content input at convert medie file', content)
  log('file name to upload', extractFileNameFromUrl(content.url))
  const uploadFile = new ReactNativeFile({
    name: extractFileNameFromUrl(content.url),
    type: content.mimeType,
    uri: content.url,
  })
  // log('package uploaded React Native File', uploadFile)
  return uploadFile
}

export default async function uploadToS3(content: ContentRef) {
  const file = convertMediaForFileUpload(content)
  switch (content.mimeType) {
    case 'image/jpeg':
      const responseForJpeg = await RNS3.put(file, optionsForImages)
      log('uploaded image', responseForJpeg)

      return responseForJpeg?.body?.postResponse?.location?.replace(
        'https://vms-app-assets.s3.amazonaws.com/',
        'https://vms-assets.tractorjunction.in/',
      )
    case 'image/png':
      const responseForPng = await RNS3.put(file, optionsForImages)
      log('uploaded pdf', responseForPng)

      return responseForPng?.body?.postResponse?.location?.replace(
        'https://vms-app-assets.s3.amazonaws.com/',
        'https://vms-assets.tractorjunction.in/',
      )
    case 'video/mp4':
      const responseForVideos = await RNS3.put(file, optionsForVideos)
      log('uploaded video', responseForVideos)
      return responseForVideos?.body?.postResponse?.location
    case 'application/pdf':
      log('in pdf here', [])

      const responseForPdf = await RNS3.put(file, optionsForPdf)
      log('uploaded pdf', responseForPdf)
      return responseForPdf?.body?.postResponse?.location
    default:
      break
  }
}
