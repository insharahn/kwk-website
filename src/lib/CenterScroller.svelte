<!--same as scroller but not aligned to one side-->
<script>
  export let sticky;
  export let scrolly;
  export let ariaLabelledby;
</script>

<div class="center-wrapper" aria-labelledby={ariaLabelledby}>
  <div class="sticky">
    {@render sticky()}
  </div>
  <div class="scrolly">
    {@render scrolly()}
  </div>
</div>

<style>
  .center-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center; /* center horizontally */
    justify-content: flex-start;
    background-color: #f7f5eb;
    padding: min(100vh, 30rem) 1rem;
    border-style: solid;
    border-color: #4096fa;
  }

  .sticky {
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
  }

  .scrolly {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* center each text block */
  }

  @media (max-width: 768px) {
    .center-wrapper {
      padding: 2rem 1rem;
      width: 100vw;
    }
  }
</style>
