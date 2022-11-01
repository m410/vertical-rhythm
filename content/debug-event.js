'use strict';


window.verticalRhythm = (function() {
  let settings = 'testing';
  console.log('init verticalRhythm');

  return {
    updateSettings: function(newSettings) {
        console.log('new settings', newSettings);
    }
  }
})();