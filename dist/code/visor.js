/*
 the script mus be loaded after the map div is defined.
 otherwise this will not work (we would need a listener to
 wait for the DOM to be fully loaded).

 Just put the script tag below the map div.

 The source code below is the example from the leaflet start page.
 */

var map = L.map('map').setView([40.388, -3.73], 15);

/* map color */
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     minZoom: 1,
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1IjoiYWxiYWFsc2luYSIsImEiOiJjam5vOHg1eDQyNG5zM2t0YXpqZnFoM3h5In0.gOEZkL96c9_R3L2zVaLoCg'
// }).addTo(map);

/* map grey */
L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
	maxZoom: 19,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/* special popup to show latlon onclick */
// var popup2 = L.popup();
// function onMapClick(e) {
//     popup2
//         .setLatLng(e.latlng)
//         .setContent(
//             "You clicked the map at -<br><b>lon:</b> " +
//             e.latlng.lng +
//             "<br><b>lat:</b> " +
//             e.latlng.lat
//         )
//         .openOn(map);
// }
// map.on("click", onMapClick);

/* insert polygons */
var zonas = L.geoJSON(zonas, {
	pointToLayer: function (feature) {
        return L.path(zonas_style(feature));
    }
}).addTo(map);

/* insert points */
var puntos = L.geoJSON(puntos, {
	// onEachFeature: Popup,
	pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, categoria_style(feature));
    }
}).addTo(map);

/* insert points with categoria */
// var puntos = L.geoJSON(puntos, {
// 	onEachFeature: Popup,
// 	pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, categoria_style(feature));
//     }
// }).addTo(map);

/* polygons style */
zonas.setStyle({
    color: '#070594',
    weight: 1,
    fill: false,
});

/* points color according to category */
function getcolor(c) {
  if(c == "NARANJAS") return '#8EFF40'; else
  if (c == "TRADICIONALES") return '#070594';
  }

/* points color according to category */
	function categoria_style(feature) {
	  return{
	    "stroke": false,
	    "radius": 4,
			"color": getcolor(feature.properties.MAPEO_ESPE),
	    "fillOpacity": 0.8
	    }
	}

/* points color according to category */
// function categoria_style(feature) {
//   return{
//     "stroke": false,
//     "radius": (feature.properties.Sup_range/3),
//     "color": getcolor(feature.properties.Categoria),
//     "fillOpacity": 0.8
//     }
// }

/* pop-up */
// function Popup(feature, layer) {
//     if (feature.properties) {
//         layer.bindPopup(
//           '<div class="popup">'+
// 		          '<p><b>Referència Cadastral: </b><br>'+feature.properties.REFCAT+'</p><p><b>Categoria: </b><br>'+feature.properties.Categoria+'</p><p><b>Clau Urbana: </b><br>'+feature.properties.ClauUrban+'</p>'
// 		);
// 		}
// }

/* legend */
// var legend = L.control({position: "topright"});
//
// legend.onAdd = function(map) {
//     var div = L.DomUtil.create("div", "legend");
//     div.innerHTML = '<b>Categories dels puntos</b><br>' +
//         'segons fotointerpretació<br><br>' +
//         '<i style="background-color: #1c00bd">' +
//         '</i>1: No edificat, accessible <br>' +
//         '<i style="background-color: #1444ba">' +
//         '</i>21: No edificat, amb ús temporal, accessible <br>' +
//         '<i style="background-color: #09abb6">' +
//         '</i>32: No edificat, amb ús permanent <br>' +
//         '<i style="background-color: #00ffb2">' +
//         '</i>34: Edificat, en bon estat <br>';
//     return div;
// };
// legend.addTo(map);

/* variable information */
// var info = L.control({position: "topright"});
// info.onAdd = function(map) {
//     var div = L.DomUtil.create("div", "info");
//     div.innerHTML =
//         '<h4>Categoria</h4>' +
//         '<p id="currentTown"></p>';
//     return div;
// };
// info.addTo(map);
//
// function highlightFeature(e) {
//     var currentlayer = e.target;
//     currentlayer.setStyle(highlightStyle);
//     currentlayer.bringToFront();
//     $("#currentTown").html(
//         currentlayer.feature.properties.REFCAT);
// }
//
// function resetHighlight(e) {
//     geojson.resetStyle(e.target);
//     $("#currentTown").html("");
// }

/* search button */
map.addControl(new L.Control.Search({
		layer: puntos,
		initial: false,
		// expanded: true,
		hideMarkerOnCollapse: true,
		propertyName: 'MAPEO_ESPE'}));
