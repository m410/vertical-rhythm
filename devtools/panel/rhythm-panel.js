
function handleError(error) {
  if (error.isError) {
    console.log(`Devtools error: ${error.code}`);
  } else {
    console.log(`JavaScript error: ${error.value}`);
  }
}

function handleResult(result) { 
  if (result && result[1]) {
    handleError(result[1]);
  }
}


const rhythmSettings = {
  showHide: false,
  breakpoints: {
    xSmall: 0,
    small: 540,
    medium: 720,
    large: 960,
    xLarge: 1140,
    xxLarge: 1340
  },
  grid: {
    count: 12,
    gutter: '1rem',
  },
  marginTop: '0',
  boxColor: 'tomato',
  boxOpacity: .35
};


function pushSettings() {
  const newSettingsJson = JSON.stringify(rhythmSettings);
  const newSettingsCmd = `window.verticalRhythm.update(${newSettingsJson});` ;  
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    script: newSettingsCmd
  }).then(handleResult);
}

function out(msg, data) {
  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    script: `console.log('${msg}', '${JSON.stringify(data)}');`
  }).then(handleResult);
}


const showHide = document.getElementById('show-hide');
showHide.value = rhythmSettings.showHide;
showHide.addEventListener('change', ($event) => {
  rhythmSettings.showHide = !rhythmSettings.showHide;
  pushSettings();
});  


const breakXSmall = document.getElementById('break-1');
breakXSmall.setAttribute('value', rhythmSettings.breakpoints.xSmall);
breakXSmall.addEventListener('change', ($event) => {
  rhythmSettings.breakpoints.xSmall = $event.value;
  pushSettings();
});  

const breakSmall = document.getElementById('break-2');
breakSmall.setAttribute('value', rhythmSettings.breakpoints.small);
breakSmall.addEventListener('change', ($event) => {
  rhythmSettings.breakpoints.small = breakSmall.value;
  pushSettings();
});  

const breakMedium = document.getElementById('break-3');
breakMedium.value = rhythmSettings.breakpoints.medium;
breakMedium.addEventListener('change', ($event) => {
  rhythmSettings.breakpoints.medium = breakMedium.value;
  pushSettings();
});  

const breakLarge = document.getElementById('break-4');
breakLarge.value = rhythmSettings.breakpoints.large;
breakLarge.addEventListener('change', ($event) => {
  rhythmSettings.breakpoints.large = breakLarge.value;
  pushSettings();
});  

const breakXLarge = document.getElementById('break-5');
breakXLarge.value = rhythmSettings.breakpoints.xLarge;
breakXLarge.addEventListener('change', ($event) => {
  rhythmSettings.breakpoints.xLarge = breakXLarge.value;
  pushSettings();
});  

const breakXXLarge = document.getElementById('break-6');
breakXXLarge.value = rhythmSettings.breakpoints.xxLarge;
breakXXLarge.addEventListener('change', ($event) => {
  rhythmSettings.breakpoints.xxLarge = breakXXLarge.value;
  pushSettings();
});  

const gridColCount = document.getElementById('grid-col-count');
gridColCount.value = rhythmSettings.grid.count;
gridColCount.addEventListener('change', ($event) => {
  rhythmSettings.grid.count = gridColCount.value;
  pushSettings();
});  

const gridColGutter = document.getElementById('grid-col-gutter');
gridColGutter.value = rhythmSettings.grid.gutter;
gridColGutter.addEventListener('change', ($event) => {
  rhythmSettings.grid.gutter = gridColGutter.value;
  pushSettings();
});  

const boxColor = document.getElementById('box-color');
boxColor.value = rhythmSettings.boxColor;
boxColor.addEventListener('change', ($event) => {
  rhythmSettings.boxColor = boxColor.value;
  pushSettings();
});  

const marginTop = document.getElementById('margin-top');
marginTop.value = rhythmSettings.marginTop;
marginTop.addEventListener('change', ($event) => {
  rhythmSettings.marginTop = marginTop.value;
  pushSettings();
});  
