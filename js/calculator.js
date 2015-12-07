var http_request;

var font;
var color;
var opacity;

var calcstr;

function calculatorinit() {
	calcstr = "";
	
	font = System.Gadget.Settings.readString('font') || 'Arial';
	color = System.Gadget.Settings.readString('color') || 'white';
	opacity = System.Gadget.Settings.read('opacity') || 30;
	
	var background = document.getElementById('background');
	background.removeObjects();

	background.addImageObject('images/btn1.jpg', 8, 29);
	background.addImageObject('images/btn1.jpg', 38, 29);
	background.addImageObject('images/btn1.jpg', 68, 29);
	background.addImageObject('images/btn1.jpg', 98, 29);
	background.addImageObject('images/btn1.jpg', 8, 54);
	background.addImageObject('images/btn1.jpg', 38, 54);
	background.addImageObject('images/btn1.jpg', 68, 54);
	background.addImageObject('images/btn1.jpg', 98, 54);
	background.addImageObject('images/btn1.jpg', 8, 79);
	background.addImageObject('images/btn1.jpg', 38, 79);
	background.addImageObject('images/btn1.jpg', 68, 79);
	background.addImageObject('images/btn1.jpg', 98, 79);
	background.addImageObject('images/btn1.jpg', 8, 104);
	background.addImageObject('images/btn1.jpg', 38, 104);
	background.addImageObject('images/btn1.jpg', 68, 104);
	background.addImageObject('images/btn1.jpg', 98, 104);
	background.addImageObject('images/btn1.jpg', 8, 129);
	background.addImageObject('images/btn1.jpg', 38, 129);
	background.addImageObject('images/btn1.jpg', 68, 129);
	background.addImageObject('images/btn1.jpg', 98, 129);
	drawCalcTexts();
}

function drawCalcTexts() {
	background.addTextObject('(', 'Arial', 12, 'white', 15, 30);
	background.addTextObject(')', 'Arial', 12, 'white', 48, 30);
	background.addTextObject('C', 'Arial', 12, 'white', 75, 31);
	background.addTextObject('←', 'Arial', 12, 'white', 103, 30);
	background.addTextObject('7', 'Arial', 12, 'white', 15, 56);
	background.addTextObject('8', 'Arial', 12, 'white', 45, 56);
	background.addTextObject('9', 'Arial', 12, 'white', 75, 56);
	background.addTextObject('/', 'Arial', 12, 'white', 107, 56);
	background.addTextObject('4', 'Arial', 12, 'white', 15, 81);
	background.addTextObject('5', 'Arial', 12, 'white', 45, 81);
	background.addTextObject('6', 'Arial', 12, 'white', 75, 81);
	background.addTextObject('*', 'Arial', 12, 'white', 106, 83);
	background.addTextObject('1', 'Arial', 12, 'white', 15, 106);
	background.addTextObject('2', 'Arial', 12, 'white', 45, 106);
	background.addTextObject('3', 'Arial', 12, 'white', 75, 106);
	background.addTextObject('-', 'Arial', 12, 'white', 107, 106);
	background.addTextObject('0', 'Arial', 12, 'white', 15, 131);
	background.addTextObject('.', 'Arial', 12, 'white', 47, 127);
	background.addTextObject('=', 'Arial', 12, 'white', 75, 131);
	background.addTextObject('+', 'Arial', 12, 'white', 105, 132);
}

function holdbtn(x, y) {
	x = 8+30*x;
	y = 29+25*y;
	background.addImageObject('images/btn1hover.jpg', x, y);
	drawCalcTexts();
}

function releasebtn(x, y) {
	x = 8+30*x;
	y = 29+25*y;
	background.addImageObject('images/btn1.jpg', x, y);
	drawCalcTexts();
}

function clickbtn(btn) {
	switch(btn) {
		case 'B':
			calcstr = calcstr.slice(0,-1);
			break;
		case 'C':
			calcstr = '';
			break;
		case '=':
			calcstr = eval(calcstr);
			break;
		default:
			calcstr += btn;
			break;
	}
	document.getElementById('calc-answer').innerHTML = calcstr;
}