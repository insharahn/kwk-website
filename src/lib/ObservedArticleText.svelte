<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let children;
  export let callback;
  export let options;

  // this uniqueId just lets us target the element
  // with `document.getElementById(uniqueId)` later on.
  // it's a little hacky, but it works.
  let uniqueId = Math.random().toString();
  let isVisible = false;

  onMount(() => {
    const el = document.getElementById(uniqueId);
    if (!el) return;

    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
      if (callback) callback(entries);
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<div id={uniqueId} class="article-text" class:visible={isVisible}>
  {#if isVisible}
    <p in:fade={{ duration: 600 }}>
      {@render children()}
    </p>
  {/if}
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
    border: 3px dashed var(--yellow); /* brihg yellow border */
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 12px 12px var(--purple); /* purple shadow */
    font-family: var(--font-sans);
    text-align: center;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .article-text.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .article-text.visible:hover {
    box-shadow: 16px 16px var(--bright-blue);
    background-color: rgba(238, 102, 119, 0.95);
  }

  p {
    font-size: 1.1rem;
    margin: 0;
    line-height: 1.5;
  }
</style>
