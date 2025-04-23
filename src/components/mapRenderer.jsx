import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { geoRobinson } from "d3-geo-projection"

const width = 800
const height = 600

const projection = geoRobinson()
  .translate([width / 2, height / 2])
  .scale(150)

export default function MapChart() {
  return (
    <ComposableMap projection={projection}>
      <Geographies geography='/countries-topojson.json'>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  )
}
