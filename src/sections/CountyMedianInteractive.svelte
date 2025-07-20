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
  figcaption {
    font-size: 0.85rem;
    color: #555;
    margin-top: 0.75rem;
  }

  figcaption a {
    color: purple;
    text-decoration: underline;
  }

  .county-lookup {
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
    color: #333;
    margin: 1rem auto;
    max-width: 500px;
    padding: 1.5rem;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.2rem;
    margin: 0 0 0.5rem;
    color: #2c5282;
  }

  p#lookup-desc {
    font-size: 0.9rem;
    color: #4a5568;
    margin: 0 0 1rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  input[type="text"] {
    width: 100%;
    max-width: 300px;
    padding: 0.75rem;
    font-size: 0.95rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: #f7fafc;
    transition: border-color 0.2s;
  }

  input[type="text"]:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1);
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #ffffff;
    background: #2c5282;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover {
    background: #2a4365;
  }

  button:nth-child(2) {
    background: #718096;
  }

  button:nth-child(2):hover {
    background: #5a6b82;
  }

  .result {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #edf2f7;
    border-radius: 6px;
  }

  .result h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #2c5282;
    margin: 0 0 0.5rem;
  }

  .result p {
    margin: 0.3rem 0;
    font-size: 0.9rem;
    color: #4a5568;
  }

  .result p strong {
    color: #2d3748;
  }

  .error {
    color: #c53030;
    font-size: 0.9rem;
    margin: 0.5rem 0;
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
