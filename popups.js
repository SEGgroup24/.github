/* Simple popups for Sign in, Sign up and Book a session.
   Any link with href="#signin", "#signup" or "#book" opens the matching popup.
   Book links can set data-tutor="Name" to show the tutor's name. */

document.body.insertAdjacentHTML("beforeend", `
  <dialog class="popup" id="signin">
    <button class="close" type="button" aria-label="Close">×</button>
    <form method="dialog">
      <h2>Sign in</h2>
      <label>uOttawa email <input type="email" placeholder="you@uottawa.ca" required></label>
      <label>Password <input type="password" required></label>
      <button class="btn" type="submit">Sign in</button>
      <p class="switch">No account? <a href="#signup">Sign up</a></p>
    </form>
  </dialog>

  <dialog class="popup" id="signup">
    <button class="close" type="button" aria-label="Close">×</button>
    <form method="dialog">
      <h2>Sign up</h2>
      <label>Full name <input type="text" required></label>
      <label>uOttawa email <input type="email" placeholder="you@uottawa.ca" required></label>
      <label>Password <input type="password" minlength="8" required></label>
      <button class="btn" type="submit">Create account</button>
      <p class="switch">Already have an account? <a href="#signin">Sign in</a></p>
    </form>
  </dialog>

  <dialog class="popup" id="book">
    <button class="close" type="button" aria-label="Close">×</button>
    <form method="dialog">
      <h2>Book a session</h2>
      <p class="meta">with <strong id="book-tutor">a tutor</strong></p>
      <label>Date <input type="date" required></label>
      <label>Time <input type="time" required></label>
      <label>Length
        <select><option>1 hour</option><option>1.5 hours</option><option>2 hours</option></select>
      </label>
      <button class="btn" type="submit">Confirm booking</button>
    </form>
  </dialog>
`);

document.addEventListener("click", function (e) {
  const link = e.target.closest('a[href="#signin"], a[href="#signup"], a[href="#book"]');
  if (!link) return;
  e.preventDefault();
  document.querySelectorAll("dialog.popup[open]").forEach(d => d.close());
  if (link.dataset.tutor) document.getElementById("book-tutor").textContent = link.dataset.tutor;
  document.getElementById(link.getAttribute("href").slice(1)).showModal();
});

/* Close when clicking the dark area outside the popup */
document.querySelectorAll("dialog.popup").forEach(function (d) {
  d.addEventListener("click", e => { if (e.target === d) d.close(); });
  d.querySelector(".close").addEventListener("click", () => d.close());
  d.querySelector("form").addEventListener("submit", () => alert("Demo only — nothing was sent."));
});
