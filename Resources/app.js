
var height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;
	
var progress = Ti.UI.createProgressBar({
	min:0,
	max:100,
	value:30,
	message:'Can you stop progress?',
	width:'70%'
});

progress.addEventListener('update', function(e){
	progress.value = progress.value + e.value;
});

var randomPosView = Ti.UI.createView({
	width:'10%',
	height:'10%',
	backgroundColor:'green',
	borderColor:'black',
});

randomPosView.addEventListener('touchstart', decrement);
Ti.API.addEventListener('complete', function(e) {
	progress.hide();
	randomPosView.hide();
});

function increment(e) {
	if (progress.value < 95) {
		// I know its contrived. You could just set the value of the progress bar here
		progress.fireEvent('update', {value:10});
		randomPosView.left = Math.random() * width;
		randomPosView.top = Math.random() * height;
	} 
	else {
		clearInterval(progTimer);
		Ti.API.fireEvent('complete');
		alert('No you cant');
	}
};

function decrement(e) {
	if (progress.value <= 5) {
		Ti.API.fireEvent('complete');
		alert('Complete');
		clearInterval(progTimer);
	} else {
		progress.fireEvent('update', {value:-15});
	}
};

var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});

win1.add(progress);
win1.add(randomPosView);
progress.show();

var progTimer = setInterval(increment, 1000);
// open window
win1.open();
