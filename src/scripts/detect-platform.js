// Runs inline in <head> before the body is parsed, so styles keyed on
// html[data-platform] apply from the first paint without a layout shift.
(function () {
  var ua = navigator.userAgent;
  // iPadOS reports itself as a Mac but has a touch screen.
  var ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  var platform = /Android/i.test(ua)
    ? 'android'
    : ios
      ? 'ios'
      : /Windows/i.test(ua)
        ? 'windows'
        : /Macintosh|Mac OS X/i.test(ua)
          ? 'macos'
          : /Linux|X11/i.test(ua)
            ? 'linux'
            : '';
  if (platform) document.documentElement.dataset.platform = platform;
})();
