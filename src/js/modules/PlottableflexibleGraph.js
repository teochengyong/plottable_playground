import fetchJSON from './fetchJSON.js'

function draw2SubPlots (el) {
  const colorScale = new window.Plottable.Scales.Color()
  const xScale = new window.Plottable.Scales.Linear()
  const xAxis = window.Plottable.Axes.Numeric(xScale, 'bottom')

  const yScaleSenate = new window.Plottable.Scales.Linear()
  const yAxisSenate = window.Plottable.Axes.Numeric(yScaleSenate, 'left')

  const plotSenate = new window.Plottable.Plots.Bar()
    .x(function (d) { return d.start_year }, xScale)
    .y(function (d) { return d.democrats - d.republicans }, yScaleSenate)
    .attr('fill', function (d) { return (d.democrats - d.republicans) > 0 ? '#0000FF' : '#FF0000' }, colorScale)

  const labelSenate = new window.Plottable.Components.AxisLabel('Senate', -90)

  const yScaleHouse = new window.Plottable.Scales.Linear()
  const yAxisHouse = window.Plottable.Axes(yScaleHouse, 'left')

  const plotHouse = new window.Plottable.Plots.Bar()
    .x(function (d) { return d.start_year }, xScale)
    .y(function (d) { return d.democrats - d.republicans }, yScaleHouse)
    .attr('fill', function (d) { return (d.democrats - d.republicans) > 0 ? '#0000FF' : '#FF0000' }, colorScale)

  const labelHouse = new window.Plottable.Components.AxisLabel('House', -90)

  const chart = new window.Plottable.Components.Table([
    [labelSenate, yAxisSenate, plotSenate],
    [labelHouse, yAxisHouse, plotHouse],
    [null, null, xAxis]
  ])

  chart.renderTo(el)

  window.Promise.all([fetchJSON('data/house.json'), fetchJSON('data/senate.json')]).then(function (values) {
    plotHouse.addDataset(new window.Plottable.Dataset(values[0]))
    plotSenate.addDataset(new window.Plottable.Dataset(values[1]))
  })
}

export {draw2SubPlots}
