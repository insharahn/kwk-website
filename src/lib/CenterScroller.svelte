<!-- same as scroller but centered -->
<script>
  export let sticky;
  export let scrolly;
  export let ariaLabelledby;
  export let bg; //background class like bg-pink for easy consistency
</script>

<div class="center-wrapper {bg}" aria-labelledby={ariaLabelledby}>
  <div class="sticky">
    {@render sticky()}
  </div>
  <div class="scrolly">
    {@render scrolly()}
  </div>
</div>

<style>
  /* theme colors as variables */
  :root {
    --pink: #ee6677;
    --purple: #aa3377;
    --yellow: #ccbb44;
    --offwhite: #f7f5eb;
    --bright-blue: #4096fa;
  }

  .center-wrapper {
    background-image: url("/public/homes.png");
    background-repeat: repeat-y;
    background-position: bottom;
    background-size: auto 100px;
    background-size: contain;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--offwhite); /* fallback */
    padding: min(100vh, 30rem) 1rem;
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
    transition: background-color 0.3s ease;
    text-align: center;
  }

  /* optional bg classes for colored background */
  .bg-pink {
    background-color: var(--pink);
  }
  .bg-purple {
    background-color: var(--purple);
  }
  .bg-yellow {
    background-color: var(--yellow);
  }

  .sticky {
    width: 100%;
    margin-bottom: 2rem;
  }

  .scrolly {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
    .center-wrapper {
      padding: 2rem 1rem;
      width: 100vw;
    }
  }
</style>
