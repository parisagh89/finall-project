import React from "react";
import "./../notfound.css";

export default function Notfound() {
  return (
    <div className="section">
      <h1></h1>
      <p class="zoom-area fs-3"> oops!Page not found</p>
      <section class="error-container">
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
        <span class="zero">
          <span class="screen-reader-text">0</span>
        </span>
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
      </section>
    </div>
  );
}
