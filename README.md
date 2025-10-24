📊 TV Energy Consumption (Week 6 — D3.js Interactive Visualisation)
Overview

This project visualises TV energy consumption data using D3.js v7.
It includes:

A histogram showing energy consumption distribution across TVs.

A scatterplot comparing Star Rating vs Energy Consumption.

Interactive filters for:

Screen Technology (All / LED / LCD / OLED)

Screen Size (All / 24 / 32 / 55 / 65 / 98)

An interactive tooltip that displays screen size when hovering over scatterplot points.

🎯 Learning Goals

Understand how to use D3 scales, axes, and data binding.

Implement SVG tooltips and transitions.

Create dynamic filters that update multiple charts simultaneously.

Combine multiple data visualisation techniques in a single web page.

📁 Project Structure

TV-Energy-Consumption/
│
├── index.html                # Main webpage
│
├── css/
│   ├── base.css              # Overall page layout and button styling
│   └── visualisations.css    # Chart-specific styles and tooltip design
│
├── data/
│   └── Ex6_TVdata.csv        # Dataset containing brand, model, screen size, tech, star, etc.
│
├── js/
│   ├── shared-constants.js   # Global constants, margins, scales, and filter definitions
│   ├── histogram.js          # Histogram rendering and update functions
│   ├── scatterplot.js        # Scatterplot rendering and update functions
│   ├── interactions.js       # Tooltip, mouse events, and filters logic
│   └── load-data.js          # Loads CSV, initializes charts, and connects components
│
└── README.md                 # Project documentation

⚙️ Setup Instructions
1. Run a local web server

You must run this project using a local or live server (file URLs will not load CSV data correctly).

Option 1 — VS Code Live Server (Recommended)
Right-click on index.html → “Open with Live Server”

Option 2 — Python local server

cd TV-Energy-Consumption
python -m http.server 5500

Then open in browser:
👉 http://127.0.0.1:5500/index.html

🧮 Data Format

Each record in Ex6_TVdata.csv contains:
| Column Name         | Description                        |
| ------------------- | ---------------------------------- |
| `brand`             | TV brand (e.g., Samsung, Sony)     |
| `model`             | TV model ID                        |
| `screenSize`        | Screen size in inches              |
| `screenTech`        | Screen technology (LED, LCD, OLED) |
| `energyConsumption` | Labeled energy usage (kWh/year)    |
| `star`              | Star rating (1–7)                  |
🧠 How the Code Works
shared-constants.js

Defines chart dimensions, margins, and D3 scales.

Declares global filter arrays and bin generator.

Provides helper functions for reading active filter states.

histogram.js

Builds initial histogram using all data.

Redraws dynamically via updateHistogramWithData() when filters change.

scatterplot.js

Plots each TV as a circle using star (x) and energyConsumption (y).

Includes D3 legend and tooltip setup.

Updates smoothly via updateScatterplotWithData().

interactions.js

Manages:

Tooltip creation (createTooltip)

Mouse hover events (handleMouseEvents)

Filter button logic (populateFilters and populateSizeFilters)

Combined update logic for both filters (updateAllCharts)

load-data.js

Loads CSV dataset.

Initializes both visualisations.

Calls tooltip, event handlers, and filter population functions.

🧩 Example Interaction

Open index.html via Live Server.

Click LED, LCD, or OLED → histogram and scatterplot update automatically.

Click 32" → only 32-inch TVs are displayed.

Hover over scatterplot dots → tooltip shows the screen size.

🎨 Color Scheme

| Element            | Color                 | Description                      |
| ------------------ | --------------------- | -------------------------------- |
| Header             | `#c4611a`             | Title bar background             |
| Buttons            | `#d26c21` / `#ffcc80` | Filter buttons (active/inactive) |
| Histogram Bars     | `#606464`             | Neutral grey                     |
| Scatterplot Colors | Blue / Orange / Green | LED / LCD / OLED                 |
| Background         | `#fffaf0`             | Light ivory                      |

🧾 Notes

Ensure the dataset Ex6_TVdata.csv is in the data/ folder.

File paths are case-sensitive (especially on Mac/Linux).

Requires D3.js version 7.0+.

👨‍💻 Author

Ho Sheng Yang @ 2025
Data Visualisation Week 6, Swinburne University of Technology (Sarawak)