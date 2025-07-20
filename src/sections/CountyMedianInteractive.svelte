<!-- this component allows users to look up the median and other details in their county 
 source: https://blackwealthdata.org/explore/homeownership#HOM-06-->
<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let data = [];
  let query = "";
  let result = null;
  let error = null;

  onMount(async () => {
    const raw = await d3.csv(
      "/kwk-scrollytelling-template/data/black_median_home_value.csv"
    );
    data = raw
      .filter(
        (d) =>
          d.geo_name &&
          d.geo_name.trim() !== "" &&
          !/^\d+$/.test(d.geo_name.trim())
      )
      .map((d) => ({
        county: d.geo_name.trim(),
        state: d.state_name?.trim() || "",
        medianWithMortgage:
          +d.median_home_value_owner_occupied_houses_with_mortages || 0,
        medianWithoutMortgage:
          +d.median_home_value_owner_occupied_houses_without_mortages || 0,
        pctBlack: +d.pct_black_alone || 0,
        pctHomeownership: +d.pct_homeownership_black_alone || 0,
      }));
  });

  function search() {
    error = null;
    if (!query.trim()) {
      error = "Please enter a county name.";
      result = null;
      return;
    }
    const found = data.find((d) =>
      d.county.toLowerCase().includes(query.trim().toLowerCase())
    );
    result = found || null;
    if (!found) {
      error = "No matching county found.";
    }
  }

  function random() {
    if (data.length) {
      const filtered = data.filter(
        (d) => d.county && d.county !== "" && !/^\d+$/.test(d.county)
      );
      const randomEntry = filtered[Math.floor(Math.random() * filtered.length)];
      if (randomEntry) {
        result = randomEntry;
        query = randomEntry.county;
      }
    }
  }

  function handleKeypress(event) {
    if (event.key === "Enter") {
      search();
    }
  }
</script>

{#if data.length}
  <figure
    class="county-lookup"
    aria-labelledby="lookup-heading"
    aria-describedby="lookup-desc source-note"
  >
    <h3 id="lookup-heading">Explore Black Median Home Values by County</h3>
    <p id="lookup-desc">
      Enter a county name or click "Random County" to view median home values,
      Black population percentage, and Black homeownership rate.
    </p>

    <div class="input-group">
      <label for="county-search" class="visually-hidden">County name</label>
      <input
        id="county-search"
        type="text"
        bind:value={query}
        placeholder="Enter county name, e.g., Cook County"
        aria-label="County name"
        on:keypress={handleKeypress}
      />
      <div class="buttons">
        <button type="button" on:click={search}>Search</button>
        <button type="button" on:click={random}>Random County</button>
      </div>
    </div>

    {#if error}
      <p class="error" aria-live="polite">{error}</p>
    {/if}

    {#if result}
      <div class="result" aria-live="polite">
        <h4>{result.county}</h4>
        <p>
          <strong>Median home value (with mortgage):</strong>
          ${result.medianWithMortgage.toLocaleString()}
        </p>
        <p>
          <strong>Median home value (without mortgage):</strong>
          ${result.medianWithoutMortgage.toLocaleString()}
        </p>
        <p><strong>Black population:</strong> {result.pctBlack.toFixed(1)}%</p>
        <p>
          <strong>Black homeownership:</strong>
          {result.pctHomeownership.toFixed(1)}%
        </p>
      </div>
    {/if}

    <figcaption id="source-note">
      Source: <a
        href="https://blackwealthdata.org/explore/homeownership#HOM-06"
        target="_blank"
        rel="noopener">Black Wealth Data Center</a
      >
    </figcaption>
  </figure>
{:else}
  <p>Loading data...</p>
{/if}

<style>
  .county-lookup {
    background-color: rgba(238, 102, 119, 0.8);
    border: 3px dotted #ccbb44;
    border-radius: 1rem;
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
    font-size: 0.95rem;
    color: #f7f5eb;
    padding: 1.5rem;
    margin: 2rem auto;
    max-width: 600px;
    text-align: left;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #f7f5eb;
  }

  p#lookup-desc {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  input[type="text"] {
    width: 80%;
    padding: 0.75rem;
    font-size: 0.95rem;
    border: 2px solid #ccbb44;
    border-radius: 0.5rem;
    background: #fffaf2;
    color: #333;
  }

  input[type="text"]:focus {
    outline: none;
    border-color: #4477aa;
    box-shadow: 0 0 0 3px rgba(68, 119, 170, 0.3);
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #f7f5eb;
    background: #4477aa;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover {
    background: #335a88;
  }

  button:nth-child(2) {
    background: #ccbb44;
    color: #333;
  }

  button:nth-child(2):hover {
    background: #b7a631;
  }

  .result {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(255, 250, 242, 0.9);
    border-radius: 0.75rem;
    color: #333;
  }

  .result h4 {
    margin-top: 0;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .result p {
    margin: 0.3rem 0;
    font-size: 0.9rem;
  }

  .result p strong {
    color: #aa3377;
  }

  .error {
    color: #ffdddd;
    background: #aa3377;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }

  figcaption {
    font-size: 0.85rem;
    color: #f7f5eb;
    margin-top: 0.75rem;
  }

  figcaption a {
    color: #ccbb44;
    text-decoration: underline;
  }

  figcaption a:hover {
    color: #4477aa;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
</style>
