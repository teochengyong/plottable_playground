function drawTimeAxes (el) {
  const scale = new window.Plottable.Scales.Time()
  scale.domain([new Date('2014-01-01'), new Date('2015-01-01')])
  const axis = new window.Plottable.Axes.Time(scale, 'bottom')
  const configs = axis.axisConfigurations()
  const newConfigs = []

  configs.forEach(function (tierConfiguration) {
    const newTierConfiguration = []
    tierConfiguration.forEach(function (row) {
      if (row.interval === 'day' || row.interval === 'month' || row.interval === 'year') {
        newTierConfiguration.push(row)
      }
    })
    newConfigs.push(newTierConfiguration)
  })
  axis.axisConfigurations(newConfigs)
  axis.renderTo(el)
  new window.Plottable.Interactions.PanZoom(scale, null).attachTo(axis).maxDomainExtent(scale, new Date(2970, 1)).minDomainExtent(scale, new Date(1970, 0, 2));
}

function drawDayMonthYearAxes (el) {
  const scale = new window.Plottable.Scales.Time()
  scale.domain([new Date('2015-08-02'), new Date('2015-08-24')])
  const axis = new window.Plottable.Axes.Time(scale, 'bottom')
  const configs = axis.axisConfigurations()
  const newConfigurations = []
  configs.forEach(function (r) {
    const newRow = []
    r.forEach(function (c) {
      if (c.interval === 'day' || c.interval === 'month' || c.interval === 'year') {
        newRow.push(c)
      }
    })
    newConfigurations.push(newRow)
  })
  axis.axisConfigurations(newConfigurations)
  axis.renderTo(el)
  new window.Plottable.Interactions.PanZoom(scale, null).attachTo(axis).maxDomainExtent(scale, new Date(2170, 1)).minDomainExtent(scale, new Date(1970, 0, 2))
}

function draw4TierAxes (el) {
  const scale = new window.Plottable.Scales.Time().domain([new Date('2017-05-25'), new Date('2017-05-31')]);
  const axis = new window.Plottable.Axes.Time(scale, 'bottom')
  const newConfigs = []
  const tiers = []
  tiers.push({
    formatter: new window.Plottable.Formatters.time('%H:%M'),
    interval: window.Plottable.TimeInterval.hour,
    step: 12
  })
  tiers.push({
    formatter: new window.Plottable.Formatters.time('%d'),
    interval: window.Plottable.TimeInterval.day,
    step: 1
  })
  tiers.push({
    formatter: new window.Plottable.Formatters.time('%B'),
    interval: window.Plottable.TimeInterval.month,
    step: 1
  })
  tiers.push({
    formatter: new window.Plottable.Formatters.time('Y'),
    interval: window.Plottable.TimeInterval.year,
    step: 1
  })
  newConfigs.push(tiers)
  axis.axisConfigurations(newConfigs)
  axis.renderTo(el)
}
export {drawTimeAxes, drawDayMonthYearAxes, draw4TierAxes}
