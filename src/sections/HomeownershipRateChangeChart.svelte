<!-- this chart will show the difference between % of homeownership rate
     for america overall and the black population within
     data from https://fred.stlouisfed.org/series/RHORUSQ156N & https://fred.stlouisfed.org/series/BOAAAHORUSQ156N -->

<script>
  import * as Highcharts from "highcharts";
  import Accessibility from "highcharts/modules/accessibility";
  import { Chart } from "@highcharts/svelte";
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let options = null;

  onMount(async () => {
    console.log("Loading data");

    //load data from both CSVs
    const nationalRaw = await d3.csv(
      "/kwk-scrollytelling-template/data/homeownership_16_to_23_caseshiller.csv"
    );

    console.log("Loaded national rate data:", nationalRaw);

    const blackRaw = await d3.csv(
      "/kwk-scrollytelling-template/data/black_homeownership_16_to_23_caseshiller.csv"
    );

    console.log("Loaded black rate data:", blackRaw);

    //parse the date and number
    const parseDate = d3.timeParse("%m/%d/%Y");

    const national = nationalRaw
      .map((d) => {
        const raw = d.observation_date.trim();
        const date = parseDate(raw);
        return date ? { date, value: +d.RHORUSQ156N } : null;
      })
      .filter(Boolean);

    const black = blackRaw
      .map((d) => {
        const raw = d.observation_date.trim();
        const date = parseDate(raw);
        return date ? { date, value: +d.BOAAAHORUSQ156N } : null;
      })
      .filter(Boolean);

    console.log("Parsed national:", national);
    console.log("Parsed black:", black);

    //timestamp (milliseconds) and value for highcarts series
    const nationalSeries = national.map((d) => [d.date.getTime(), d.value]);
    const blackSeries = black.map((d) => [d.date.getTime(), d.value]);

    //plot!
    options = {
      chart: { type: "spline" },
      title: { text: "Black vs National Homeownership Rate (2016–2023)" },
      subtitle: { text: "Click legend items to hide/show series" },
      accessibility: {
        //add accessibility
        description:
          "This line chart compares the homeownership rate of Black households to the national average from 2016 to 2023. There is a persistent gap where Black homeownership remains lower.",
        enabled: true,
        landmarkVerbosity: "one",
        keyboardNavigation: {
          enabled: true,
        },
      },
      xAxis: {
        type: "datetime",
        title: { text: "Year" },
      },
      yAxis: {
        title: { text: "Homeownership Rate (%)" },
        max: 70,
        min: 35,
      },
      tooltip: {
        shared: true,
        valueSuffix: "%",
        xDateFormat: "%b %Y", //appreviation month and year
      },
      plotOptions: {
        series: {
          marker: { enabled: false },
          lineWidth: 2,
          states: {
            hover: { lineWidth: 3 },
          },
        },
      },
      series: [
        {
          name: "National Average",
          data: nationalSeries,
          color: "#1f77b4",
        },
        {
          name: "Black Homeownership",
          data: blackSeries,
          color: "#d62728",
        },
      ],
      credits: { enabled: false },
    };
  });
</script>

<figure>
  <!--wrapped in figure tag for screen readers-->
  {#if options}
    <Chart {options} highcharts={Highcharts} />
  {:else}
    <p>Loading chart...</p>
  {/if}
  <figcaption>
    Black vs National Homeownership Rate from 2016–2023. Source: <a
      href="https://fred.stlouisfed.org/series/RHORUSQ156N"
      target="_blank"
      rel="noopener">FRED RHORUSQ156N</a
    >
    and
    <a
      href="https://fred.stlouisfed.org/series/BOAAAHORUSQ156N"
      target="_blank"
      rel="noopener">FRED BOAAAHORUSQ156N</a
    >
  </figcaption>
</figure>

<style>
  figcaption {
    font-size: 0.85rem;
    color: #555;
    margin-top: 0.5rem;
  }

  figcaption a {
    color: purple;
    text-decoration: underline;
  }
</style>
