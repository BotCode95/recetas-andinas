import { useEffect, useState } from 'react';

interface Props {
    textValue: string,
    time?: number
}

export const useDebouncedValue = ({textValue = '', time =1000}: Props ) => {
  const [debouncedValue, setDebouncedValue] = useState(textValue);
  useEffect(() => {
    const timeout = setTimeout(() => {
        setDebouncedValue(textValue)
    }, time);

    return () => {
        clearTimeout(timeout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textValue])
  
  return debouncedValue
}