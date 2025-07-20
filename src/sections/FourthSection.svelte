<script>
  import { fade, fly } from "svelte/transition";
  import Scroller from "../lib/Scroller.svelte";
  import ObservedArticleText from "../lib/ObservedArticleText.svelte";
  import SVIChart from "./SVIChart.svelte";

  let highlightPattern = false;
  let showChart = false; // NEW: controls initial fade in

  const options = { threshold: [0.8, 0.95] };

  // when first block scrolls into view: fade in chart
  const showChartCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showChart = true;
      }
    });
  };

  const highlightCallback = (entries) => {
    entries.forEach((entry) => {
      highlightPattern = entry.intersectionRatio >= 0.9;
    });
  };
</script>

<Scroller layout="right" bg="bg-purple" ariaLabelledby="svi-chart-heading">
  {#snippet sticky()}
    {#if showChart}
      <div
        class="chart-container"
        role="region"
        aria-labelledby="svi-chart-heading svi-chart-desc"
        in:fade={{ duration: 600 }}
      >
        <h3 id="svi-chart-heading" class="visually-hidden">
          Black Population, Social Vulnerability, and Homeownership Scatterplot
        </h3>
        <p id="svi-chart-desc" class="visually-hidden">
          Scatterplot showing counties: higher Black populations often overlap
          with higher social vulnerability and lower homeownership rates.
        </p>
        <SVIChart {highlightPattern} />
      </div>
    {/if}
  {/snippet}

  {#snippet scrolly()}
    <ObservedArticleText callback={showChartCallback} {options}>
      <p>
        Counties with higher Black populations also tend to face higher social
        vulnerability scores — and lower homeownership rates.
      </p>
    </ObservedArticleText>

    <ObservedArticleText callback={highlightCallback} {options}>
      <p>
        This scatterplot shows how systemic factors cluster together: where
        social vulnerability is high, ownership opportunities drop. It’s not
        just about individual choices, but about context shaped by decades of
        policy.
      </p>
    </ObservedArticleText>

    <ObservedArticleText callback={() => {}} {options}>
      <p>
        <strong>Where you live shapes what you can own.</strong> Neighborhoods with
        higher vulnerability often face greater barriers to home loans, lower investment,
        and less opportunity to build equity that can be passed down.
      </p>
    </ObservedArticleText>
  {/snippet}
</Scroller>

<style>
  .chart-container {
    max-width: 90%;
    margin: 0 auto;
  }

  p {
    font-size: 1rem;
    margin: 1rem 0;
  }

  strong {
    font-weight: 600;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
</style>
