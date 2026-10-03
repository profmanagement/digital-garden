(function () {
  var blocks = document.querySelectorAll('pre.mermaid');
  if (!blocks.length) return;
  blocks.forEach(function (pre) {
    var div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = pre.textContent;
    (pre.closest('.sourceCode') || pre).replaceWith(div);
  });
  import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs').then(function (m) {
    m.default.initialize({ startOnLoad: false, theme: 'neutral' });
    m.default.run({ querySelector: 'div.mermaid' });
  });
})();
