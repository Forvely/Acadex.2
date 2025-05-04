import React, { useState, useCallback } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import { geoRobinson } from "d3-geo-projection";
import { geoCentroid } from "d3-geo";
import * as topojson from "topojson-client"; // topojson -> geojson for easier coordinate use

// to do: implement the topojson-client into the website and use the coordinates instead of viewbox to zoom into the countries 

const ViewBox_Width = 2000;
const ViewBox_Height = 1000;
const defaultViewBox = "0 0 2000 1000 "

const topoMap = "/countries-topojson.json"


export default function MapChart() {

  // Projection of the map
  const projection = geoRobinson()
    .translate([ViewBox_Width / 2, ViewBox_Height / 2])
    .scale(300)

  // State for controlled center and zoom
  const [position, setPosition] = useState({
    coordinates: [0, 0],
    zoom: 1,
  });

  const [markerCoords, setMarkerCoords] = useState(null);
  
  // Compute centroid on click and zoom in
  const handleContinentClick = useCallback((geo) => {
    const [lon, lat] = geoCentroid(geo);
    setPosition({ coordinates: [lon, lat], zoom: 4 });
    setMarkerCoords([lon, lat]);
    console.log([lon, lat])
  }, []);

  // Reset to full-world view
  const handleReset = () => {
    setPosition({ zoom: 1, coordinates: [0,0] });
    setMarkerCoords([0, 0]);
  };

  return (
    <div style={{ Width: "100%", margin: "0 auto" }}>
      <button onClick={handleReset}>
        Reset View
      </button>

      <ComposableMap projection={projection}  preserveAspectRatio="xMinYMin meet" style={{ width: "100%", height: "auto" }}>
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          // Reject all user drag or wheel events
          filterZoomEvent={() => false}
        >
          <Geographies geography={topoMap}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleContinentClick(geo)}
                  style={{
                    default: { outline: "none", fill: "#ECEFF1", stroke: "#607D8B" },
                    hover:   { outline: "none", fill: "#CFD8DC", cursor: "pointer" },
                    pressed: { outline: "none", fill: "#FF5722", cursor: "pointer" }
                  }}
                />
              ))
            }
          </Geographies>
          {markerCoords && (
            <Marker coordinates={markerCoords}>
              <circle r={5} fill="red" stroke="#fff" strokeWidth={1} />
            </Marker>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
