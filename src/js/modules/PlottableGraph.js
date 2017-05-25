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

function drawTooltip (el, data) {
  const xScale = new window.Plottable.Scales.Category()
  const yScale = new window.Plottable.Scales.Linear()

  const plot = new window.Plottable.Plots.Bar()
  plot
  .x(function (d) { return d.x }, xScale)
  .y(function (d) { return d.y }, yScale)
  .addDataset(new window.Plottable.Dataset(data))
  .renderTo(el)

  const tooltipAnchorSelection = plot.foreground().append('circle').attr('r', 3).attr('opacity', 0)

  const tooltipAnchor = window.$(tooltipAnchorSelection.node())
  tooltipAnchor.tooltip({
    animation: false,
    container: 'body',
    placement: 'auto',
    title: function (d) {
      return window.$(this).attr('title')
    },
    trigger: 'manual'
  })

  const pointer = new window.Plottable.Interactions.Pointer()

  pointer.onPointerMove(function (p) {
    const closest = plot.entityNearest(p)
    if (closest) {
      tooltipAnchorSelection
        .attr('cx', closest.position.x)
        .attr('cy', closest.position.y)
        .attr('data-toggle', 'tooltip')
        .attr('title', `${closest.datum.y}`)

      tooltipAnchor.tooltip('show')
    }
  })

  pointer.onPointerExit(function () {
    tooltipAnchor.tooltip('hide')
  })

  pointer.attachTo(plot)
}
export {drawLineChart, drawScatterPlot, drawInteractiveChart, drawTooltip}
