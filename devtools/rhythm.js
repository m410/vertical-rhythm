'use strict';
// see https://design.firefox.com/photon/index.html

function handleShown() {
  console.warn("panel is being shown");
}

function handleHidden() {
  console.warn("panel is being hidden");
}


browser.devtools.panels.create(
  "Rhythm",
  "/assets/icons/music-note-list(white).png",
  "/devtools/panel/panel.html"
).then((newPanel) => {
  newPanel.onShown.addListener(handleShown);
  newPanel.onHidden.addListener(handleHidden);
}); 
