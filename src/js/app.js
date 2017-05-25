import {drawLineChart, drawScatterPlot, drawInteractiveChart} from './modules/PlottableGraph.js'
import {draw2SubPlots} from './modules/PlottableflexibleGraph.js'
const data = [
  {'x': 1, 'y': 1},
  {'x': 2, 'y': 2},
  {'x': 3, 'y': 3},
  {'x': 4, 'y': 4}
]
// drawLineChart("#chart", data)

// Format: {x:1, y:1, radius:1, stroke:#FF000}
const colors = ['#C7254E', "#009CDE"]
const scatterData = [];
for( var i=2; i<10; i++) {
  scatterData.push({'x': i, 'y': i, 'radius': Math.pow(i,2), 'stroke': colors[i % colors.length]})
}
// drawScatterPlot("#chart", scatterData)
// draw2SubPlots("#chart")
drawInteractiveChart("#chart", data)
