document.getElementById('test').innerHTML = "butts";
var jqxhr = $.getJSON( "http://api.wunderground.com/api/74242ed029ebb79e/conditions/q/TX/College%20Station.json", function() {
  document.getElementById('test').innerHTML = "moo";
});
var http_request = new ActiveXObject("MSXML2.XMLHTTP");

http_request.onreadystatechange = function(){
	if (http_request.readyState == 4  ){
		//document.getElementById('test').innerHTML = "moo";
		// Javascript function JSON.parse to parse JSON data
		var jsonObj = JSON.parse(http_request.responseText);

		// jsonObj variable now contains the data structure and can
		// be accessed as jsonObj.name and jsonObj.country.
		//document.getElementById("Name").innerHTML = jsonObj.name;
		//document.getElementById("Country").innerHTML = jsonObj.country;
		document.getElementById('test').innerHTML = jsonObj.current_observation.temp_f;
   }
}

http_request.open("GET", "http://api.wunderground.com/api/74242ed029ebb79e/conditions/q/TX/College%20Station.json", true);
http_request.send();