var socket = io.connect({ 'forceNew': true });
var map = L.map('map').setView([6.265269699999999, -75.5668732], 13);
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('locationfound', onLocationFound);
setInterval(function(){
	map.locate({setView: true, maxZoom: 16});
}, 3000)
function onLocationFound(e) {
    var radius = e.accuracy / 5;
	socket.emit('new-carpuling', {location: e.latlng, radius: radius});
}

map.on('locationfound', onLocationFound);

socket.on('position-carpuling', function (data) {
	L.circle(data.location, data.radius).addTo(map);
});

/*
socket.on('new-word', function (data) {
	renderWord(data);
});

socket.emit('sent-story', part);*/