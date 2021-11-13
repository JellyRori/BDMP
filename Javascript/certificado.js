const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const downloadBtn = document.getElementById('descargarbtn')

const image = new Image()
image.src = 'certificado.png'
image.onload = function () {
	drawImage()
}

function drawImage() {
	// ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
	ctx.font = '40px monotype corsiva'
	ctx.fillStyle = '#ffff'
	ctx.fillText("Diluc", 300, 250)    //nameInput.value
	ctx.fillText("Por Haber Terminado El Curso De", 100, 290)
	ctx.fillText("Programacion Para Novatos", 150, 330)
	ctx.fillText("11-11-21", 150, 380)


    
}



downloadBtn.addEventListener('click', function () {
	downloadBtn.href = canvas.toDataURL('image/jpg')
	downloadBtn.download = 'Certificate - ' //+ nameInput.value
})