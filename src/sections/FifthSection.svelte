<script>
  import { fly } from "svelte/transition";
  import CenterScroller from "../lib/CenterScroller.svelte";
  import ObservedArticleText from "../lib/ObservedArticleText.svelte";

  const options = { threshold: [0.8, 0.95] };
</script>

<!--center-aligned text -->
<CenterScroller bg="bg-gray" ariaLabelledby="reflection-heading">
  {#snippet sticky()}
    <!-- hidden heading for accessibility -->
    <h2 id="reflection-heading" class="visually-hidden">
      Reflections on Generational Wealth and Homeownership
    </h2>
  {/snippet}

  {#snippet scrolly()}
    <ObservedArticleText callback={() => {}} {options}>
      <p in:fly={{ y: 20, duration: 600 }}>
        Generational wealth isn’t just about saving; it’s about what your
        parents and grandparents could buy, and what they could pass on.
      </p>
    </ObservedArticleText>

    <ObservedArticleText callback={() => {}} {options}>
      <p in:fly={{ y: 20, duration: 600 }}>
        The persistent gap in Black homeownership, underscored by lower rates
        (41.5% in 2016, still trailing the national average by 2023) and lower
        median home values in Black communities (e.g., $95,800 in Sumter County,
        Alabama), reflects a broader story of unequal access to generational
        wealth.
      </p>
      <p>
        Systemic barriers like redlining, discriminatory lending, and limited
        access to appreciating neighborhoods continue to limit Black families'
        ability to build equity through homeownership, perpetuating a wealth gap
        that restricts opportunities for financial security and
        intergenerational prosperity.
      </p>
    </ObservedArticleText>

    <ObservedArticleText callback={() => {}} {options}>
      <p in:fly={{ y: 20, duration: 600 }}>
        Addressing this disparity requires collective action to dismantle these
        systemic inequities. Policymakers, communities, and individuals must
        advocate for fair lending practices, invest in affordable housing in
        appreciating areas, and support initiatives that empower Black families
        to achieve sustainable homeownership.
      </p>
    </ObservedArticleText>

    <ObservedArticleText callback={() => {}} {options}>
      <p in:fly={{ y: 20, duration: 600 }}>
        Explore datasets like those at <a href="https://blackwealthdata.org/"
          >blackwealthdata.org</a
        >, engage with local housing advocacy groups, or push for policy reforms
        to help close the gap and ensure homeownership becomes a true engine of
        wealth for all.
      </p>
    </ObservedArticleText>
  {/snippet}
</CenterScroller>

<style>
  p {
    max-width: 600px;
    margin: 1.2rem auto;
    font-size: 1.1rem;
    line-height: 1.5;
    color: #f7f5eb;
    text-align: center;
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
  a {
    color: #ccbb44;
    text-decoration: underline;
  }

  a:hover {
    color: #4477aa;
  }
</style>
