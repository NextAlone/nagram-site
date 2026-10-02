// Placed inline right after the markup it affects: flags every element whose
// data-platforms lists the detected platform before that markup is painted.
(function () {
  var platform = document.documentElement.dataset.platform;
  if (!platform) return;
  var found = document.querySelectorAll('[data-platforms~="' + platform + '"]:not([data-detected])');
  for (var i = 0; i < found.length; i++) found[i].setAttribute('data-detected', '');
})();
