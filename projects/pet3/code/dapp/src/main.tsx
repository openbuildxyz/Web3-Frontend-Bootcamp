// import './index.css'

import { Pet } from './pet/Pet'

function initDom() {
  const root = document.createElement('div')
  root.id = 'pet3-wrapper'
  document.body.appendChild(root)

  const style = document.createElement('style')
  style.innerHTML = `
#pet3-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  overflow: hidden;
  pointer-events: none;
}
	`
  document.head.appendChild(style)

  const handlerDom = document.createElement('div')
  handlerDom.id = 'pet3-handler'
  handlerDom.style.transform = `translate(var(--pet3-handler-x), var(--pet3-handler-y)) rotate(var(--pet3-rotate))`
  document.body.appendChild(handlerDom)
  const handlerStyle = document.createElement('style')
  handlerStyle.innerHTML = `
#pet3-handler {
  --pet3-handler-x: 0px;
  --pet3-handler-y: 0px;
  --pet3-rotate: 0rad;
  height: 80px;
  width: 60px;
  background: transparent;
  position: fixed;
	top: 0;
	left: 0;
  z-index: 10000;
}
	`
  document.head.appendChild(handlerStyle)
}
initDom()
Pet()
