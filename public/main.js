var socket = io.connect({ 'forceNew': true });
var map = L.map('map').setView([6.265269699999999, -75.5668732], 13);
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var aux = true;

function onLocationFound(e) {
	var radius = 10;
	console.log(e.latlng);
	socket.emit('new-carpuling', {location: e.latlng, radius: radius});
	aux = false;
}

map.on('locationfound', onLocationFound);

map.locate({setView: true, maxZoom: 16});
var timer = setInterval(function(){
	if(aux){
		clearInterval(timer);
	}
	map.locate({setView: false, maxZoom: 16});
}, 3000)

socket.on('position-carpuling', function (data) {
	L.circle(data.location, data.radius).addTo(map);
});
