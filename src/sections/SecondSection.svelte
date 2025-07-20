<!--chart fade in not working-->
<script>
  import { fade } from "svelte/transition";
  import Scroller from "../lib/Scroller.svelte";
  import ObservedArticleText from "../lib/ObservedArticleText.svelte";
  import HomeownershipRateChangeChart from "./HomeownershipRateChangeChart.svelte";

  let highlight2016 = false;
  let highlight2023 = false;
  let showChart = false;

  const options = { threshold: [0.8, 0.95] };

  // callbacks
  const showChartCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showChart = true; // fade in once and stay visible
      }
    });
  };

  const highlight2016Callback = (entries) => {
    entries.forEach((entry) => {
      highlight2016 = entry.intersectionRatio >= 0.9;
    });
  };

  const highlight2023Callback = (entries) => {
    entries.forEach((entry) => {
      highlight2023 = entry.intersectionRatio >= 0.9;
    });
  };
</script>

<Scroller layout="left" ariaLabelledby="ownership-gap-heading">
  {#snippet sticky()}
    <div
      class="chart-container {showChart ? 'visible' : ''}"
      role="region"
      aria-labelledby="ownership-gap-heading chart-description"
    >
      <h3 id="ownership-gap-heading" class="sr-only">
        Black vs. National Homeownership Rates (2016–2023)
      </h3>
      <p id="chart-description" class="sr-only">
        Line chart comparing Black homeownership rates and national average from
        2016 to 2023, showing a persistent gap.
      </p>
      <HomeownershipRateChangeChart {highlight2016} {highlight2023} />
    </div>
  {/snippet}

  {#snippet scrolly()}
    <!-- first text block triggers chart to fade in -->
    <ObservedArticleText callback={showChartCallback} {options}>
      <p>
        In 2016, Black homeownership stood at <strong>41.5%</strong>, already
        below the national average.
      </p>
      <p>
        By 2023, Black homeownership remains lower, despite some gains over
        time.
      </p>
    </ObservedArticleText>

    <ObservedArticleText callback={highlight2016Callback} {options}>
      <p>
        These numbers highlight how systemic barriers keep homeownership rates
        lower for Black families.
      </p>
    </ObservedArticleText>

    <ObservedArticleText callback={highlight2023Callback} {options}>
      <p>
        This means less opportunity to build equity, pass wealth to the next
        generation, or weather economic downturns.
      </p>
    </ObservedArticleText>

    <ObservedArticleText callback={() => {}} {options}>
      <p>
        These lower rates and values restrict financial security. Historical
        practices like redlining, plus ongoing challenges like discriminatory
        lending, continue to hinder Black families' ability to close the wealth
        gap.
      </p>
    </ObservedArticleText>
  {/snippet}
</Scroller>

<style>
  .chart-container {
    max-width: 90%;
    margin: 0 auto;
    opacity: 0;
    transition: opacity 0.8s ease;
  }
  .chart-container.visible {
    opacity: 1;
  }

  p {
    font-size: 1rem;
    margin: 1rem 0;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
