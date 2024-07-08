import { useEffect, useRef } from "react";

export const useDebounce = (callback, delay) => {
  let timeoutIdRef = useRef(null);
  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
  }, []);
  const debounceCallback = (...args) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef = setTimeout(() => {
      callback(...args);
    }, delay);
  };
  return debounceCallback;
};
