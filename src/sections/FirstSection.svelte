<script>
  import { fade, fly } from "svelte/transition";
  import Scroller from "../lib/Scroller.svelte";
  import ObservedArticleText from "../lib/ObservedArticleText.svelte";
  import YearGapInteractive from "./YearGapInteractive.svelte";
  import { onMount } from "svelte";
  import * as d3 from "d3";

  //flags for transisitons
  let showHouseImage = false;
  let showMedians = false;
  let showSlider = false;

  //hardcode median
  const nationalMedian = 426525;
  let blackMedian = null;

  //onMount: load & calculate 2023 black median
  onMount(async () => {
    const raw = await d3.csv(
      import.meta.env.BASE_URL + "data/black_median_home_value.csv"
    );
    const values2023 = raw
      .filter((d) => d.year === "2023")
      .map((d) => +d.median_home_value_owner_occupied_houses_with_mortages)
      .filter((v) => !isNaN(v) && v > 0);
    const median = d3.median(values2023);
    blackMedian = median ? Math.round(median) : null;
  });

  const options = { threshold: [0.8, 0.95] };

  //callbacks
  const showHouseCallback = (entries) => {
    //load house for first textbox
    entries.forEach((entry) => {
      showHouseImage = entry.intersectionRatio >= 0.9;
    });
  };

  const showMediansCallback = (entries) => {
    //medians with second
    entries.forEach((entry) => {
      showMedians = entry.intersectionRatio >= 0.9;
    });
  };

  const showSliderCallback = (entries) => {
    //sliders with third
    entries.forEach((entry) => {
      showSlider = entry.intersectionRatio >= 0.9;
    });
  };
</script>

<Scroller layout="left" bg="bg-gray" ariaLabelledby="home-value-gap-heading">
  {#snippet sticky()}
    <aside
      class="visual-side"
      role="complementary"
      aria-label="Visual data and interactive chart"
    >
      {#if showHouseImage}
        <figure in:fade>
          <img
            src={import.meta.env.BASE_URL + "house.png"}
            alt="Single family lego home"
          />
          <figcaption class="sr-only">
            A symbolic image representing homeownership
          </figcaption>
        </figure>
      {/if}

      {#if showMedians && blackMedian}
        <section
          class="medians"
          aria-live="polite"
          in:fly={{ y: 50, duration: 800 }}
        >
          <h4 id="home-value-gap-heading" class="sr-only">
            Median home values in 2023
          </h4>
          <dl>
            <div>
              <dt class="label">Median Black home value (2023):</dt>
              <dd class="number">${blackMedian.toLocaleString()}</dd>
              <dd class="source">
                <a
                  href="https://blackwealthdata.org/explore/homeownership#HOM-06"
                  >Source</a
                >
              </dd>
            </div>
            <div>
              <dt class="label">National median home value (2023):</dt>
              <dd class="number">${nationalMedian.toLocaleString()}</dd>
              <dd class="source">
                <a href="https://fred.stlouisfed.org/series/MSPUS">Source</a>
              </dd>
            </div>
          </dl>
        </section>
      {/if}

      {#if showSlider}
        <section
          aria-label="Interactive slider comparing homeownership rates over years"
          in:fade={{ duration: 500 }}
        >
          <YearGapInteractive />
        </section>
      {/if}
    </aside>
  {/snippet}

  {#snippet scrolly()}
    <ObservedArticleText callback={showHouseCallback} {options}>
      <p>
        For many American families, home equity is the single biggest source of
        generational wealth.
      </p>
    </ObservedArticleText>

    <ObservedArticleText callback={showMediansCallback} {options}>
      <p><strong>But not all families share this equally.</strong></p>
    </ObservedArticleText>

    <ObservedArticleText callback={showSliderCallback} {options}>
      <p>
        Lower median home values mean smaller equity gains and a persistent
        wealth gap. For example, interact with the slider on the left to see how
        Black homeownership rates lag behind national rates by significant
        margins. These lower home values and ownership rates limit wealth
        accumulation, restrict access to credit, and perpetuate inequality
        across generations— reinforcing a cycle where systemic barriers keep
        wealth out of reach.
      </p>
    </ObservedArticleText>
  {/snippet}
</Scroller>

<style>
  .visual-side {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    max-width: 90%;
    border-radius: 8px;
  }

  .medians {
    margin-top: 1rem;
    text-align: center;
    background-color: rgba(238, 102, 119, 0.8);
    border: 5px dotted var(--yellow);
    border-radius: 1rem;
    padding: 1rem;
    font-family: var(--font-mono);
  }

  dl {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 0;
  }

  .label {
    font-size: 1rem;
    color: #f7f5eb;
  }

  .number {
    font-size: 1.8rem;
    font-weight: bold;
    color: #ccbb44;
    margin-left: 0px;
  }

  .source {
    font-size: 0.7rem;
    margin-left: 0px;
  }

  a {
    color: #ccbb44;
    text-decoration: underline;
    transition: color 0.2s;
  }

  a:hover {
    color: #4477aa;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
    border: 0;
    white-space: nowrap;
  }
</style>
