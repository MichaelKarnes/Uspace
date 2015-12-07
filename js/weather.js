var http_request;

var font;
var color;
var opacity;

function weatherinit() {
	http_request = new ActiveXObject("MSXML2.XMLHTTP");
	
	font = System.Gadget.Settings.readString('font') || 'Arial';
	color = System.Gadget.Settings.readString('color') || 'blueviolet';
	opacity = System.Gadget.Settings.read('opacity') || 70;
	
	http_request.onreadystatechange = function(){
		if (http_request.readyState == 4  ){
			var jsonObj = JSON.parse(http_request.responseText);

			var background = document.getElementById('background');
			background.removeObjects();

			background.addTextObject(Math.round(jsonObj.current_observation.temp_f)+'°F', font, 25, color, 0, 12);
			background.addTextObject('Feels Like '+Math.round(jsonObj.current_observation.feelslike_f)+'°F', font, 9, color, 0, 41);
			background.addImageObject('images/icons/'+getIcon(jsonObj.current_observation.icon)+'.png', 80, 7);
	   }
	}

	http_request.open("GET", "http://api.wunderground.com/api/74242ed029ebb79e/conditions/q/TX/College%20Station.json", true);
	http_request.send();
}

function getIcon(icon) {
	switch(icon) {
		case "chanceflurries":
		case "chancesleet":
		case "flurries":
		case "sleet":
		case "snow":
		case "nt_chanceflurries":
		case "nt_chancesleet":
		case "nt_flurries":
		case "nt_sleet":
		case "nt_snow":
			return "snowy";
		case "chancerain":
		case "rain":
		case "nt_chancerain":
		case "nt_rain":
		case "chancetstorms":
		case "tstorms":
		case "nt_chancetstorms":
		case "nt_tstorms":
			return "rainy";
		case "clear":
		case "sunny":
		case "nt_clear":
		case "nt_sunny":
			return "sunny";
		case "cloudy":
		case "fog":
		case "hazy":
		case "nt_cloudy":
		case "nt_fog":
		case "nt_hazy":
			return "cloudy";
		case "mostlycloudy":
		case "mostlysunny":
		case "partlycloudy":
		case "partlysunny":
			return "partlysunny";
		case "nt_mostlycloudy":
		case "nt_mostlysunny":
		case "nt_partlycloudy":
		case "nt_partlysunny":
			return "cloudy";
		default:
			return "sunny";
	}
}