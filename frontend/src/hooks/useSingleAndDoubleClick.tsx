import {useState, useEffect} from 'react';

function useSingleAndDoubleClick(
  callbackSimpleClick: (index: number) => void,
  callbackDoubleClick: (row: string) => void,
  delay: number = 250
) {
  const [click, setClick] = useState<number>(0);
  const [row, setRow] = useState<number>(-1);
  const [uri, setUri] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      // simple click
      if (click === 1 && uri) callbackSimpleClick(row);
      setClick(0);
    }, delay);

    // the duration between this click and the previous one
    // is less than the value of delay = double-click
    if (click === 2 && uri) callbackDoubleClick(uri);

    return () => clearTimeout(timer);

  }, [click, row, uri, callbackSimpleClick, callbackDoubleClick, delay]);

  return (row: string, index: number) => {
    setRow(index);
    setUri(row);
    return setClick(prev => prev + 1);
  };
}

export default useSingleAndDoubleClick;
