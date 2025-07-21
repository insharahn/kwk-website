<script>
  export let layout;
  export let sticky;
  export let scrolly;
  export let ariaLabelledby; //new
  export let bg; //new for easy bg control
</script>

<div class="wrapper {layout} {bg}" aria-labelledby={ariaLabelledby}>
  <div class="sticky">
    {@render sticky()}
  </div>
  <div class="scrolly">
    {@render scrolly()}
  </div>
</div>

<style>
  /*theme colors as variables: Paul Tol's Bright*/
  :root {
    --pink: #ee6677;
    --purple: #aa3377;
    --yellow: #ccbb44;
    --offwhite: #f7f5eb;
    --bright-blue: #4096fa;
    --gray: #bbbbbb;
  }

  /* wrapper: flexible container with nice border */
  .wrapper {
    padding: min(100vh, 30rem) 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    background-color: var(--offwhite); /* fallback if no bg class */
    transition: background-color 0.3s ease;
  }

  /* bg color classes can pass as bg prop */
  .bg-pink {
    background-color: var(--pink);
  }
  .bg-purple {
    background-color: var(--purple);
  }
  .bg-yellow {
    background-color: var(--yellow);
  }
  .bg-gray {
    background-color: var(--gray);
  }

  /* Layout control: left/right */
  .left .scrolly {
    order: 0;
  }
  .left .sticky {
    order: 1;
  }

  .right .scrolly {
    order: 1;
  }
  .right .sticky {
    order: 0;
  }

  .sticky,
  .scrolly {
    display: flex;
    flex-direction: column;
    flex: 1 1;
  }

  .sticky {
    position: sticky;
    top: 50vh;
    transform: translateY(-50%);
    align-items: center;
    justify-content: center;
    z-index: 0;
  }

  .scrolly {
    z-index: 1;
  }

  @media (max-width: 768px) {
    .wrapper {
      flex-direction: column;
      padding: 2rem 1rem;
      width: 100vw;
    }

    .sticky,
    .scrolly {
      flex: 1 1 auto;
      min-width: 100%;
      position: static;
      transform: none;
    }

    .sticky {
      margin-bottom: 2rem;
    }
  }
</style>
