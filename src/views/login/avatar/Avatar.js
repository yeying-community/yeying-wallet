// @ts-nocheck
import {selectFile} from './File.js'
import {convertBlobToDataUrl, convertCanvasToImage, convertDataUrlToCanvas} from './Image.js'
import {createImgElement, createSymbolElement} from './Common.js'
import {createFixCropper} from './Cropper.js'

export class Avatar {
  constructor(previewElement, frameElement) {
    this.cropper = undefined
    this.previewElement = previewElement
    this.frameElement = frameElement
    this.dataUrl = undefined
    this.reloadElement = createSymbolElement('icon-frame_reload', undefined, {'height': '24px', 'width': '24px'})
    this.frameElement.appendChild(this.reloadElement)
    this.reloadElement.addEventListener('click', () => this.select())
  }

  destroy() {
    if (this.cropper !== undefined) {
      this.cropper.destroy()
      this.cropper = undefined
    }
  }

  updatePreview(dataUrl) {
    this.previewElement.src = dataUrl
    this.dataUrl = dataUrl
  }

  getDataUrl() {
    return this.dataUrl
  }

  select() {
    selectFile(['.png', '.jpg', '.jpeg', '.webp'], false, file => {
      convertBlobToDataUrl(file, (originUrl) => {
        if (this.reloadElement) {
          this.frameElement.removeChild(this.reloadElement)
          this.reloadElement = undefined
        }

        this.destroy()
        const onload = () => {
          this.cropper = createFixCropper(imgElement, {minContainerWidth: 272, minContainerHeight: 206}, () => {
            const croppedCanvas = this.cropper.getCroppedCanvas()
            const croppedUrl = croppedCanvas.toDataURL('image/png')
            convertDataUrlToCanvas(croppedUrl, 128, 128).then((canvas) => {
              this.avatarImage = convertCanvasToImage(canvas, 0.9, 'image/webp')
              this.previewElement.src = this.avatarImage
            })
          })
        }

        const imgElement = createImgElement(originUrl, undefined, onload)
        this.frameElement.appendChild(imgElement)
      })
    })
  }
}
