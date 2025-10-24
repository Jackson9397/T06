// Load and parse data, then render everything
d3.csv("data/Ex6_TVdata.csv", d => ({
  brand: d.brand,
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech,
  energyConsumption: +d.energyConsumption,
  star: +d.star
}))
.then(data => {
  window.__TV_DATA__ = data;              // single source of truth

  drawHistogram(data);
  drawScatterplot(data);

  // filters
  populateFilters(data);                   // screen tech
  populateSizeFilters(data);              // screen size

  // tooltip on scatter
  createTooltip();
  handleMouseEvents();

  // ensure both charts reflect current filter states (initially "All"+"All")
  updateAllCharts(data);
})
.catch(err => console.error("Error loading CSV:", err));
