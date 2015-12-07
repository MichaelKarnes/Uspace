// js for cpu measurements
console.log('loaded: cpugadget.js');

var font;
var color;
var opacity;

var REFRESH_INTERVAL = 3000;
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
    color = System.Gadget.Settings.readString('color') || 'blueviolet';
    opacity = System.Gadget.Settings.read('opacity') || 70;
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
    toCPUPercent = background.addTextObject('000% CPU', font, 20, color, 0, 0);
    toMemPercent = background.addTextObject('000% RAM', font, 20, color, toCPUPercent.left, 0); //(toTime.top+toTime.height)*0.69);

    targetWidth = document.getElementsByTagName('body')[0].style.width = toCPUPercent.width;
    targetHeight = document.getElementsByTagName('body')[0].style.height = toMemPercent.height + toCPUPercent.height;
	//targetWidth = document.getElementsByTagName('body')[0].style.width = "100px";
   // targetHeight = document.getElementsByTagName('body')[0].style.height = "300px";
}

function refreshPercent(autoreload) {
    console.log('[refresh]');

    console.log('    font: ' + font);
    console.log('    color: ' + color);
    console.log('    opacity: ' + opacity);
	
	var oMachine = new machineStatus();
	
    /*var mini = 0;
    var maxCPU = System.Machine.CPUs.count;
    var tempCPU = 0;
	toCPUPercent.value = '20%';
    for (var i = 0; i < maxCPU; i++) {
        tempCPU += System.Machine.CPUs.item(i).usagePercentage;
    }
	
	if(tempCPU == 0){
		tempCPU = 1;
	}
	
	//test
	/*collCPUs = System.Machine.CPUs;

    // Report the folder details.
    for (var loop = 0; loop < collCPUs.count; loop++)
    {
        oCPU = collCPUs.item(loop);
        toMemPercent.value += loop + ': ' + oCPU.usagePercentage + ' ';
    }  */
	
	
	/*toCPUPercent.value = '30%';
    var maxMem = System.Machine.totalMemory;
	toCPUPercent.value = '31%';
    var availMem = System.Machine.availableMemory;
	toCPUPercent.value = '32%';
    var CPUPercent = Math.min(Math.max(0, tempCPU/maxCPU), 100);
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
    }*/

    toCPUPercent.value = Math.round(oMachine.CPUUsagePercentage) + "% CPU";
    toCPUPercent.font = font;
    toCPUPercent.color = color;
    toCPUPercent.opacity = opacity;

    toCPUPercent.left = targetWidth - toCPUPercent.width - 3;
    toCPUPercent.top = 17;
	
	toMemPercent.value = Math.round(oMachine.memoryPercentage) + "% RAM";
	toMemPercent.font = font;
	toMemPercent.color = color;
	toMemPercent.opacity = opacity;
	
	toMemPercent.left = targetWidth - toMemPercent.width;
	toMemPercent.top = 0; 
	/*
	toCPUPercent.value = CPUPercent;
    toCPUPercent.font = font;
    toCPUPercent.color = color;
    toCPUPercent.opacity = opacity;

    toCPUPercent.left = targetWidth - toCPUPercent.width;
    toCPUPercent.top = 0;
	
	toMemPercent.value = memPercent;
	toMemPercent.font = font;
	toMemPercent.color = color;
	toMemPercent.opacity = opacity;
	
	toMemPercent.left = targetWidth - toMemPercent.width;
	toMemPercent.top = 0;*/
	
    if (autoreload && System.Gadget.Settings.readString('app') == 'percentage') {
        setTimeout(function () { refreshPercent(true); }, REFRESH_INTERVAL);
    }
}

function machineStatus()
{
	this.CPUCount = System.Machine.CPUs.count;

	var usageTotal = 0;
	
	for (var i = 0; i < this.CPUCount; i++)
	{
		usageTotal += System.Machine.CPUs.item(i).usagePercentage;
	}

	this.CPUUsagePercentage = Math.min(Math.max(0, usageTotal / this.CPUCount), 100);
	this.totalMemory = System.Machine.totalMemory;
	this.availableMemory = System.Machine.availableMemory;
	
	if((this.totalMemory > 0) && (this.totalMemory > this.availableMemory))
	{
		this.memoryPercentage = Math.min(100 - (this.availableMemory / this.totalMemory * 100), 100);
	}
	else
	{
		this.memoryPercentage = 0;
	}
}

function numberFormat(numberIn)
{
	if (numberIn == null || numberIn < 0.5)
	{
		return "00";
	}
	
	numberIn = Math.round(numberIn);	
	
	if (numberIn != null && numberIn < 10)
	{
		return "0" + numberIn;
	}
	else if (numberIn != null && numberIn > 100)
	{
		return 100;
	}
	else
	{
		return numberIn;
	}
}
