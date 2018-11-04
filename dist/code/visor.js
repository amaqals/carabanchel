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
// L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
// 	maxZoom: 19,
// 	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

/* map grey 2 */
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
 subdomains: 'abcd',
 maxZoom: 19
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

/* ied icon1 */
// var ied_icon = L.icon({
// 		iconUrl: 'dist/css/images/ied_icon_1.png',
// 		iconSize:     [70	, 70], // size of the icon
// 		iconAnchor:   [0, 70], // point of the icon which will correspond to marker's location
// 		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });

/* ied icon2 */
var ied_icon = L.icon({
		iconUrl: 'dist/css/images/ied_icon_2.png',
		iconSize:     [38, 38], // size of the icon
		// iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
L.marker([40.3905997, -3.7295064], {icon: ied_icon}).addTo(map);

/* insert manzanas */
// var manzanas = L.geoJSON(manzanas, {
// 	pointToLayer: function (feature) {
//         return L.path(manzanas_style(feature));
//     }
// }).addTo(map);

/* insert polygons (zonas oportunidad) */
var zonas = L.geoJSON(zonas, {
	onEachFeature: Popup_oportunidad,
	pointToLayer: function (feature) {
        return L.path(zonas_style(feature));
    }
}).addTo(map);

/* insert polygons (patrimonio)*/
var patrimonio = L.geoJSON(patrimonio, {
	onEachFeature: Popup_patrimonio,
	pointToLayer: function (feature) {
        return L.path(patrimonio_style(feature));
    }
}).addTo(map);

/* insert points with categoria */
var puntos = L.geoJSON(puntos, {
	onEachFeature: Popup,
	pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, categoria_style(feature));
    }
}).addTo(map);

/* insert ied */
var ied = L.geoJSON(ied, {
	pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, ied_style(feature));
    }
}).addTo(map);


/* polygons style (zonas oportunidad) */
zonas.setStyle({
    color: '#19E301',
		stroke: 1,
		filcolor:'#8EFF40' ,
		fillOpacity: 0.3,
    weight: 2,
    fill: false,
});

/* polygons style (patrimonio) */
patrimonio.setStyle({
		color: '#070594',
		filcolor: '#070594',
    weight: 0.5,
    fill: false,
});

/* manzanas style */
// manzanas.setStyle({
//     color: '#070594',
// 		// stroke: 0.01,
// 		filcolor:'#070594' ,
// 		fillOpacity: 0.2,
//     weight: 0.5,
//     fill: false,
// });

/* points color according to category */
function getcolor(c) {
  if(c == "NARANJAS") return '#FCAF00'; else
  if (c == "TRADICIONALES") return '#3FDAD6';
	if (c == "ALIADOS") return '#FE52D4';
  }

/* points style */
	function categoria_style(feature) {
	  return{
	    "stroke": false,
	    "radius": 4,
			"color": getcolor(feature.properties.MAPEO_ESPE),
	    "fillOpacity": 0.8
	    }
	}

	/* ied style */
		function ied_style(feature) {
		  return{
		    "stroke": false,
		    "radius": 4,
				"color": getcolor(feature.properties.MAPEO_ESPE),
		    "fillOpacity": 0.8
		    }
		}

/* pop-up puntos */
function Popup(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(
          '<div class="popup">'+
		          '<p class = "capitalize"><b>Categoría: </b><br>'+feature.properties.MAPEO_ESPE+'</p><p class = "capitalize"><b>Nombre: </b><br>'+feature.properties.ROTULO+'</p>'
		);
		}
}

/* pop-up patrimonio */
function Popup_patrimonio(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(
          '<div class="popup">'+
		          '<p><b>Categoría: </b><br> Geográfico <br><br><b>Tipo: </b><br> Patrimonio Industrial </p>'
		);
		}
}

/* pop-up zonas intervencion */
function Popup_oportunidad(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(
          '<div class="popup">'+
						'<p><b> Categoría: </b><br> Geográfico <br><br><b>Tipo: </b><br> Lugar potencial<br><br> <b> Nombre: </b><br>'+feature.properties.Nombre+'</p>'
		);
		}
}


/* legend */
var legend = L.control({position: "topright"});

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML = '<b>Categorías</b><br><br>' +
        '<i style="background-color: #FCAF00">' +
        '</i>Naranjas<br>' +
        '<i style="background-color: #070594">' +
        '</i>Tradicionales <br>' +
        '<i style="background-color: #FE52D4">' +
        '</i>Aliados<br>';
    return div;
};
legend.addTo(map);


/* search button */
map.addControl(new L.Control.Search({
		layer: puntos,
		initial: false,
		// expanded: true,
		hideMarkerOnCollapse: true,
		propertyName: 'MAPEO_ESPE'}));
