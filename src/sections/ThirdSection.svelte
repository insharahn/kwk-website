<script>
  import Scroller from "../lib/Scroller.svelte";
  import ObservedArticleText from "../lib/ObservedArticleText.svelte";
  import CountyMedianInteractive from "./CountyMedianInteractive.svelte";

  const options = { threshold: [0.8, 0.95] };
  const dummyCallback = () => {};
</script>

<Scroller layout="left" bg="bg-gray" ariaLabelledby="county-median-heading">
  {#snippet scrolly()}
    <ObservedArticleText callback={dummyCallback} {options}>
      <p>
        Imagine where you live determining the shape of your wealth - a factor
        completely out of your control, often determined before you're even
        born.
      </p>
      <p>
        <strong>
          Across the U.S., the value of homes in predominantly Black counties is
          lower on average than the national median.</strong
        >
      </p>
      <p>
        This difference isn’t just because of the homes themselves, but because
        of a long history of discriminatory lending practices, deliberate
        underfunding of certain neighborhoods, and policies that excluded Black
        families from fair access to credit and investment. Even when two
        families have the same income and buying power, it isn't uncommon for
        them to see dramatically different returns on homeownership depending on
        where they live.
      </p>
    </ObservedArticleText>

    <ObservedArticleText callback={dummyCallback} {options}>
      <p>
        These gaps aren’t accidental. Not to mention the fact that <strong
          >they still matter today.</strong
        >
      </p>
      <p>
        Home value differences compound over generations, limiting the ability
        to build equity, pay for college, or pass on wealth. Where you live can
        affect the quality of local schools, access to credit, and the stability
        of housing prices. While individuals don’t choose these legacies, they
        feel the effects, and those effects shape entire communities.
      </p>
    </ObservedArticleText>
  {/snippet}

  {#snippet sticky()}
    <div
      class="interactive-container"
      role="region"
      aria-labelledby="county-median-heading"
    >
      <span id="county-median-heading" class="visually-hidden">
        Interactive: Lookup median Black home values by U.S. county
      </span>
      <CountyMedianInteractive />
    </div>
  {/snippet}
</Scroller>

<style>
  .interactive-container {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  /* visually hidden text for screen readers */
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

  p {
    font-size: 1rem;
    margin: 1rem 0;
  }
</style>
