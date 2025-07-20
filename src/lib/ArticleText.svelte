<script>
  let { children } = $props();
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
    ); /* Bright Pink with slight transparency */
    color: #f7f5eb; /* Off-white text for contrast */
    border: 3px solid #ccbb44; /* Bright Yellow border */
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 12px 12px #4477aa; /* Bright Blue shadow */
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
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    margin: 0;
    line-height: 1.5;
  }
</style>
