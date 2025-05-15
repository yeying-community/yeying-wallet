// @ts-nocheck
/**
 * 通过API获取的图片内容，转化为图片元素的源
 *
 * @param data
 * @returns {string}
 */
export function convertUint8ArrayToDataUrl(data) {
  const blob = new Blob([data], {type: 'image/png'})
  // 将Blob转换为DataURL
  return URL.createObjectURL(blob)
}

// 计算DataURL格式图片大小
export function calculateImageSize(dataUrl) {
  // 移除Base64的URL前缀
  let base64WithoutPrefix = dataUrl.split(',')[1]

  // 获取字符串的长度（即Base64编码后的长度）
  let base64Length = base64WithoutPrefix.length

  // 计算文件的大致字节大小
  // Base64编码每4个字符表示3个字节，同时还需考虑末尾的'='填充字符
  let fileSizeBytes = base64Length * 3 / 4

  // 弥补由于末尾可能存在的'='填充字符而造成的计算误差
  if (base64WithoutPrefix.endsWith('==')) {
    fileSizeBytes -= 2 // 末尾有两个'='时，实际数据少了两个字节
  } else if (base64WithoutPrefix.endsWith('=')) {
    fileSizeBytes -= 1 // 末尾有一个'='时，实际数据少了一个字节
  }

  return fileSizeBytes
}

// file/blob对象转化为DataURL格式
export function convertBlobToDataUrl(blob, callback) {
  const fileReader = new FileReader()
  fileReader.onload = (event) => callback(event.target.result)
  // 结果base64编码
  fileReader.readAsDataURL(blob)
}

// SVG的XML代码转换为DataURL格式
export function convertSvgToDataUrl(svgStr) {
  return `data:image/svg+xml;base64,${btoa(decodeURIComponent(encodeURIComponent(svgStr)))}`
}

// 将DataURL转换为指定大小的Canvas上下文图像
export function convertDataUrlToCanvas(dataUrl, width, height) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      console.log(`width=${img.width}, height=${img.height}`)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas)
    }
    img.onerror = () => reject('Fail to convert, you can not get the error, but you can do some recovery things!')
    img.src = dataUrl
  })
}

// 将Canvas转换为图片DataURL
export function convertCanvasToImage(canvas, quality, type = 'image/webp') {
  return canvas.toDataURL(type, quality)
}

/**
 * 将DataURL转化为Uint8Array格式
 *
 * @param dataUrl
 * @returns {ArrayBufferLike}
 */
export function convertDataUrlToUint8Array(dataUrl) {
  let base64String = dataUrl.split(',')[1]
  let binaryString = atob(base64String)
  let bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return bytes
}

export function createFullscreenElement(image, needExit) {
  // 创建一个全屏容器元素
  const containerElement = document.createElement('div')
  // 将全屏容器添加到文档的 body 中
  document.body.appendChild(containerElement)

  containerElement.style.position = 'fixed'
  containerElement.style.top = '0'
  containerElement.style.left = '0'
  containerElement.style.width = '100%'
  containerElement.style.height = '100%'
  containerElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  containerElement.style.display = 'flex'
  containerElement.style.justifyContent = 'center'
  containerElement.style.alignItems = 'center'
  containerElement.style.zIndex = '100'

  // 创建一个全屏图像元素，并设置图片源为点击的图片
  const imageElement = document.createElement('img')
  // 将图像元素添加到全屏容器中
  containerElement.appendChild(imageElement)

  imageElement.src = image
  imageElement.style.maxHeight = '100%'
  imageElement.style.maxWidth = '100%'
  imageElement.style.objectFit = 'contain'
  imageElement.style.zIndex = '100'

  if (!needExit) {
    return containerElement
  }

  function processKeyEvent(event) {
    /* 按ESC键退出全屏模式 */
    if (event.code === 'Escape') {
      document.body.removeChild(containerElement)
      document.removeEventListener('keydown', processKeyEvent)
    }
  }

  document.addEventListener('keydown', processKeyEvent)

  /* 当再次单击任何地方的时候，退出全屏模式。*/
  containerElement.addEventListener('click', () => {
    document.body.removeChild(containerElement)
    document.removeEventListener('keydown', processKeyEvent)
  })
  return containerElement
}
