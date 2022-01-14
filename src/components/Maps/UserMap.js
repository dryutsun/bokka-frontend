import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export default function UserMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const map2 = new mapboxgl.Map({
    container: 'mapContainer',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-122.662323, 45.523751], // starting position
    zoom: 12
  });
  // set the bounds of the map
  const bounds = [
    [-123.069003, 45.395273],
    [-122.303707, 45.612333]
  ];
  map2.setMaxBounds(bounds);
  
  // an arbitrary start will always be the same
  // only the end or destination will change
  const start = [-122.662323, 45.523751];
  
  // this is where the code for the next step will go




//   useEffect(() => {
//     if (map2.current) return; // initialize map only once
//     map2.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat],
//       zoom: zoom,
//     });
//   });

  // create a function to make a directions request
  async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map2.getSource("route")) {
      map2.getSource("route").setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map2.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
    // add turn instructions here at the end
  }

  map2.on("load", () => {
    // make an initial directions request that
    // starts and ends at the same location
    getRoute(start);

    // Add starting point to the map
    map2.addLayer({
      id: "point",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: start,
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 10,
        "circle-color": "#3887be",
      },
    });
    // this is where the code from the next step will go
  });

  

  // var directions = new MapboxDirections({
  // accessToken: mapboxgl.accessToken
  // });

  // map.addControl(directions,'top-left');

  // map.on('load',  function() {
  // directions.setOrigin([12, 23]); // can be address in form setOrigin("12, Elm Street, NY")
  // directions.setDestinaion([11, 22]); // can be address
  // })
  getRoute([-122.677738,45.522458])

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
