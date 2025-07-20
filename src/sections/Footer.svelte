<footer
  class="site-footer"
  aria-label="Site footer with image credits and contact links"
>
  <div class="footer-content">
    <ul class="footer-links">
      <li>
        <a href="https://blackwealthdata.org/" target="_blank" rel="noopener">
          BWDC Site
        </a>
      </li>
      <li>
        <a
          href="https://www.kodewithklossy.com/"
          target="_blank"
          rel="noopener"
        >
          Kode with Klossy
        </a>
      </li>
      <li>
        <a href="mailto:insharahnazir@gmail.com">insharahnazir@gmail.com</a>
      </li>
      <li>
        <a href="https://github.com/insharahn">GitHub</a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/insharah-irfan-nazir-a1903b247/">
          LinkedIn
        </a>
      </li>
    </ul>

    <div class="image-credits">
      <strong>Image Sources:</strong>
      <a
        href="https://www.vecteezy.com/vector-art/14242411-silhouette-of-houses-on-the-winter-skyline-suburban-neighborhood-landscape-with-snowfall-countryside-cottage-homes-glyph-vector-illustration"
        target="_blank"
        rel="noopener"
      >
        Skyline houses vector
      </a>,
      <a
        href="https://png.pngtree.com/png-clipart/20230927/original/pngtree-house-with-no-background-png-image_13001602.png"
        target="_blank"
        rel="noopener"
      >
        House PNG
      </a>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background-color: #aa3377; /* Bright Purple */
    color: #f7f5eb; /* Off-white text */
    padding: 1rem 1.5rem;
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
    font-size: 0.95rem;
    border-top: 4px dotted #ccbb44; /* dotted top border */
    bottom: 0;
    width: 100%;
    z-index: 10;
  }

  .footer-content {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0 0 0.5rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .footer-links li {
    margin: 0 0.4rem;
    position: relative;
  }

  .footer-links li:not(:last-child)::after {
    content: " • ";
    color: #ccbb44; /* Bright Yellow separator */
    margin-left: 0.4rem;
  }

  .footer-links a {
    color: #ccbb44; /* Bright Yellow */
    text-decoration: underline;
    transition: color 0.2s;
  }

  .footer-links a:hover {
    color: #4477aa; /* Bright Blue on hover */
  }

  .image-credits {
    font-size: 0.75rem; /* smaller text */
    color: #f7f5eb;
    text-align: center;
    margin-top: 0.4rem;
  }

  .image-credits a {
    color: #ccbb44;
    text-decoration: underline;
  }

  .image-credits a:hover {
    color: #4477aa;
  }
</style>
