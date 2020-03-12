import { useEffect, useRef } from 'react';

function useDidMount(callback) {
  useEffect(() => {
    callback();
  }, []);
}

function useDidUpdate(callback, deps, clearCallback) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback();
      if (clearCallback) {
        return clearCallback;
      }
    } else {
      didMount.current = true;
    }
  }, deps);
}

function useDebounce(callback, deps, timeout = 500, clearCallback) {
  const hasMount = useRef(false);
  useEffect(() => {
    if (hasMount.current) {
      const handler = setTimeout(() => {
        callback();
      }, timeout);
      return () => {
        if (clearCallback) {
          clearCallback();
        }
        clearTimeout(handler);
      };
    } else {
      hasMount.current = true;
    }
  }, deps);
}

export default {
  useDidMount,
  useDebounce,
  useDidUpdate
};
