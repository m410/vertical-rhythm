'use strict';

window.verticalRhythm = (function() {
  const ID = 'vertical-rhythm-style';
  const MASK_ID = 'vertical-rhythm-mask';
  let settings = {
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
      gutter: '1rem'
    },
    marginTop: '1rem'
  };


const styleTemplate = `
    :root {
      --vr-gutter: ${settings.grid.gutter};
      --vr-columns: ${settings.grid.count};
      --vr-break-xsmall: ${settings.breakpoints.xSmall}px;
      --vr-break-small: ${settings.breakpoints.small}px;
      --vr-break-medium: ${settings.breakpoints.medium}px;
      --vr-break-large: ${settings.breakpoints.large}px;
      --vr-break-xlarge: ${settings.breakpoints.xLarge}px;
      --vr-break-xxlarge: ${settings.breakpoints.xxLarge}px;
      --vr-top: ${settings.marginTop};
      --vr-box-color: tomato;
    }
    .rhythm-vertical {
      margin: 0 auto;
      position: absolute;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-evenly;
      align-items: stretch;
      top: var(--vr-top);
      left: 0;
      right: 0;
      height: 100%;
      max-width: var(--vr-break-xsmall);
      z-index: 999999;
      opacity: 0.35;
      padding: 0 calc(var(--vr-gutter) * .5);
      background-image: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzI0cHgnIHN0eWxlPSdmaWxsLXJ1bGU6bm9uemVybztjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7JyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWw6c3BhY2U9J3ByZXNlcnZlJyB3aWR0aD0nMTAwJScgdmlld0JveD0nMCAwIDQgMjQnPjxnIGlkPSdtYWluX2dyb3VwJz4gPHBhdGggZD0nTS0wKzBMNCswTDQrMTdMLTArMTdMLTArMFonIG9wYWNpdHk9JzAuMDgnIGZpbGw9JyMwMjlhNTgnLz48cGF0aCBkPSdNLTArMThMNCsxOEw0KzI0TC0wKzI0TC0wKzE4Wicgb3BhY2l0eT0nMC4wOCcgZmlsbD0nIzAwNDYyOCcvPjxwYXRoIGQ9J00tMCsxN0w0KzE3TDQrMThMLTArMThMLTArMTdaJyBvcGFjaXR5PScwLjQwJyBmaWxsPScjMDAwNDAyJy8+PC9nPjwvc3ZnPg==");
      background-repeat: repeat;
    }
    .rhythm-vertical>.beat {
      flex: 1 0 auto;
      height: 100%;
      opacity: 0.25;
      padding-right: calc(var(--vr-gutter) * .5);
      padding-left: calc(var(--vr-gutter) * .5);
    }
    .rhythm-vertical>.beat>.box {
      background-color: var(--vr-box-color);
      width: 100%;
      height: 100%;
    }
    @media only screen and (max-width: ${settings.breakpoints.small}px) {
      .rhythm-vertical {
        max-width: calc(var(--vr-break-small) - 40px);
      }
    }

    @media only screen and (min-width: ${settings.breakpoints.medium}px) {
      .rhythm-vertical {
        max-width: var(--vr-break-medium);
      }
    }

    @media only screen and (min-width: ${settings.breakpoints.large}px) {
      .rhythm-vertical {
        max-width: var(--vr-break-large);
      }
    }

    @media only screen and (min-width: ${settings.breakpoints.xLarge}px) {
      .rhythm-vertical {
        max-width: var(--vr-break-xlarge);
      }
    } 
    @media only screen and (min-width: ${settings.breakpoints.xxLarge}px) {
      .rhythm-vertical {
        max-width: calc(var(--vr-break-xxlarge) - 40px);
      }
    } 
`;


  function reset() {
    console.log('reset');

    if(settings.showHide) {
      const style = document.createElement('style');
      style.id = ID;
      style.textContent = styleTemplate;
      document.body.appendChild(style);
  
  
      const mask = document.createElement('div');
      mask.id = MASK_ID;
      mask.classList.add('rhythm-vertical');
      
      for (let i = 0; i < settings.grid.count; i++ ) {
        const beat = document.createElement('div');
        beat.classList.add('beat');
        beat.id = 'vf-beat-' + (i + 1);

        const box = document.createElement('div');
        box.classList.add('box');
        beat.appendChild(box);

        mask.appendChild(beat);
      }
      
      document.body.appendChild(mask);    
    } else {
        const styleElem = document.getElementById(ID);
        const maskElem = document.getElementById(MASK_ID);

        if(styleElem) {
          styleElem.parentNode.removeChild(styleElem);
        }


        if(maskElem) {
          maskElem.parentNode.removeChild(maskElem);
        }
    }
  }

  return {
    update: function(newSettings) {
        settings = newSettings;
        reset();
    }
  }
})();