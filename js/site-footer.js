(function () {
  'use strict';
  var mount = document.querySelector('[data-site-footer]');
  if (!mount) return;

  fetch('partials/site-footer.html')
    .then(function (res) {
      if (!res.ok) throw new Error('Footer load failed');
      return res.text();
    })
    .then(function (html) {
      mount.outerHTML = html;
    })
    .catch(function () {
      mount.outerHTML =
        '<footer class="site-footer texture-footer"><div class="site-wrap" style="padding:2rem;text-align:center;color:#c8cdd3;">' +
        '<p>Mid Columbia River Guide Service &mdash; <a href="tel:5094904666">(509) 490-4666</a></p></div></footer>';
    });
})();
