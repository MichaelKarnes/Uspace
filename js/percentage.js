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

function percentageInit() {
    console.log('[cpuinit]');

    readSettings();
    createTextObjects();
    refresh(true);
}

function readSettings() {
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

function createTextObjects() {
    console.log('[createTextCPUObjects]');

    var background = document.getElementById('background');
    background.removeObjects();

    // 0's are dummy chars for initial text object alignment
    toCPUPercent = background.addTextObject('000%', font, 105, color, 0, 0);
    toMemPercent = background.addTextObject('000%', font, 80, color, toTime.left, 90); //(toTime.top+toTime.height)*0.69);

    targetWidth = document.getElementsByTagName('body')[0].style.width = toTime.width;
    targetHeight = document.getElementsByTagName('body')[0].style.height = toDay.top + toDay.height;
}

function refresh(autoreload) {
    console.log('[refresh]');

    console.log('    font: ' + font);
    console.log('    color: ' + color);
    console.log('    opacity: ' + opacity);

    var mini = 0;
    var maxCPU = System.Machine.CPUs.count;
    var tempCPU = 0;
    for (var i = 0; i < maxCPU; i++) {
        tempCPU += System.Machine.CPUs.item(i).usagePercentage;
    }
    var maxMem = System.Machine.totalMemory;
    var availMem = System.Machine.availableMemory;
    var CPUPercent = Math.min(Math.max(0, tempCPU/MaxCPU), 100);
    var memPercent;

    if ((maxMem > 0) && (maxMem > availMem)) {
        memPercent = Math.min(100 - (availMem / maxMem * 100, 100));
    }
    else {
        memPercent = 0;
    }

    toCPUPercent.value = CPUPercent;
    toCPUPercent.font = font;
    toCPUPercent.color = color;
    toCPUPercent.opacity = opacity;

    toCPUPercent.left = targetWidth - toTime.width;
    toCPUPercent.top = 0;

    if (autoreload) {
        setTimeout(function () { refresh(true); }, 60 * 1000);
    }
}
