// js for cpu measurements
console.log('loaded: cpugadget.js');

var font;
var color;
var opacity;

var REFRESH_INTERVAL = 1000;
var toCPUPercent;
var toMemPercent;

var targetWidth;
var targetHeight;

function percentageinit() {
    console.log('[cpuinit]');

    readPercentSettings();
    createPercentTextObjects();
    refreshPercent(true);
}

function readPercentSettings() {
    console.log('[readSettings]');

    font = System.Gadget.Settings.readString('font') || 'Arial';
    color = System.Gadget.Settings.readString('color') || 'white';
    opacity = System.Gadget.Settings.read('opacity') || 30;
    // negativeVerticalMargin = System.Gadget.Settings.read('negativeVerticalMargin') || 0;
    // negativeHorizontalMargin = System.Gadget.Settings.read('negativeHorizontalMargin') || 0;

    console.log('    font: ' + font);
    console.log('    color: ' + color);
    console.log('    opacity: ' + opacity);
}

function createPercentTextObjects() {
    console.log('[createTextCPUObjects]');

    var background = document.getElementById('background');
    background.removeObjects();

    // 0's are dummy chars for initial text object alignment
    toCPUPercent = background.addTextObject('000%', font, 105, color, 0, 0);
    toMemPercent = background.addTextObject('000%', font, 20, color, toCPUPercent.left, 90); //(toTime.top+toTime.height)*0.69);

    //targetWidth = document.getElementsByTagName('body')[0].style.width = toCPUPercent.width;
    targetWidth = document.getElementsByTagName('body')[0].style.width = 600;
    targetHeight = document.getElementsByTagName('body')[0].style.height = toMemPercent.height + toCPUPercent.height;
}

function refreshPercent(autoreload) {
    console.log('[refresh]');

    console.log('    font: ' + font);
    console.log('    color: ' + color);
    console.log('    opacity: ' + opacity);
	
    var mini = 0;
    var maxCPU = System.Machine.CPUs.count;
    var tempCPU = 0;
	toCPUPercent.value = '20%';
    for (var i = 0; i < maxCPU; i++) {
        tempCPU += System.Machine.CPUs.item(i).usagePercentage;
    }
	
	//test
	/*collCPUs = System.Machine.CPUs;

    // Report the folder details.
    for (var loop = 0; loop < collCPUs.count; loop++)
    {
        oCPU = collCPUs.item(loop);
        toMemPercent.value += loop + ': ' + oCPU.usagePercentage + ' ';
    }  */
	
	
	toCPUPercent.value = '30%';
    var maxMem = System.Machine.totalMemory;
	toCPUPercent.value = '31%';
    var availMem = System.Machine.availableMemory;
	toCPUPercent.value = '32%';
    var CPUPercent = Math.min(Math.max(0, tempCPU/MaxCPU), 100);
	toCPUPercent.value = '33%';
    var memPercent;
	toCPUPercent.value = '40%';
    if ((maxMem > 0) && (maxMem > availMem)) {
        memPercent = Math.min(100 - (availMem / maxMem * 100, 100));
		toCPUPercent.value = '50%';
    }
    else {
        memPercent = 0;
		toCPUPercent.value = '60%';
    }

    toCPUPercent.value = CPUPercent;
    toCPUPercent.font = font;
    toCPUPercent.color = color;
    toCPUPercent.opacity = opacity;

    toCPUPercent.left = targetWidth - toTime.width;
    toCPUPercent.top = 0;

    if (autoreload) {
        setTimeout(function () { refreshPercent(true); }, 60 * 1000);
    }
}
