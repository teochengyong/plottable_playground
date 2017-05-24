import fetchJSON from './fetchJSON.js'
import {Color} from 'plottable/build/src/scales/colorScale.js'
import {Linear} from 'plottable/build/src/scales/linearScale.js'
import {Bar} from 'plottable/build/src/plots/barPlot.js'
import {Label} from 'plottable/build/src/components/label.js'
import {Table} from 'plottable/build/src/components/table.js'
import {Dataset} from 'plottable/build/src/components/dataset.js'

function draw2SubPlots (el) {
  const colorScale = Color()
  const xScale = Linear()
  // const xAxis = window.Plottable.Axes.Numeric(xScale, 'bottom')

  const yScaleSenate = Linear()
  // const yAxisSenate = window.Plottable.Axes.Numeric(yScaleSenate, 'left')

  const plotSenate = Bar()
    .x(function (d) { return d.start_year }, xScale)
    .y(function (d) { return d.democrats - d.republicans }, yScaleSenate)
    .attr('fill', function (d) { return (d.democrats - d.republicans) > 0 ? '#0000FF' : '#FF0000' }, colorScale)

  const labelSenate = new Label('Senate', -90)

  const yScaleHouse = Linear()
  // const yAxisHouse = window.Plottable.Axes(yScaleHouse, 'left')

  const plotHouse = Bar()
    .x(function (d) { return d.start_year }, xScale)
    .y(function (d) { return d.democrats - d.republicans }, yScaleHouse)
    .attr('fill', function (d) { return (d.democrats - d.republicans) > 0 ? '#0000FF' : '#FF0000' }, colorScale)

  const labelHouse = new Label('House', -90)

  const chart = new Table([
    [labelSenate, null, plotSenate],
    [labelHouse, null, plotHouse],
    [null, null, null]
  ])

  chart.renderTo(el)

  window.Promise.all([fetchJSON('data/house.json'), fetchJSON('data/senate.json')]).then(function (values) {
    plotHouse.addDataset(Dataset(values[0]))
    plotSenate.addDataset(Dataset(values[1]))
  })
}

export {draw2SubPlots}
