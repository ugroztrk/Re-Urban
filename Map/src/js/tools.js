$(document).ready(function(){ 

//#region GEOMAN

const locations = [];

map.pm.addControls({  
    position: 'topleft',
    customControls: true, 
    drawMarker: false,
    drawCircle: false,
    drawCircleMarker: false,
    drawRectangle: false,
    cutPolygon: false,
    snapMiddle: true,
    drawPolygon: false,
    drawPolyline: false,
    focus: true,
    drawText: false,
    dragMode: false,
    editMode: false,
    rotateMode: false,
    editControls:true
  });

map.pm.Toolbar.copyDrawControl('Marker', {
    name: 'MarkerCopy',
    block: 'draw',
    title: 'Nokta Yerleştir',
  });

map.pm.enableDraw('MarkerCopy',{markerStyle: {icon:icon}});
map.pm.disableDraw('MarkerCopy');

var modal = document.getElementById('simpleModal')
var saveBtn = document.getElementById('saveBtn')


// map.on("pm:create", openModal)

function openModal () {
    modal.style.display= 'block';
}

function closeModal () {
    let locname = document.querySelector('#locName')
    modal.style.display = 'none'
}

map.on("pm:create", function (e) {
    locations.push({
        id: e.layer._leaflet_id,
        name: prompt('Yer Adı Giriniz:','')
    });
});

saveBtn.addEventListener('click', closeModal)




map.pm.setGlobalOptions({layerGroup: points});

// #endregion

points.addTo(map);


//#region SİDEBAR

var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
});

map.addControl(sidebar);

map.on('pm:create',(e)=>{
    if(e.shape === 'MarkerCopy'){
        e.layer.bindPopup(getContentByLocationId(e.layer._leaflet_id));
    }
});

markers.on('click', (e)=> {
    if (!sidebar.isVisible()) 
        sidebar.show();
    sidebar.setContent(getContentByLocationId(e.layer._leaflet_id));
});

map.on('click', function() {
    sidebar.hide();
    sidebar.setContent("");
});

const getContentByLocationId = locationId => {
    return `
        <div id="sidebarTitle">Konum Adı</div>
        <br />
        <div id="sidebarText">${getLocationById(locationId).name}</div>
    `;
};

const getLocationById = id => {
    return locations.find(location => {
        return location.id === id;
    });
};

//#endregion




var checkboxes = document.querySelectorAll(".leaflet-control-layers-selector");


checkboxes[4].id = "yogunluk-checkbox";
checkboxes[4].classList.add = "plus-minus";

var legend = document.querySelector(".legend")
var info = document.querySelector(".info")

legend.style.display = "none";
info.style.display = "none";

checkboxes[4].addEventListener("change", function() {
    if (checkboxes[4].checked) {
        legend.style.display = "block";
        info.style.display = "block";
    } 
    else {
        legend.style.display = "none";
        info.style.display = "none";
    }
});

console.log(checkboxes)

});