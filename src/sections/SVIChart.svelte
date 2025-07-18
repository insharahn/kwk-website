<!--this chart depicts the svi against the county-wise black population percentage
    source: https://blackwealthdata.org/explore/homeownership#HOM-05 -->
<script>
  import * as Highcharts from "highcharts";
  import Accessibility from "highcharts/modules/accessibility";
  import { Chart } from "@highcharts/svelte";
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let options = null;

  onMount(async () => {
    console.log("Loading scatterplot data...");

    const rawData = await d3.csv(
      "/kwk-scrollytelling-template/data/svi_by_county.csv"
    );
    console.log("Loaded raw data:", rawData);

    //parse into scatterplot data points (svi, percentage)
    const dataPoints = rawData.map((d) => ({
      x: +d.rpl_themes,
      y: +d.pct_owner_occupied_black_alone,
      name: d.geo_name,
      blackPct: +d.pct_black_alone,
    }));

    console.log("Parsed data points:", dataPoints);

    options = {
      chart: { type: "scatter", zoomType: "xy" },
      title: { text: "Black Homeownership vs SVI by County (2023)" },
      subtitle: { text: "Each dot = one county; hover to see details" },
      accessibility: {
        enabled: true,
        description:
          "This scatterplot shows each U.S. county as a diamond-shaped dot. The x-axis shows the Social Vulnerability Index (SVI) from 0 to 1. The y-axis shows the percentage of Black owner-occupied homes in that county in 2023. Users can hover or focus each dot to hear the county name, SVI, and homeownership percentage.",
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
      series: [
        {
          name: "County",
          color: "#1f77b4",
          data: dataPoints,
        },
      ],
      plotOptions: {
        scatter: {
          marker: {
            radius: 6,
            symbol: "diamond",
            fillOpacity: 0.6, //makes points slightly translucent
          },
          states: {
            hover: { enabled: true, lineWidth: 1 },
          },
          accessibility: {
            point: {
              valueDescriptionFormat:
                "{index}. {point.name}. SVI: {point.x:.2f}. % Black Homeownership: {point.y}%.",
            },
          },
        },
        series: {
          descriptionFormatter: function (series) {
            return series.name + ", scatterplot series of counties.";
          },
          pointDescriptionEnabledThreshold: 50, // avoids overwhelming with too many points
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
    Index (SVI) by county in 2023. Source: <a
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
