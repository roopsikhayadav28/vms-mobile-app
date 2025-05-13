import {firebase} from '../firebase.config'
import {getFileName, log} from './helpers'

export type CType = 'image/jpeg' | 'video/mp4' | 'application/pdf'
export async function uploadToFirebaseStorage(
  content: any,
  contentType: CType,
) {
  // log('in UploadToFirebase', content)
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', content, true)
    xhr.send(null)
  })

  // Create a ref in Firebase (I'm using my user's ID)
  if (contentType == 'application/pdf') {
    const ref = firebase
      .storage()
      .ref()
      .child(`documents/${getFileName(content).fileNameWithExtension}`)

    const snapshot = await ref.put(blob, {contentType})
    // Create a download URL
    const remoteURL = await snapshot.ref.getDownloadURL()

    // Return the URL
    log('asset remote url', remoteURL)
    return remoteURL
  }
  if (contentType === 'image/jpeg' || contentType === 'video/mp4') {
    const ref = firebase
      .storage()
      .ref()
      .child(`images/${getFileName(content).fileNameWithExtension}`)

    // Upload Base64 image to Firebase
    const snapshot = await ref.put(blob, {contentType})

    // Create a download URL
    const remoteURL = await snapshot.ref.getDownloadURL()

    // Return the URL
    log('asset remote url', {remoteURL, contentType})
    return remoteURL
  }
}
