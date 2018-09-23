var socket = io.connect({ 'forceNew': true });
var map = L.map('map').setView([6.265269699999999, -75.5668732], 13);
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const imageUrl = "images/bicicleta.png";
var icon = L.icon({
    iconUrl: imageUrl,
    iconSize:     [30, 30], // size of the icon
});
var cardumenes = {};
var id = null;

function onLocationFound(e) {
	var radius = 10;
	socket.emit('new-cardumen', {id: id, location: e.latlng, radius: radius});
}

map.on('locationfound', onLocationFound);

map.locate({setView: true, maxZoom: 16});/*Ubicar al usuario en el mapa segun su ubicación inicial */
var timer = setInterval(function(){/*Cada 3 seg se actualiza su posición */
	map.locate({setView: false});
}, 3000)


/*Manejo de comunicación bidireccional*/
socket.on('identify', function (data) {/*Codigo unico Se ejecuta al inicio*/ 
	id = data;
});

socket.on('position-cardumen', function (data) {
	if(cardumenes[data.id.toString()] !== undefined){
		map.removeLayer(cardumenes[data.id.toString()]);
	}
	cardumenes[data.id.toString()] = L.marker(data.location, {icon: icon}).addTo(map);
});

socket.on('delete-cardumen', function (data) {
	data.forEach(element => {
		if(cardumenes[element.toString()] !== undefined){
			map.removeLayer(cardumenes[element.toString()])
		}
	});
});