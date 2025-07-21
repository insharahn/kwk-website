<script>
  import { fly } from "svelte/transition";
  import CenterScroller from "../lib/CenterScroller.svelte";
  import ArticleText from "../lib/ArticleText.svelte";

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
    <ArticleText>
      <p>
        Generational wealth isn’t just about saving; it’s about what your
        parents and grandparents could buy, and what they could pass on.
      </p>
    </ArticleText>

    <ArticleText>
      <p>
        The persistent gap in Black homeownership, underscored by lower rates
        (41.5% in 2016, still trailing the national average by 2023) and lower
        median home values in Black communities (e.g., $95,800 in Sumter County,
        Alabama), reflects a broader story of unequal access to generational
        wealth.
      </p>
      <p>
        Historical and ongoing systemic barriers—including redlining (where
        lenders refused mortgages in predominantly Black neighborhoods),
        discriminatory lending practices that offered worse loan terms to Black
        buyers, and limited access to neighborhoods where home prices have
        historically appreciated—have all worked together to undermine Black
        families’ ability to build wealth through homeownership. Even when Black
        households do manage to buy homes, these structural disadvantages often
        mean their properties gain less value over time compared to homes in
        predominantly white neighborhoods. This cycle helps keep a persistent
        wealth gap in place, limiting not only day‑to‑day financial security but
        also intergenerational prosperity.
      </p>
    </ArticleText>

    <ArticleText>
      <p>
        Addressing this disparity requires collective action to dismantle these
        systemic inequities. Policymakers, communities, and individuals must
        advocate for fair lending practices, invest in affordable housing in
        appreciating areas, and support initiatives that empower Black families
        to achieve sustainable homeownership.
      </p>
    </ArticleText>

    <ArticleText>
      <p>
        Explore datasets like those at <a href="https://blackwealthdata.org/"
          >blackwealthdata.org</a
        >, engage with local housing advocacy groups, or push for policy reforms
        to help close the gap and ensure homeownership becomes a true engine of
        wealth for all.
      </p>
    </ArticleText>
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
