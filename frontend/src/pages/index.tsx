import React, { ChangeEvent, FormEvent, useState } from 'react';
import Counter from '../components/Counter';
import Explain from '../components/Explain';
import Hero from '../components/Hero';

import Layouts from '../Layouts';

export default function Home() {
  return (
    <Layouts>
      <Hero />
      <Counter />
      <Explain />
    </Layouts>
  );
}
