const drawScatterplot = (data) => {
  d3.select("#scatterplot").selectAll("*").remove();

  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  innerChartS = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // x = star rating, y = energy consumption
  xScaleS.domain(d3.extent(data, d => d.star)).range([0, innerWidth]).nice();
  yScaleS.domain([0, d3.max(data, d => d.energyConsumption)]).range([innerHeight, 0]).nice();

  // colors by screenTech
  const techs = Array.from(new Set(data.map(d => d.screenTech)));
  colorScale.domain(techs).range(["#2a6fba", "#d0711c", "#2f8a3b"]); // LED/LCD/OLED

  // axes
  innerChartS.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScaleS).ticks(8));

  innerChartS.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(yScaleS).ticks(8));

  // labels
  svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "end")
    .attr("x", width - 20).attr("y", height - 5)
    .text("Star Rating");

  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", 30).attr("y", 20)
    .text("Labeled Energy Consumption (kWh/year)");

  // points
  innerChartS.append("g").attr("class","dots")
    .selectAll("circle").data(data).join("circle")
      .attr("cx", d => xScaleS(d.star))
      .attr("cy", d => yScaleS(d.energyConsumption))
      .attr("r", 3.5)
      .attr("fill", d => colorScale(d.screenTech))
      .attr("fill-opacity", 0.75);

  // legend
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 140}, ${margin.top})`);

  techs.forEach((t, i) => {
    const g = legend.append("g").attr("transform", `translate(0, ${i * 22})`);
    g.append("rect").attr("width", 12).attr("height", 12).attr("rx", 3).attr("fill", colorScale(t));
    g.append("text").attr("x", 18).attr("y", 10).attr("class","axis-label").text(t);
  });
};

/* Update scatter from subset */
function updateScatterplotWithData(subset) {
  if (!innerChartS) return;

  xScaleS.domain(d3.extent(subset, d => d.star)).range([0, innerWidth]).nice();
  yScaleS.domain([0, d3.max(subset, d => d.energyConsumption) ?? 1]).range([innerHeight, 0]).nice();

  const t = d3.transition().duration(400).ease(d3.easeCubicInOut);

  innerChartS.select(".axis--x").transition(t).call(d3.axisBottom(xScaleS).ticks(8));
  innerChartS.select(".axis--y").transition(t).call(d3.axisLeft(yScaleS).ticks(8));

  const dotsG = innerChartS.select("g.dots");
  const dots = dotsG.selectAll("circle").data(subset, (d,i) => d.model ?? i);

  dots.enter().append("circle")
      .attr("r", 3.5)
      .attr("cx", d => xScaleS(d.star))
      .attr("cy", d => yScaleS(d.energyConsumption))
      .attr("fill", d => colorScale(d.screenTech))
      .attr("fill-opacity", 0.75)
    .merge(dots)
      .transition(t)
      .attr("cx", d => xScaleS(d.star))
      .attr("cy", d => yScaleS(d.energyConsumption));

  dots.exit().transition(t).attr("opacity", 0).remove();

  // rebind tooltip on the new selection
  handleMouseEvents();
}
