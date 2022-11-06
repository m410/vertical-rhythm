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
      gutter: '1rem',
    },
    marginTop: '0',
    boxColor: 'tomato',
    boxOpacity: .35
  };

function makeTemplate(conf) {
  return `
  :root {
    --vr-gutter: ${conf.grid.gutter};
    --vr-columns: ${conf.grid.count};
    --vr-break-xsmall: ${conf.breakpoints.xSmall}px;
    --vr-break-small: ${conf.breakpoints.small}px;
    --vr-break-medium: ${conf.breakpoints.medium}px;
    --vr-break-large: ${conf.breakpoints.large}px;
    --vr-break-xlarge: ${conf.breakpoints.xLarge}px;
    --vr-break-xxlarge: ${conf.breakpoints.xxLarge}px;
    --vr-top: ${conf.marginTop};
    --vr-box-color: ${conf.boxColor};
    --vr-box-opacity: ${conf.boxOpacity};
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
    opacity: var(--vr-box-opacity);
    padding: 0 calc(var(--vr-gutter) * .5);
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAAXnVPIAAAAHGlET1QAAAACAAAAAAAAAAgAAAAoAAAACAAAAAgAAABEJwSU2wAAABBJREFUOBFiYBgFoyHAwAAAAAD//7LY/4IAAAAgSURBVGNgGAXDJAQSgP44gAXvB4rB8D4gG4b3AtlwDABgCguM9D4iLAAAAABJRU5ErkJggg==");
    background-repeat: repeat;
  }
  .rhythm-vertical>.beat {
    flex: 1 0 auto;
    height: 100%;
    opacity: var(--vr-box-opacity);
    padding-right: calc(var(--vr-gutter) * .5);
    padding-left: calc(var(--vr-gutter) * .5);
  }
  .rhythm-vertical>.beat>.box {
    background-color: var(--vr-box-color);
    width: 100%;
    height: 100%;
  }
  @media only screen and (max-width: ${conf.breakpoints.small}px) {
    .rhythm-vertical {
      max-width: calc(var(--vr-break-small) - 40px);
    }
  }

  @media only screen and (min-width: ${conf.breakpoints.medium}px) {
    .rhythm-vertical {
      max-width: var(--vr-break-medium);
    }
  }

  @media only screen and (min-width: ${conf.breakpoints.large}px) {
    .rhythm-vertical {
      max-width: var(--vr-break-large);
    }
  }

  @media only screen and (min-width: ${conf.breakpoints.xLarge}px) {
    .rhythm-vertical {
      max-width: var(--vr-break-xlarge);
    }
  } 
  @media only screen and (min-width: ${conf.breakpoints.xxLarge}px) {
    .rhythm-vertical {
      max-width: calc(var(--vr-break-xxlarge) - 40px);
    }
  } 
`;
}

  function reset() {

    if(settings.showHide) {
      const style = document.createElement('style');
      style.id = ID;
      const template = makeTemplate(settings);
      console.log('template', template);
      style.textContent = template;
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
      console.log('setting', newSettings);
        settings = newSettings;
        reset();
    }
  }
})();