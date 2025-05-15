// @ts-nocheck
export function selectFile(acceptList, multiple, callback) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = acceptList.join(',')
  input.multiple = multiple
  input.addEventListener('change', () => callback((!input || input.files.length <= 0) ? undefined : multiple ? input.files : input.files[0]))
  input.click()
}

export function readTextFile(file, callback) {
  const fileReader = new FileReader()
  fileReader.onload = (event) => callback(event.target.result)
  fileReader.readAsText(file)
}

export function downloadByUrl(url, name) {
  const link = document.createElement('a')
  link.href = url
  link.download = name
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(link.href)
  document.body.removeChild(link)
}

export function downloadByBlob(blob, name) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = name
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(link.href)
  document.body.removeChild(link)
}

/**
 * 封装下载函数
 * @param {string} fileName 下载文件的名称
 * @param {Blob|File|string} data 要下载的数据，可以是Blob对象，File对象或字符串
 * @param {string} mimeType 文件的MIME类型，默认为'text/plain'
 */
export function downloadFile(fileName, data, mimeType = 'text/plain') {
  let blobData = data

  // 如果data是字符串，需要先转换为Blob对象
  if (typeof data === 'string') {
    blobData = new Blob([data])
  }

  // 创建一个指向Blob对象的URL
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blobData)
  link.download = fileName

  // 触发下载
  document.body.appendChild(link) // 需要先将link元素添加到文档中
  link.click()

  // 清理资源
  document.body.removeChild(link) // 移除link元素
  URL.revokeObjectURL(link.href) // 释放URL对象
}

export function isPNG(content) {
  return content[0] === 0x89 && content[1] === 0x50 && content[2] === 0x4E && content[3] === 0x47
}
