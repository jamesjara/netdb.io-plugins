var map;

function initPlugin(response) {
	window.key = response['config']['key'];
	var data = response['data'];
	var bounds = new google.maps.LatLngBounds();
	for (row of data) {
		var Lat = row.location_latitude;
		var Lng = row.location_longitude;
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(Lat, Lng),
			map: map,
			title: row.product || ''
		});
		bounds.extend(marker.getPosition());
	}
	map.setCenter(bounds.getCenter());
	map.fitBounds(bounds);
	map.setZoom(map.getZoom() - 1);
	if (map.getZoom() > 15) {
		map.setZoom(15);
	}
}

function initMap() {
	var myLatLng = new google.maps.LatLng(28.617161, 77.208111);
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 2,
		center: myLatLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
}
// hack Google Maps to bypass API v3 key (needed since 22 June 2016 http://googlegeodevelopers.blogspot.com.es/2016/06/building-for-scale-updates-to-google.html)
var target = document.head;
var observer = new MutationObserver(function(mutations) {
	for (var i = 0; mutations[i]; ++i) { // notify when script to hack is added in HTML head
		if (mutations[i].addedNodes[0].nodeName == "SCRIPT" && mutations[i].addedNodes[0].src.match(/\/AuthenticationService.Authenticate?/g)) {
			var str = mutations[i].addedNodes[0].src.match(/[?&]callback=.*[&$]/g);
			if (str) {
				if (str[0][str[0].length - 1] == '&') {
					str = str[0].substring(10, str[0].length - 1);
				} else {
					str = str[0].substring(10);
				}
				var split = str.split(".");
				var object = split[0];
				var method = split[1];
				window[object][method] = null; // remove censorship message function _xdc_._jmzdv6 (AJAX callback name "_jmzdv6" differs depending on URL)
				//window[object] = {}; // when we removed the complete object _xdc_, Google Maps tiles did not load when we moved the map with the mouse (no problem with OpenStreetMap)
			}
			observer.disconnect();
		}
	}
});
var config = {
	attributes: true,
	childList: true,
	characterData: true
}
observer.observe(target, config);