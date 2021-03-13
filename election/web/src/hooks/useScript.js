import { useEffect } from 'react';

const useScript = (url, body) => {
  useEffect(() => {
    const script = document.createElement('script');
    if (url) {
      script.src = url;
      script.async = true;
    }
    if (body) {
      const scriptText = document.createTextNode(body);
      script.appendChild(scriptText);
    }
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url, body]);
};

export default useScript;
