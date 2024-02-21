//create map in leaflet and tie it to the div called 'theMap'
let map = L.map('theMap').setView([44.650627, -63.597140], 14);
let markerList = [];
const RefreshRate = 10; //in Seconds


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  //load google map layer
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const busIcon = L.icon({ //configure bus icon
    iconUrl: 'bus.png',
    iconSize: [40, 40], // size of the icon
});


async function GetBusDataFromAPI() { 
    const Response = await fetch('https://prog2700.onrender.com/hrmbuses');
    const JsonResponse = await Response.json();
    const AllBusData = JsonResponse.entity;
    const FilteredData = AllBusData.filter((item) => item.vehicle.trip.routeId <10000);
    const GeoJson = MakeGeoJson(AllBusData)
    RenderBuses(GeoJson)
}


setInterval(() => {  //refresh the bus icon on the map 
    markerList.forEach((item, index) => { map.removeLayer(markerList[index]) }) //remove previous icons
    markerList = [];
    GetBusDataFromAPI()
}, RefreshRate*1000)



const RenderBuses = (input) => {
    input.forEach( item => {
        const coordinates = item.geometry.coordinates;
        const rotations = item.properties.bearing;
        markerList.push( marker = L.marker(coordinates,{icon: busIcon, rotationAngle:rotations}).addTo(map))
        // You can customize the marker with additional properties if needed
        // For example, you can use feature.properties to set popup content
        if (item.properties) {
          marker.bindPopup(`<p>Bus ID: ${item.properties.id}<p>
          <p>Route Number:  ${item.properties.route}</p> 
          <p>Speed: ${item.properties.speed !== undefined ? parseFloat(item.properties.speed).toFixed(2)+' km/h' : 'Not Available'}</p>`);
        }
      })
}


const MakeGeoJson = (item)=>{ return (
    item.map((element) => {
        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [element.vehicle.position.latitude, element.vehicle.position.longitude]
            },
            "properties": {
                "speed": element.vehicle.position.speed ,
                "id": element.id,
                "route": element.vehicle.trip.routeId,
                "bearing":  element.vehicle.position.bearing
            }
        }
    })
)
} 

GetBusDataFromAPI()