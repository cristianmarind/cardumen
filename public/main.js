var socket = io.connect({ 'forceNew': true });
var map = L.map('map').setView([6.265269699999999, -75.5668732], 13);
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
map.locate({setView: true, maxZoom: 16});
map.on('locationfound', onLocationFound);


function onLocationFound(e) {
    var radius = e.accuracy / 4;
	setInterval(function(){
		socket.emit('new-carpuling', {location: e.latlng, radius: radius});
	}, 5000)
}

map.on('locationfound', onLocationFound);

socket.on('position-carpuling', function (data) {
	console.log(data.location);
	L.circle(data.location, data.radius).addTo(map);
});

/*
socket.on('new-word', function (data) {
	renderWord(data);
});

socket.emit('sent-story', part);*/