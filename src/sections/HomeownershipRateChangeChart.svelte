<!-- this chart will show the difference between % of homeownership rate
     for america overall and the black population within
     data from https://fred.stlouisfed.org/series/RHORUSQ156N & https://fred.stlouisfed.org/series/BOAAAHORUSQ156N -->

<script lang="ts">
  import * as Highcharts from "highcharts";
  import Accessibility from "highcharts/modules/accessibility";
  import { Chart } from "@highcharts/svelte";
  import { onMount } from "svelte";
  import * as d3 from "d3";

  //export props to allow parent to pass them in
  export let highlight2016: boolean = false;
  export let highlight2023: boolean = false;

  let options = null;

  onMount(async () => {
    console.log("Loading data");

    //load data from both CSVs
    const nationalRaw = await d3.csv(
      import.meta.env.BASE_URL + "public/data/homeownership_16_to_23_caseshiller.csv"
    );
    console.log("Loaded national rate data:", nationalRaw); //for debugging

    const blackRaw = await d3.csv(
      import.meta.env.BASE_URL + "public/data/black_homeownership_16_to_23_caseshiller.csv"
    );
    console.log("Loaded black rate data:", blackRaw); //for debugging

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

    //timestamp and value for highcarts series
    const nationalSeries = national.map((d) => [d.date.getTime(), d.value]);
    const blackSeries = black.map((d) => [d.date.getTime(), d.value]);

    //plot!
    options = {
      chart: { type: "spline" },
      title: { text: "Black vs. National Homeownership Rate (2016–2023)" },
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
        xDateFormat: "%b %Y", //appreviation month and year like Jun 2025
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
          color: "#1f77b4", //blue
        },
        {
          name: "Black Homeownership",
          data: blackSeries,
          color: "#d62728", //red
        },
      ],
      credits: { enabled: false },
    };
  });
</script>

<figure>
  <!--wrapped in figure tag for screen readers-->
  {#if options}
    <div class="chart-wrapper">
      <Chart {options} highcharts={Highcharts} />
    </div>
  {:else}
    <p>Loading chart...</p>
  {/if}
  <figcaption>
    Black vs National Homeownership Rate from 2016–2023. Sources: <a
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
  figure {
    background-color: rgba(238, 102, 119, 0.8);
    border: 3px dotted #ccbb44;
    border-radius: 1rem;
    padding: 1rem;
    margin: 2rem auto;
    max-width: 900px;
    text-align: center;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      sans-serif;
  }

  figcaption {
    font-size: 0.85rem;
    color: #f7f5eb;
    margin-top: 0.5rem;
  }

  figcaption a {
    color: #ccbb44;
    text-decoration: underline;
  }

  figcaption a:hover {
    color: #4477aa;
  }
  .chart-wrapper {
    overflow-x: auto;
  }
</style>
