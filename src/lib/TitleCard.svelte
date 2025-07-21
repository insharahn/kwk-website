<script>
  let { title, subtitle } = $props();
</script>

<div class="title-card">
  <img
    src={import.meta.env.BASE_URL + "homes.png"}
    alt="Silhouette of a row of houses forming a neighborhood skyline against a purple background"
    class="background-image"
  />
  <div class="content">
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </div>
</div>

<style>
  .title-card {
    background-color: var(--purple);
    height: 100vh;
    /*  width: 100vw; /*full viewport width*/
    margin: 0; /*remove any default margins*/
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    box-sizing: border-box;
    font-family: var(--font-sans);
    font-style: italic;
    position: relative;
    overflow: hidden; /*prevent image overflow*/
    border-bottom: 5px dotted var(--yellow);
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain; /*ensure entire image is visible*/
    object-position: bottom; /*align to bottom for skyline effect */
    z-index: 0;
    opacity: 0.7; /*subtle transparency for dramatic effect*/
  }

  .content {
    max-width: 700px;
    background-color: rgba(
      238,
      102,
      119,
      0.8
    ); /* Paul Tol's Bright pink with transparency */
    padding: 2rem;
    border: 6px dashed var(--yellow);
    border-radius: 2rem;
    /* box-shadow: 16px 16px #bbbbbb; /* Paul Tol's Bright gray */
    position: relative;
    z-index: 1; /*ensure content is above image*/
  }

  h1 {
    font-size: 3rem;
    font-family: var(--font-altmono);
    margin: 0;
    color: #ccbb44; /* Paul Tol's Bright Yellow */
    text-shadow: 1px 1px 0 #1a1a1a;
    font-weight: 700;
  }

  p {
    font-size: 1.3rem;
    color: #f7f5eb; /*light off-white for readability*/
    margin-top: 1rem;
    font-weight: 400;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.1rem;
    }

    .content {
      padding: 1.5rem;
    }
  }
</style>
