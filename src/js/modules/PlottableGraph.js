function drawLineChart (el, data) {
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

function drawInteractiveChart (el, data) {
  const xScale = new window.Plottable.Scales.Linear()
  const yScale = new window.Plottable.Scales.Linear()

  const plot = new window.Plottable.Plots.Bar()
    .x(function (d) { return d.x }, xScale)
    .y(function (d) { return d.x }, yScale)
    .addDataset(new window.Plottable.Dataset(data))

  const interaction = new window.Plottable.Interactions.Click()

  function onClickInteraction (point) {
    plot.selections().attr('fill', '#5279c7')
    const selection = plot.entitiesAt(point)[0].selection
    selection.attr('fill', '#F99D42')
  }

  interaction.onClick(onClickInteraction)
  interaction.attachTo(plot)
  plot.renderTo(el)
}
export {drawLineChart, drawScatterPlot, drawInteractiveChart}
