<!--interactive slider component for year wise differennce-->
<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let selectedYear = 2023;
  let blackRate = null;
  let nationalRate = null;
  let gap = null;
  let yearOptions = [];

  let nationalData = [];
  let blackData = [];

  onMount(async () => {
    const parseDate = d3.timeParse("%m/%d/%Y");

    const nationalRaw = await d3.csv(
      import.meta.env.BASE_URL + "public/data/homeownership_16_to_23_caseshiller.csv"
    );
    const blackRaw = await d3.csv(
      import.meta.env.BASE_URL + "public/data/black_homeownership_16_to_23_caseshiller.csv"
    );

    nationalData = nationalRaw
      .map((d) => {
        const date = parseDate(d.observation_date.trim());
        return date
          ? { year: date.getFullYear(), value: +d.RHORUSQ156N }
          : null;
      })
      .filter(Boolean);

    blackData = blackRaw
      .map((d) => {
        const date = parseDate(d.observation_date.trim());
        return date
          ? { year: date.getFullYear(), value: +d.BOAAAHORUSQ156N }
          : null;
      })
      .filter(Boolean);

    yearOptions = Array.from(new Set(nationalData.map((d) => d.year))).sort();

    updateNumbers();
  });

  $: if (selectedYear && nationalData.length && blackData.length) {
    updateNumbers();
  }

  function updateNumbers() {
    const national = d3.mean(
      nationalData.filter((d) => d.year === selectedYear),
      (d) => d.value
    );
    const black = d3.mean(
      blackData.filter((d) => d.year === selectedYear),
      (d) => d.value
    );
    if (national != null && black != null) {
      nationalRate = national.toFixed(1);
      blackRate = black.toFixed(1);
      gap = (national - black).toFixed(1);
    }
  }
</script>

{#if yearOptions.length}
  <section
    class="year-gap-mini"
    aria-labelledby="year-gap-heading"
    aria-describedby="year-gap-desc"
  >
    <h3 id="year-gap-heading">Explore homeownership gap by year</h3>
    <p id="year-gap-desc">
      Use the slider to pick a year and see the <a
        href="https://fred.stlouisfed.org/series/BOAAAHORUSQ156N"
        >Black homeownership rate</a
      >,
      <a href="https://fred.stlouisfed.org/series/RHORUSQ156N">national rate</a
      >, and the gap between them.
    </p>

    <label for="year-slider"> Pick a year: </label>
    <input
      id="year-slider"
      type="range"
      min={Math.min(...yearOptions)}
      max={Math.max(...yearOptions)}
      step="1"
      bind:value={selectedYear}
      aria-valuemin={Math.min(...yearOptions)}
      aria-valuemax={Math.max(...yearOptions)}
      aria-valuenow={selectedYear}
    />
    <output for="year-slider" aria-live="polite">
      {selectedYear}
    </output>

    <div class="numbers">
      <p>Black homeownership rate: <strong>{blackRate}%</strong></p>
      <p>National rate: <strong>{nationalRate}%</strong></p>
      <p>Gap: <strong>{gap}%</strong></p>
    </div>
  </section>
{:else}
  <p>Loading data...</p>
{/if}

<style>
  .year-gap-mini {
    background-color: rgba(238, 102, 119, 0.8);
    border: 3px dotted #ccbb44;
    border-radius: 1rem;
    color: #f7f5eb;
    padding: 1rem;
    text-align: center;
    max-width: 400px;
    margin: 1rem auto;
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

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
    color: #ccbb44;
  }

  p {
    margin: 0.3rem 0;
  }

  a {
    color: #ccbb44;
    text-decoration: underline;
  }

  a:hover {
    color: #4477aa;
  }

  label {
    display: block;
    margin: 0.5rem 0 0.3rem;
    font-weight: 500;
  }

  input[type="range"] {
    width: 100%;
    max-width: 250px;
    appearance: none;
    background: #aa3377;
    height: 6px;
    border-radius: 3px;
    outline: none;
    margin: 0.5rem 0;
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #ccbb44;
    border: 2px solid #4477aa;
    border-radius: 50%;
    cursor: pointer;
  }

  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #ccbb44;
    border: 2px solid #4477aa;
    border-radius: 50%;
    cursor: pointer;
  }

  output {
    display: block;
    margin-top: 0.3rem;
    font-weight: bold;
    color: #f7f5eb;
  }

  .numbers {
    margin-top: 0.5rem;
  }

  .numbers p strong {
    color: #ccbb44;
  }
</style>
