import React, { useRef, useEffect } from 'react';
import palindromeLib, { devPalindrome } from './palindrome/palindrome.dev.js';

const Palindrome = (props) => {
  const canvasRef = useRef(null);

  const applyConfiguration = (userConfig, currentConfig) => {
    for (const [key, value] of Object.entries(userConfig)) {
      currentConfig[key] = value;
    }
    return currentConfig;
  };
  useEffect(() => {
    const container = document.createElement('div');
    container.setAttribute('id', 'palindrome');
    // eslint-disable-next-line 
    const config = devPalindrome();
    
    config.data = props.dataStructure ?? {};
    // applyConfiguration(props.config, config);
    
    palindromeLib(container, { ...config });
    canvasRef.current.appendChild(container);

    return () => {
      if (canvasRef.current) {
        // eslint-disable-next-line 
        setTimeout(() => {
          canvasRef.current.removeChild(container);
        }, 0);
      }
    };
  }, [props]);

  return (
    <>
      <div ref={canvasRef}></div>
    </>
  );
};

export default Palindrome;
