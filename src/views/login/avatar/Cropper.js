// @ts-nocheck
import Cropper from 'cropperjs'

/**
 * 截图工具实现了右键单击图片，全屏显示，可以缩放图片，并对图片进行自由方形截图:
 *
 * @param imgElement
 * @param callback
 * @returns {ImageCropper}
 */
export function createFreeCropper(imgElement, callback) {
  return new ImageCropper(imgElement, {autoCrop: false, crop: (e) => callback(e)})
}

export function createFixCropper(imgElement, options, callback) {
  const cropper = new ImageCropper(imgElement, {
    autoCrop: true,
    aspectRatio: 1,
    cropBoxResizable: true,
    autoCropArea: 1.0,
    guides: true,
    center: true,
    minContainerHeight: options.minContainerHeight,
    minContainerWidth: options.minContainerWidth,
    // 将裁切后的图片显示在一个预览区域, 这里绘制太频繁了，严重影响性能
    crop: (e) => callback(e)
  })
  return cropper
}

export function ImageCropper(anchorElement, options) {
  if (options.crop !== undefined) {
    options.crop = debounce(options.crop, options.delay === undefined ? 200 : options.delay)
  }

  /* 覆盖默认配置，生成一份新的配置 */
  this.options = options === undefined ? defaultOptions : {...defaultOptions, ...options,}
  console.log(`cropper instance options=${JSON.stringify(this.options)}`)
  this.anchorElement = anchorElement
  this.cropper = new Cropper(anchorElement, this.options)
}

ImageCropper.prototype.getCroppedCanvas = function () {
  return this.cropper.getCroppedCanvas()
}

/* 生成一张遮盖裁切区域的图片 */
ImageCropper.prototype.getMaskedImage = function () {
  const originImage = this.cropper.getImageData()
  const cropperData = this.cropper.getData(true)

  console.log(`crop box=${JSON.stringify(originImage)}`)
  // 生成新的画布用于绘制裁剪结果
  /*只读属性: naturalWidth：返回图像的原始宽度（以像素为单位） naturalHeight：返回图像的原始高度（以像素为单位）*/
  let canvas = createCanvas(originImage.naturalWidth, originImage.naturalWidth)

  // 在canvas上绘制原始图片
  const context = canvas.getContext('2d')
  context.drawImage(this.anchorElement, 0, 0)

  // 获取画布里面的图像数据
  let imageData = context.getImageData(0, 0, canvas.width, canvas.height)

  // 将图像数据中指定区域设置为透明
  for (let y = cropperData.y; y < cropperData.y + cropperData.height; y++) {
    for (let x = cropperData.x; x < cropperData.x + cropperData.width; x++) {
      let index = (y * canvas.width + x) * 4
      imageData.data[index + 3] = 0 // 设置透明度为0
    }
  }

  // 为图像数据生成一张新的图片
  let newCanvas = createCanvas(canvas.width, canvas.height)
  newCanvas.getContext('2d').putImageData(imageData, 0, 0)
  return newCanvas.toDataURL()
}

ImageCropper.prototype.destroy = function () {
  this.cropper.destroy()
}

function createCanvas(width, height) {
  const newCanvas = document.createElement('canvas')
  newCanvas.width = width
  newCanvas.height = height
  return newCanvas
}

// 使用debounce函数进行节流操作
function debounce(func, delayMs) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(context, args), delayMs)
  }
}

function getCropperAreaScale(imgElement, width, height) {
  // 基于默认长宽，计算一个比例
  const scale = Math.max(width / imgElement.naturalWidth, height / imgElement.naturalHeight)
  console.log(`origin image width=${imgElement.naturalWidth}, height=${imgElement.naturalHeight}, scale=${scale}`)
  return scale
}

const defaultOptions = {
  /**
   * 是否在初始化时允许自动剪裁图片，默认是false
   */
  autoCrop: false,

  /**
   * 拖拽图片模式，默认是crop
   * - crop 形成新的裁剪框
   * - move 图片可移动
   * - none 什么也没有
   */
  dragMode: 'crop',

  /**
   * 定义自动剪裁区域的大小，0-1之间的数值，，默认0.8
   */
  autoCropArea: 0.8,

  /**
   * 是否允许旋转图片, 默认是true
   */
  rotatable: true,

  /**
   * 视图控制，默认是1
   * - 0 无限制
   * - 1 限制裁剪框不能超出图片的范围
   * - 2 限制裁剪框不能超出图片的范围 且图片填充模式为 cover 最长边填充
   * - 3 限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
   */
  viewMode: 1,

  /**
   * 是否显示裁剪框的虚线（九宫格），默认false
   */
  guides: false,

  /**
   * 是否显示裁剪框中间的'+'指示器，默认false
   */
  center: false,

  /**
   * 是否显示裁剪框上面的白色蒙版（很淡），默认false
   */
  highlight: false,

  /**
   * 是否在容器内显示网格状的背景，背景马赛克，默认false
   */
  background: false,

  /**
   * 是否允许移动剪裁框，默认true
   */
  movable: true,

  /**
   * 是否允许改变裁剪框的大小, 默认是true
   */
  resizable: true,

  /**
   * 是否可以缩放图片, 默认是true
   */
  scalable: true,

  /**
   * 是否允许缩放图片大小， 默认是true
   */
  zoomable: true,

  /**
   * 是否可以通过双击切换拖拽图片模式（move和crop）默认true 当拖拽图片模式为none时不可切换 该设置必须浏览器支持双击事件
   */
  toggleDragModeOnDblclick: true,
}
