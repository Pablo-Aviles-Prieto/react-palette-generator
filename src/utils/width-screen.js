import { useState, useEffect } from 'react';

let firstTime = true;

const screenWidth = (maxWidth) => {
  const { innerWidth: currentWidthScreen } = window;
  const { width: totalScreenWidth } = window.screen;
  const currentWidth =
    currentWidthScreen > 0 ? currentWidthScreen : totalScreenWidth;
  return currentWidth < maxWidth;
};

export const useScreenWidth = (maxWidth = window.innerWidth) => {
  const [stateScreen, setStateScreen] = useState(false);

  useEffect(() => {
    const resize = () => {
      setStateScreen(screenWidth(maxWidth));
      firstTime = false;
    };

    firstTime && resize();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [maxWidth]);

  return stateScreen;
};
