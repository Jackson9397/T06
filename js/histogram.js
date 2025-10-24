const drawHistogram = (data) => {
  d3.select("#histogram").selectAll("*").remove();

  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const inner = svg.append("g")
    .attr("class", "inner")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // build initial bins from ALL data
  const [minEC, maxEC] = d3.extent(data, d => d.energyConsumption);
  binGenerator.domain([Math.floor(minEC), Math.ceil(maxEC)]);
  const bins = binGenerator(data);

  xScale.domain([bins[0].x0, bins[bins.length - 1].x1]).range([0, innerWidth]).nice();
  yScale.domain([0, d3.max(bins, b => b.length)]).range([innerHeight, 0]).nice();

  // axes groups with classes (needed for updates)
  inner.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale).ticks(12).tickFormat(d3.format(",")));

  inner.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(yScale).ticks(6));

  // bars container
  inner.append("g")
    .attr("class", "bars")
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
      .attr("height", d => innerHeight - yScale(d.length))
      .attr("fill", barColor)
      .attr("stroke", bodyBackgroundColor)
      .attr("stroke-width", 2);

  // labels
  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", 30).attr("y", 20)
    .text("Frequency");

  svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "end")
    .attr("x", width - 20).attr("y", height - 5)
    .text("Labeled Energy Consumption (kWh/year)");
};

/* Update histogram from a provided subset */
function updateHistogramWithData(subset) {
  const inner = d3.select("#histogram svg g.inner");
  if (inner.empty()) return;

  const [minEC, maxEC] = d3.extent(subset, d => d.energyConsumption);
  binGenerator.domain([Math.floor(minEC ?? 0), Math.ceil(maxEC ?? 1)]);
  const bins = binGenerator(subset);

  xScale.domain([bins[0]?.x0 ?? 0, bins[bins.length - 1]?.x1 ?? 1]).range([0, innerWidth]).nice();
  yScale.domain([0, d3.max(bins, b => b.length) ?? 1]).range([innerHeight, 0]).nice();

  const t = d3.transition().duration(450).ease(d3.easeCubicInOut);

  inner.select(".axis--x").transition(t)
    .call(d3.axisBottom(xScale).ticks(12).tickFormat(d3.format(",")));
  inner.select(".axis--y").transition(t)
    .call(d3.axisLeft(yScale).ticks(6));

  const bars = inner.select("g.bars").selectAll("rect")
    .data(bins, d => `${d.x0}-${d.x1}`);

  bars.enter().append("rect")
      .attr("x", d => xScale(d.x0))
      .attr("y", yScale(0))
      .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
      .attr("height", 0)
      .attr("fill", barColor)
      .attr("stroke", bodyBackgroundColor).attr("stroke-width", 2)
    .merge(bars)
      .transition(t)
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
      .attr("height", d => innerHeight - yScale(d.length));

  bars.exit().transition(t).attr("y", yScale(0)).attr("height", 0).remove();
}
