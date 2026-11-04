(function () {
  "use strict";
  var BREAKPOINT = 768;
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var burger = document.getElementById("mob-toggle");
  var closeBtn = document.getElementById("mob-close");

  function setMenu(open) {
    if (!drawer || !overlay || !burger) { return; }
    drawer.classList.toggle("open", open);
    overlay.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) { closeBtn.focus(); }
    if (!open && document.activeElement && drawer.contains(document.activeElement)) { burger.focus(); }
  }
  if (burger) { burger.addEventListener("click", function () { setMenu(true); }); }
  if (closeBtn) { closeBtn.addEventListener("click", function () { setMenu(false); }); }
  if (overlay) { overlay.addEventListener("click", function () { setMenu(false); }); }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.classList.contains("open")) { setMenu(false); }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > BREAKPOINT && drawer && drawer.classList.contains("open")) { setMenu(false); }
  });
  if (drawer) {
    var links = drawer.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () { setMenu(false); });
    }
  }

  /* FAQ accordion: max-height toggle */
  var qs = document.querySelectorAll(".faq-q");
  function closeItem(btn) {
    btn.setAttribute("aria-expanded", "false");
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (panel) { panel.style.maxHeight = "0px"; }
  }
  function openItem(btn) {
    btn.setAttribute("aria-expanded", "true");
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (panel) { panel.style.maxHeight = panel.scrollHeight + "px"; }
  }
  for (var j = 0; j < qs.length; j++) {
    qs[j].addEventListener("click", function () {
      var isOpen = this.getAttribute("aria-expanded") === "true";
      if (isOpen) { closeItem(this); } else { openItem(this); }
    });
  }
  window.addEventListener("resize", function () {
    for (var k = 0; k < qs.length; k++) {
      if (qs[k].getAttribute("aria-expanded") === "true") { openItem(qs[k]); }
    }
  });
})();
