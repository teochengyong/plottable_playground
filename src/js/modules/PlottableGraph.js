function drawBarChart (el, data) {
  const xScale = new window.Plottable.Scales.Linear()
  const yScale = new window.Plottable.Scales.Linear()

  const xAxis = new window.Plottable.Axes.Numeric(xScale, 'bottom')
  const yAxis = new window.Plottable.Axes.Numeric(yScale, 'left')

  const plot = new window.Plottable.Plots.Line()
  plot.x(function (d) { return d.x }, xScale)
  plot.y(function (d) { return d.y }, yScale)

  const dataset = new window.Plottable.Dataset(data)
  plot.addDataset(dataset)

  const chart = new window.Plottable.Components.Table([
    [yAxis, plot],
    [null, xAxis]
  ])

  chart.renderTo(el)
}

function drawScatterPlot (el, data) {
  const xScale = new window.Plottable.Scales.Linear()
  const yScale = new window.Plottable.Scales.Linear()

  const xAxis = new window.Plottable.Axes.Numeric(xScale, 'bottom')
  const yAxis = new window.Plottable.Axes.Numeric(yScale, 'left')

  const plot = new window.Plottable.Plots.Scatter()
    .x(function (d) { return d.x }, xScale)
    .y(function (d) { return d.y }, yScale)
    .size(function (d) { return d.radius })
    .attr('stroke', function (d) { return d.stroke })
    .attr('stroke-width', 3)
    .addDataset(new window.Plottable.Dataset(data))

  const chart = new window.Plottable.Components.Table([
    [yAxis, plot],
    [null, xAxis]
  ])

  chart.renderTo(el)
}

export {drawBarChart, drawScatterPlot}
