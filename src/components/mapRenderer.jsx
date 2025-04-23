import React, { useState, useCallback } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoRobinson } from "d3-geo-projection";
import { geoCentroid } from "d3-geo";

// Dimensions
const width = 800;
const height = 600;

// Robinson projection centered in the viewport
const projection = geoRobinson()
  .translate([width / 2, height / 2])
  .scale(150);

export default function MapChart() {
  // State for controlled center and zoom
  const [position, setPosition] = useState({
    coordinates: [0, 0],
    zoom: 1
  });

  // Compute centroid on click and zoom in
  const handleContinentClick = useCallback((geo) => {
    const [lon, lat] = geoCentroid(geo);
    setPosition({ coordinates: [lon, lat], zoom: 4 });
  }, []);

  // Reset to full-world view
  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  return (
    <div style={{ maxWidth: width, margin: "0 auto" }}>
      <button onClick={handleReset} style={{ marginBottom: 10 }}>
        Reset View
      </button>

      <ComposableMap
        projection={projection}
        width={width}
        height={height}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          // Reject all user drag or wheel events
          filterZoomEvent={() => false}
        >
          <Geographies geography="/countries-topojson.json">
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
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
