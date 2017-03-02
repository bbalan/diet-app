function isCordova() {
  return !!window.cordova
}

function init() {
  if (isCordova) {
    window.StatusBar.backgroundColorByHexString('#0f0')
  } else {
    console.warn('Not running on Cordova')
  }
}

document.addEventListener('deviceready', init, false)
