/**
 * DataURI to ArrayBuffer
 * @param {*} dataURI 
 */
export function dataURIToArrayBuffer(dataURI) {
  // 'data:image/jpeg;dataURI,...' => 'image/jpeg'
  // contentType = contentType || dataURI.match(/^data:([^;]+);base64,/mi)[1] || ''
  dataURI = dataURI.replace(/^data:([^;]+);base64,/gim, '').replace(/\s/g, '')

  const binary = atob(dataURI)
  const len = binary.length
  const buffer = new ArrayBuffer(len)
  const view = new Uint8Array(buffer)

  for (let i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i)
  }

  return buffer
}

/**
 * Base64 to Blob
 * @param  {String} dataURI
 */
export function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString

  /* istanbul ignore else */
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1])
  } else {
    byteString = unescape(dataURI.split(',')[1])
  }

  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia.buffer], {type: mimeString})
}
