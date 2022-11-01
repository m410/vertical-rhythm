
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
    small: 578,
    medium: 768,
    large: 992,
    xLarge: 1200,
    xxLarge: 0
  },
  grid: {
    count: 12,
    gutter: '1rem',
    margin: '1rem'
  },
  marginTop: '0'
};


function pushSettings() {
  const newSettingsJson = JSON.stringify(rhythmSettings);
  const newSettingsCmd = `window.verticalRhythm.update(${newSettingsJson});` ;  

  browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    script: newSettingsCmd
  }).then(handleResult);
}


const showHide = document.getElementById('show-hide');
showHide.addEventListener('change', ($event) => {
  rhythmSettings.showHide = !rhythmSettings.showHide;
  pushSettings();
});  


// const breakXSmall = document.getElementById('break-1');
// breakXSmall.addEventListener('change', ($event) => {
//   console.log('breakXSmall', $event);
// });  

// const breakSmall = document.getElementById('break-2');
// breakSmall.addEventListener('change', ($event) => {
//   console.log('breakSmall', $event);
// });  

// const breakMedium = document.getElementById('break-3');
// breakMedium.addEventListener('change', ($event) => {
//   console.log('breakMedium', $event);
// });  

// const breakLarge = document.getElementById('break-4');
// breakLarge.addEventListener('change', ($event) => {
//   console.log('breakLarge', $event);
// });  

// const breakXLarge = document.getElementById('break-5');
// breakXLarge.addEventListener('change', ($event) => {
//   console.log('breakXLarge', $event);
// });  

// const breakXXLarge = document.getElementById('break-6');
// breakXXLarge.addEventListener('change', ($event) => {
//   console.log('breakXXLarge', $event);
// });  

// const gridColCount = document.getElementById('grid-col-count');
// gridColCount.addEventListener('change', ($event) => {
//   console.log('gridColCount', $event);
// });  

// const gridColGutter = document.getElementById('grid-col-gutter');
// gridColGutter.addEventListener('change', ($event) => {
//   console.log('gridColGutter', $event);
// });  

// const gridColMargin = document.getElementById('grid-col-margin');
// gridColMargin.addEventListener('change', ($event) => {
//   console.log('gridColMargin', $event);
// });  


// const marginTop = document.getElementById('margin-top');
// marginTop.addEventListener('change', ($event) => {
//   console.log('marginTop', $event);
// });  

