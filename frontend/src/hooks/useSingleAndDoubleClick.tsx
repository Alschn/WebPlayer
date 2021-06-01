import {useState, useEffect} from 'react';

function useSingleAndDoubleClick(
  callbackSimpleClick: (row: number) => void,
  callbackDoubleClick: (row: number) => void,
  delay: number = 250
) {
    const [click, setClick] = useState<number>(0);
    const [row, setRow] = useState<number>(-1);


    useEffect(() => {
        const timer = setTimeout(() => {
            // simple click
            if (click === 1 && row > 0) callbackSimpleClick(row);
            setClick(0);
        }, delay);

        // the duration between this click and the previous one
        // is less than the value of delay = double-click
        if (click === 2 && row > 0) callbackDoubleClick(row);

        return () => clearTimeout(timer);

    }, [click, row, callbackSimpleClick, callbackDoubleClick, delay]);

    return (row: number) => {
      setRow(row);
      return setClick(prev => prev + 1);
    };
}

export default useSingleAndDoubleClick;
