(function flexible (window, document) {
	//获取html根元素
  var docEl = document.documentElement
  //dpr物理像素比，如果没有这个属性（设备像素）就当作1
  var dpr = window.devicePixelRatio || 1

  // adjust body font size设置body字体大小
  function setBodyFontSize () {
	  //如果有body这个元素
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
	//如果没有则等dom全部加载完毕再设置body字体大小
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10  设置html元素字体大小，划分十等份
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize  当我们页面大小发生变化时重新设置rem大小
  window.addEventListener('resize', setRemUnit)
  //pageshow：页面重新加载时触发的事件
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {  //返回true，如果是缓存取出的页面也要重新计算大小
      setRemUnit()
    }
  })

  // detect 0.5px supports 有些浏览器不支持0.5像素写法
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
