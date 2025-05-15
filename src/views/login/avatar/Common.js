// @ts-nocheck
export function createSpanElement(clazz, text) {
  const spanElement = document.createElement('span')
  if (clazz) clazz instanceof Array ? clazz.forEach(c => spanElement.classList.add(c)) : spanElement.classList.add(clazz)
  if (text) spanElement.textContent = text
  return spanElement
}

export function createHxElement(tag, clazz, text) {
  const hElement = document.createElement(tag)
  if (clazz) clazz instanceof Array ? clazz.forEach(c => hElement.classList.add(c)) : hElement.classList.add(clazz)
  if (text) hElement.textContent = text
  return hElement
}

export function createDivElement(clazz, text) {
  const divElement = document.createElement('div')
  if (clazz) clazz instanceof Array ? clazz.forEach(c => divElement.classList.add(c)) : divElement.classList.add(clazz)
  if (text) divElement.textContent = text
  return divElement
}

export function createInputElement(type, clazz, attributes) {
  const inputElement = document.createElement('input')
  inputElement.type = 'checkbox'
  if (clazz) clazz instanceof Array ? clazz.forEach(c => inputElement.classList.add(c)) : inputElement.classList.add(clazz)
  if (attributes) Object.keys(attributes).forEach(k => inputElement.setAttribute(k, attributes[k]))
  return inputElement
}

export function createImgElement(dataUrl, clazz, onload) {
  const imgElement = document.createElement('img')
  imgElement.src = dataUrl
  if (clazz) clazz instanceof Array ? clazz.forEach(c => imgElement.classList.add(c)) : imgElement.classList.add(clazz)
  if (onload) imgElement.onload = onload
  return imgElement
}

export function createSymbolElement(name, clazz = undefined, attributes = undefined) {
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  if (clazz) clazz instanceof Array ? clazz.forEach(c => svgElement.classList.add(c)) : svgElement.classList.add(clazz)
  if (attributes) Object.keys(attributes).forEach(k => svgElement.setAttribute(k, attributes[k]))
  // 设置图标的SVG内容
  const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use')
  useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${name}`)
  svgElement.append(useElement)
  return svgElement
}
