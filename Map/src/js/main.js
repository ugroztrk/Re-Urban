/*var p = new L.Popup({ autoClose: true, closeOnClick: false })
                        .setContent(data.layer)
                        .setLatLng([data.y, data.x]); */

var markers = L.markerClusterGroup();

var map = L.map('map',{fullscreenControl: true}).setView([40.18307014852534 , 29.07257080078125], 10)

document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';

L.control.scale({position:'bottomright', metric:true, imperial:false}).addTo(map);

L.control.mousePosition().addTo(map);

var points =markers.addLayer (L.layerGroup());

var wmsUrl = " https://tucbs-public-api.csb.gov.tr/trk_akdgm_riskli_alanlar_wms?"


var icon = L.icon({
    iconUrl: 'https://i.ibb.co/vddzQr5/pin.png',
    iconSize:     [20, 20]
})

map.pm.setGlobalOptions({icon: icon})

//-----------Haritalar-----------\\

var worldImagery = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var streetMap = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var wmsLayer = L.tileLayer.betterWms(wmsUrl, {
  layers: 'YKDB_RiskliAlan',
  format: 'image/png',
  transparent: true,
  crs: L.CRS.EPSG4326
}).addTo(map);

wmsLayer.on('click', function (e) {
    console.log(e)
    alert("harita tıkladı")
})

function getColor(d) {
    return d > 30 ? '#001655' :
           d > 20  ? '#0c0e96' :
           d > 15  ? '#103790' :
           d > 10  ? '#1b4aad' :
           d > 6   ? '#366eb9' :
           d > 3   ? '#819eda' :
           d > 0  ? '#9eb6e8' :
                    '#ffffff';
}
function style(feature) {
    return {
        fillColor: getColor(feature.riskli_alan),
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.8
    };
} 

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 3, 6, 10, 15, 20, 30],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

var info = L.control({position:"bottomright"});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML =  '<h4>Aktif Riskli Alan Projeleri</h4>' + (props ? props.name
        : '-');
};

info.addTo(map);


function highlightFeature(e) {
  
  var layer = e.target;
  
  layer.setStyle({
      weight: 5,
      color: 'white',
      dashArray: '',
      fillOpacity: 0.7
  });

info.update(layer.feature.properties);
  layer.bringToFront();
}

var geojson = L.geoJson(il_sınır, {style:style})

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update()
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
});
}

var geoJsonLayer = L.geoJson(il_sınır, {style: style, onEachFeature: onEachFeature})


    
// -----------Harita Katmanları----------- \\

var baseMaps = {
        "<span style='color:white;font-weight:bold;'>Uydu Görüntüsü<span>": worldImagery,
        "<span style='color:white;font-weight:bold;'>Harita Görüntüsü<span>": streetMap
};
var overlays =  {
    "<span style='color:white;font-weight:bold;'>Noktalar<span>": points,
    "<span style='color:white;font-weight:bold;'>Riskli Alanlar<span>": wmsLayer,
    "<span style='color:white;font-weight:bold;'>Riskli Alan Yoğuluk Haritası<span>": geoJsonLayer 
};
    
// -----------Katman Kontrol----------- \\
      
L.control.layers(baseMaps,overlays, {position:'bottomleft'}).addTo(map);

map.addControl( new L.Control.Gps() );

var usak_riskli_alan = L.polygon(usak_sınır, {color: 'red'}).addTo(map);
var etap2 = L.geoJson(usak_sınır2).addTo(map);


