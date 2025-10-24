/************** Filtering logic (tech + size) **************/
function getFilteredData(allData) {
  const techId = getActiveTechId();        // "all" | "LED" | "LCD" | "OLED"
  const sizeVal = getActiveSizeVal();      // null or a number

  return allData.filter(d =>
    (techId === "all" || d.screenTech === techId) &&
    (sizeVal === null || d.screenSize === sizeVal)
  );
}

function updateAllCharts(allData) {
  const subset = getFilteredData(allData);
  updateHistogramWithData(subset);
  updateScatterplotWithData(subset);
}

/* Screen-tech buttons (Step 7) */
const populateFilters = (data) => {
  const root = d3.select("#filters_screen");

  const btns = root.selectAll("button.filter.filter--tech")
    .data(filters_screen, d => d.id)
    .join("button")
      .attr("type", "button")
      .attr("class", d => `filter filter--tech ${d.isActive ? "is-active" : ""}`)
      .attr("aria-pressed", d => d.isActive.toString())
      .text(d => d.label)
      .on("click", (e, d) => {
        if (d.isActive) return;
        filters_screen.forEach(f => { f.isActive = (f.id === d.id); });
        btns.classed("is-active", f => f.isActive).attr("aria-pressed", f => f.isActive);
        updateAllCharts(window.__TV_DATA__);  // ✅ different subsets for all/LED/LCD/OLED
      });
};

/* Screen-size buttons (extra) */
const populateSizeFilters = (data) => {
  const root = d3.select("#filters_size");

  const btns = root.selectAll("button.filter.filter--size")
    .data(filters_size, d => d.id)
    .join("button")
      .attr("type", "button")
      .attr("class", d => `filter filter--size ${d.isActive ? "is-active" : ""}`)
      .attr("aria-pressed", d => d.isActive.toString())
      .text(d => d.label)
      .on("click", (e, d) => {
        if (d.isActive) return;
        filters_size.forEach(f => { f.isActive = (f.id === d.id); });
        btns.classed("is-active", f => f.isActive).attr("aria-pressed", f => f.isActive);
        updateAllCharts(window.__TV_DATA__);
      });
};

/************** Tooltip for scatterplot **************/
const createTooltip = () => {
  // create the group in the scatterplot inner chart
  const g = innerChartS.append("g")
    .attr("class", "tooltip")
    .style("opacity", 0);

  g.append("rect")
    .attr("width", tooltipWidth).attr("height", tooltipHeight)
    .attr("rx", 3).attr("ry", 3)
    .attr("fill", barColor).attr("fill-opacity", .75);

  g.append("text")
    .attr("x", tooltipWidth / 2).attr("y", tooltipHeight / 2 + 2)
    .attr("text-anchor", "middle").attr("alignment-baseline", "middle")
    .attr("fill", "#fff").style("font-weight", 900).text("NA");

  // store globally for mouse handler
  window.__TIP__ = g;
};

const handleMouseEvents = () => {
  innerChartS.selectAll("circle")
    .on("mouseenter", (e, d) => {
      window.__TIP__.select("text").text(d.screenSize);
      const cx = +e.target.getAttribute("cx");
      const cy = +e.target.getAttribute("cy");
      window.__TIP__
        .attr("transform", `translate(${cx - 0.5*tooltipWidth}, ${cy - 1.5*tooltipHeight})`)
        .transition().duration(180).style("opacity", 1);
    })
    .on("mouseleave", () => {
      window.__TIP__.style("opacity", 0).attr("transform", "translate(0,500)");
    });
};
