<script>
  export let children;
</script>

<div class="article-text">
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
    border: 3px dashed var(--yellow); /* brihg yellow border */
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 12px 12px var(--purple); /* purple shadow */
    font-family: var(--font-sans);
    text-align: center;
  }

  .article-text:hover {
    box-shadow: 16px 16px var(--bright-blue);
    background-color: rgba(238, 102, 119, 0.95);
  }

  p {
    font-size: 1.1rem;
    margin: 0;
    line-height: 1.5;
  }
</style>
