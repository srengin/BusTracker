 
 var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom:14
  });

   schoolMarker = document.createElement('div');
  	schoolMarker.id = 'school';
  var marker = new mapboxgl.Marker(schoolMarker)
    .setLngLat([-71.092003, 42.360001])
    .addTo(map);

  const busStops = [
    [-71.093729, 42.359244],
    [-71.094915, 42.360175],
    [-71.0958, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.118625, 42.374863],
  ]; 

 
 function move(){
	 for(let i=0; i< busStops.length; i++){
    const el = document.createElement('div');
	el.className = 'busStops';
	// make a marker for each BusStop and add to the map
	new mapboxgl.Marker(el).setLngLat(busStops[i]).addTo(map); 
  }
  }

  const busMarker = document.createElement('div');
	busMarker.className = 'marker';

  var bus = new mapboxgl.Marker(busMarker)
    	.setLngLat([-71.07739739, 42.3368624])      
    	.addTo(map);

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);
	if(locations[0].relationships.route.data.id=='1'){
	var lat = parseFloat(locations[0].attributes.latitude);
	var lon = parseFloat(locations[0].attributes.longitude);
	bus.setLngLat([lon, lat]);}
	console.log(bus);
	// timer
	setTimeout(run, 20000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();
