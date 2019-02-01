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

/* ied icon2 */
var ied_icon = L.icon({
   iconUrl: 'dist/css/images/ied_icon_2.png',
   iconSize: [38, 38] // size of the icon
});
L.marker([40.3905997, -3.7295064], {icon: ied_icon}).addTo(map);

/* insert polygons (zonas potencial) */
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

/* polygons style (zonas potencial) */
zonas.setStyle({
    color: '#19E301',
		stroke: 0.8,
		filcolor:'#FFFFFF' ,
		fillOpacity: 0.0,
    weight: 1.5,
    fill: true,
});

/* polygons style (patrimonio) */
patrimonio.setStyle({
		color: '#070594',
		filcolor: '#070594',
    weight: 0.5,
    fill: true,
});

/* points color according to category */
function getcolor(c) {
  if(c == "ORANGE ECONOMY") return '#ffb600'; else
  if (c == "TRADICIONAL") return '#00CDEC';
	if (c == "ALIADO") return '#f73600';
  }

/* points style */
	function categoria_style(feature) {
	  return{
	    "stroke": false,
	    "radius": 4,
			"color": getcolor(feature.properties.CATEGORIA),
	    "fillOpacity": 0.8
	    }
	}

	/* ied style */
		function ied_style(feature) {
		  return{
		    "stroke": false,
		    "radius": 4,
				"color": getcolor(feature.properties.CATEGORIA),
		    "fillOpacity": 0.8
		    }
		}

/* pop-up puntos */
function Popup(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(
          '<div class="popup">'+
		          '<p><b>categoría: </b><br>'+feature.properties.CATEGORIA+'<br><br><b>nombre: </b><br>'+feature.properties.NOMBRE+'<br><br><b>dirección:</b><br>'+feature.properties.DIRECCION+'<br><br><b>actividad:</b><br>'+feature.properties.ACTIVIDAD+'<br><br><b>descripción:</b><br>'+feature.properties.DESCRIPCION+'</p>'
		);
		}
}

/* pop-up patrimonio */
function Popup_patrimonio(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(
          '<div class="popup">'+
		          '<p><b>categoría: </b><br>'+feature.properties.CATEGORIA+'<br><br><b>tipo: </b><br>'+feature.properties.TIPO+'<br><br> <b> dirección: </b><br>'+feature.properties.DIRECCIÓN+'<br><br> <b> año: </b><br>'+feature.properties.AÑO+'<br><br> <b> descripción: </b><br>'+feature.properties.DESCRIPCIÓ+'</p>'
		);
		}
}

/* pop-up zonas intervencion */
function Popup_oportunidad(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(
          '<div class="popup">'+
						'<p><b> categoría: </b><br>'+feature.properties.CATEGORIA+'<br><br><b>tipo: </b><br>'+feature.properties.TIPO+'</p>'
		);
		}
}

/* legend */
var legend = L.control({position: "topright"});

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML = '<b>CATEGORÍAS</b><br><br>' +
        '<i style="background-color: #ffb600">' +
        '</i>Orange Economy<br>' +
        '<i style="background-color: #00CDEC">' +
        '</i>Tradicionales<br>' +
        '<i style="background-color: #f73600">' +
        '</i>Aliados<br><br>'+
        '<b>MAPEO GEOGRÁFICO</b><br><br>'+
        '<i style="background-color: #19E301; width: 3px; height: 15px">' +
        '</i>Zonas Potencial<br>'+
        '<i style="background-color: #070594; width: 3px; height: 15px">' +
        '</i>Patrimonio Industrial<br>';
    return div;
};
legend.addTo(map);

/* search button */
// map.addControl(new L.Control.Search({
// 		layer: puntos,
// 		initial: false,
// 		// expanded: true,
// 		hideMarkerOnCollapse: true,
// 		propertyName: 'CATEGORIA'}));
