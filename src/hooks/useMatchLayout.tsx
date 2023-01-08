import React from 'react';

const useMatchLayout = (maxMediaPx: number): boolean => {
  const [match, setMacth] = React.useState(false);

  React.useEffect(() => {
    const verificarMacth = (): void => {
      const { matches } = window.matchMedia(`(max-width: ${maxMediaPx}px)`);
      setMacth(matches);
    };
    verificarMacth();
    window.addEventListener('resize', verificarMacth);

    return () => {
      window.removeEventListener('resize', verificarMacth);
    };
  }, [maxMediaPx]);

  return match;
};

export default useMatchLayout;