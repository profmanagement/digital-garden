(function () {
  var MIN_VIEWPORT = 1150;

  function buildSidenotes() {
    // Remove any previously created sidenotes
    document.querySelectorAll('.sidenote').forEach(function (el) {
      el.parentNode.removeChild(el);
    });

    var footnoteSection = document.querySelector('section.footnotes');
    if (!footnoteSection) return;

    // Collect footnote content keyed by li id (e.g. "fn1")
    var footnotes = {};
    footnoteSection.querySelectorAll('li[id]').forEach(function (li) {
      var clone = li.cloneNode(true);
      // Remove the ↩ backlink
      var backref = clone.querySelector('a.footnote-back');
      if (backref) backref.parentNode.removeChild(backref);
      footnotes[li.id] = clone.innerHTML.trim();
    });

    // Hide original footnotes section on wide screens
    if (window.innerWidth >= MIN_VIEWPORT) {
      footnoteSection.style.display = 'none';
    } else {
      footnoteSection.style.display = '';
      return;
    }

    var bodyTop = document.body.getBoundingClientRect().top + window.scrollY;
    var lastBottom = 0; // tracks bottom of last sidenote to avoid overlap

    document.querySelectorAll('a.footnote-ref').forEach(function (a) {
      var fnId = a.getAttribute('href').replace(/^#/, '');
      var content = footnotes[fnId];
      if (!content) return;

      // Unwrap the first <p> so number and text flow on the same line
      var tmp = document.createElement('div');
      tmp.innerHTML = content;
      var firstP = tmp.firstElementChild;
      if (firstP && firstP.tagName === 'P') {
        var span = document.createElement('span');
        span.innerHTML = firstP.innerHTML;
        tmp.replaceChild(span, firstP);
      }

      var aside = document.createElement('aside');
      aside.className = 'sidenote';
      aside.innerHTML =
        '<span class="sidenote-number">' + a.textContent + '</span> ' +
        tmp.innerHTML;

      document.body.appendChild(aside);

      // Vertical position: align with the footnote reference
      var refTop = a.getBoundingClientRect().top + window.scrollY - bodyTop;
      var top = Math.max(refTop, lastBottom + 8);
      aside.style.top = top + 'px';
      lastBottom = top + aside.offsetHeight;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSidenotes);
  } else {
    buildSidenotes();
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildSidenotes, 120);
  });
})();
