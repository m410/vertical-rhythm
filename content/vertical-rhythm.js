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
    boxOpacity: .15,
    lineHeight: '27px'
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
    --vr-line-height: ${conf.lineHeight};
  }
  .rhythm-vertical {
    position: absolute;
    left: 0;
    right: 0;
    top: var(--vr-top);
    height: 100%;
    max-width: var(--vr-break-xsmall);
    z-index: 999999;

    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: stretch;
    
    opacity: var(--vr-box-opacity);
    padding: 0 calc(var(--vr-gutter) * .5);
    margin: 0 auto;
  }
  /* assets/line-8x24.svg */
  .rhythm-vertical.line-24x8 {
    opacity: 1;
    background-repeat: repeat;    
    background-size: 8px 24px;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDggMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHBhdGggaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI2Y5ZTIzMSIgZmlsbC1vcGFjaXR5PSIwLjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBkPSJNIDAgMjQgTCA4IDI0IEwgOCAxNiBMIDAgMTYgWiIvPgogICAgPHBhdGggaWQ9IlBhdGgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNIDAgMTYgTCA4IDE2Ii8+Cjwvc3ZnPgo=");
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
    const styleElem = document.getElementById(ID);
    const maskElem = document.getElementById(MASK_ID);

    if(styleElem) {
      styleElem.parentNode.removeChild(styleElem);
    }

    if(maskElem) {
      maskElem.parentNode.removeChild(maskElem);
    }
    
    if(settings.showHide) {
      const body = document.getElementsByTagName('body');
      body[0].setAttribute('style', 'position: relative')

      const style = document.createElement('style');
      style.id = ID;
      const template = makeTemplate(settings);
      console.log('template', template);
      style.textContent = template;
      document.body.appendChild(style);
  
      const mask = document.createElement('div');
      mask.id = MASK_ID;
      mask.classList.add('rhythm-vertical');
      mask.classList.add('line-24x8');
      
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