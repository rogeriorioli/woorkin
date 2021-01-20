import React, { useEffect } from 'react';
import { useState } from 'react';

interface counter {
  number: string;
}

const Count = ({ number }: counter) => {
  const [count, setCounter] = useState('0');

  const duration: string = '1';

  useEffect(() => {
    let start = 0;
    const end = parseInt(number.substring(0, 3));
    if (start === end) return;

    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;

    let timer = setInterval(() => {
      start += 1;
      setCounter(String(start) + number.substring(3));
      if (start === end) clearInterval(timer);
    }, incrementTime);
  }, [number, duration]);
  return <strong>{count}</strong>;
};

export default Count;
