<script lang="ts">
  import * as Highcharts from "highcharts";
  import Accessibility from "highcharts/modules/accessibility";
  import { Chart } from "@highcharts/svelte";
  import { onMount } from "svelte";
  import * as d3 from "d3";

  //prop for fourth section
  export let highlightPattern: boolean = false;

  let options = null;

  onMount(async () => {
    console.log("Loading scatterplot data...");

    const rawData = await d3.csv(
      "/kwk-scrollytelling-template/data/svi_by_county.csv"
    );
    console.log("Loaded raw data:", rawData);

    //paerse data and seperate into scatterplot data points (svi, percentage)
    const dataPoints = rawData.map((d) => ({
      x: +d.rpl_themes,
      y: +d.pct_owner_occupied_black_alone,
      name: d.geo_name,
      blackPct: +d.pct_black_alone,
    }));

    console.log("Parsed data points:", dataPoints);

    //colorblind-friendly color scale (Turbo from ColorBrewer)
    const colorScale = d3
      .scaleSequential(d3.interpolateTurbo)
      .domain([0, d3.max(dataPoints, (d) => d.blackPct)]); //map to black population percentage

    //add color to each data point
    const coloredDataPoints = dataPoints.map((d) => ({
      ...d,
      color: colorScale(d.blackPct),
      marker: {
        fillOpacity: 0.7, //slightly translucent for better overlap visibility
      },
    }));

    options = {
      chart: { type: "scatter", zoomType: "xy" },
      title: { text: "Black Homeownership vs SVI by County (2023)" },
      subtitle: {
        text: "Each dot = one county; hover to see details; color indicates % Black Population",
      },
      accessibility: {
        enabled: true,
        description:
          "This scatterplot shows each U.S. county as a diamond-shaped dot. The x-axis shows the Social Vulnerability Index (SVI) from 0 to 1. The y-axis shows the percentage of Black owner-occupied homes in that county in 2023. Dot color represents the percentage of Black population, with a gradient from dark blue (low) to yellow (high). Users can hover or focus each dot to hear the county name, SVI, homeownership percentage, and Black population percentage.",
        landmarkVerbosity: "one",
        keyboardNavigation: {
          enabled: true,
        },
      },
      xAxis: {
        title: { text: "Social Vulnerability Index (SVI)" },
        min: 0,
        max: 1,
      },
      yAxis: {
        title: { text: "% Black Owner-Occupied Homes" },
        min: 0,
      },
      tooltip: {
        headerFormat: "",
        pointFormat:
          "<b>{point.name}</b><br/>SVI: {point.x:.2f}<br/>% Black Homeownership: {point.y}%<br/>% Black Population: {point.blackPct}%",
      },
      legend: {
        enabled: true,
        title: { text: "% Black Population" },
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        symbolHeight: 280,
        labelFormatter: function () {
          return null; //hide individual point labels in legend
        },
        useHTML: true,
        squareSymbol: false,
        symbolWidth: 20,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      },
      series: [
        {
          name: "County",
          data: coloredDataPoints,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, d3.interpolateTurbo(0)],
              [1, d3.interpolateTurbo(1)],
            ],
          },
        },
      ],
      plotOptions: {
        scatter: {
          marker: {
            radius: 6,
            symbol: "diamond",
          },
          states: {
            hover: { enabled: true, lineWidth: 1 },
          },
          accessibility: {
            point: {
              valueDescriptionFormat:
                "{index}. {point.name}. SVI: {point.x:.2f}. % Black Homeownership: {point.y}%. % Black Population: {point.blackPct}%.",
            },
          },
        },
        series: {
          descriptionFormatter: function (series) {
            return (
              series.name +
              ", scatterplot series of counties with color indicating Black population percentage."
            );
          },
          pointDescriptionEnabledThreshold: 50,
        },
      },
      credits: { enabled: false },
    };
  });
</script>

<figure>
  {#if options}
    <Chart {options} highcharts={Highcharts} />
  {:else}
    <p>Loading scatterplot...</p>
  {/if}
  <figcaption>
    Scatterplot of Black owner-occupied home percentage vs Social Vulnerability
    Index (SVI) by county in 2023. You can interact with the plot. Dot color
    indicates % Black Population (dark blue = low, yellow = high). Source: <a
      href="https://blackwealthdata.org/explore/homeownership#HOM-05"
      >BWDC Homeownership Dataset</a
    >
  </figcaption>
</figure>

<style>
  figcaption {
    font-size: 0.85rem;
    color: #555;
    margin-top: 0.5rem;
  }
</style>
