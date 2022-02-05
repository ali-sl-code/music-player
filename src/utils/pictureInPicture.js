const canvas = document.createElement('canvas')
canvas.width = canvas.height = 512

const video = document.createElement('video')
video.srcObject = canvas.captureStream()
video.muted = true

export default async function showPictureInPictureWindow(visible) {
  if (visible) {
    const image = new Image()
    image.crossOrigin = true
    image.src = [...navigator.mediaSession.metadata.artwork].pop().src
    await image.decode()
    canvas.getContext('2d').drawImage(image, 0, 0, 512, 512)
    await video.play()
    await video.requestPictureInPicture()
  } else {
    await document.exitPictureInPicture()
  }
}
