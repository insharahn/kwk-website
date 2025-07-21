<script>
  import { onMount } from "svelte";

  let { children, callback, options } = $props();

  // this uniqueId just lets us target the element
  // with `document.getElementById(uniqueId)` later on.
  // it's a little hacky, but it works.
  let uniqueId = Math.random().toString();

  // here we define the onMount() function for this component.
  // svelte handles calling the onMount() function *after* all of the HTML in this
  // component has been mounted to the DOM. we have to put the intersection observer
  // stuff in onMount() because we need to target the <div> we create below,
  // but it won't actually exist in the DOM until it's been mounted.
  onMount(() => {
    let intersectionObserver = new IntersectionObserver(callback, options);

    const observedElement = document.getElementById(uniqueId);
    intersectionObserver.observe(observedElement);
  });
</script>

<!-- assign the containing div the id `uniqueId` so we can target it -->
<div id={uniqueId} class="article-text">
  <p>
    {@render children()}
  </p>
</div>

<style>
  .article-text {
    margin: 50vh auto;
    max-width: 600px;
    background-color: rgba(
      238,
      102,
      119,
      0.85
    ); /* bright pink with slight transparency */
    color: #f7f5eb; /* off-white text for contrast */
    border: 3px dashed #ccbb44; /* brihg yellow border */
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 12px 12px #bbbbbb; /* gray shadow */
    font-family: var(--font-sans);
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    margin: 0;
    line-height: 1.5;
  }
</style>
