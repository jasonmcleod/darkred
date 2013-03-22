function transparentImage(img) {
    var canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img,0,0)
    var imgsrc = ctx.getImageData(0,0,img.width,img.height)
    var imgdata = imgsrc.data
    for (var i = 0, n = imgdata.length; i <n; i += 4) {
        if(imgdata[i] == 255 && imgdata[i+2] == 255) {
            imgdata[i+3] = 0
        }
    }

    ctx.putImageData(imgsrc, 0, 0)

    return canvas
}