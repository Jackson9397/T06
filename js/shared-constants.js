/************ Dimensions ************/
const margin = { top: 50, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth  = width  - margin.left - margin.right;
const innerHeight = height - margin.top  - margin.bottom;

/************ Colours ************/
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

/************ Globals for scatterplot ************/
let innerChartS;                       // assigned in drawScatterplot
const tooltipWidth  = 65;
const tooltipHeight = 32;

/************ Scales ************/
/* Histogram */
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
/* Scatterplot */
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

/************ Binner ************/
/* IMPORTANT: bin by energyConsumption ONLY */
const binGenerator = d3.bin().value(d => d.energyConsumption);

/************ Filters metadata ************/
/* Screen technology */
const filters_screen = [
  { id: "all",  label: "All",  isActive: true },
  { id: "LED",  label: "LED",  isActive: false },
  { id: "LCD",  label: "LCD",  isActive: false },
  { id: "OLED", label: "OLED", isActive: false },
];

/* Screen size (most common & 98") */
const filters_size = [
  { id: "size_all", label: "All",  value: null, isActive: true },
  { id: "size_24",  label: '24"',  value: 24,   isActive: false },
  { id: "size_32",  label: '32"',  value: 32,   isActive: false },
  { id: "size_55",  label: '55"',  value: 55,   isActive: false },
  { id: "size_65",  label: '65"',  value: 65,   isActive: false },
  { id: "size_98",  label: '98"',  value: 98,   isActive: false },
];

/* Helpers to read active states */
const getActiveTechId  = () => (filters_screen.find(f => f.isActive)?.id || "all");
const getActiveSizeVal = () => (filters_size.find(f => f.isActive)?.value ?? null);
