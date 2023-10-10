import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Features from './Layout/features';
import FeaturesBlocks from './Layout/features-blocks';
import Hero from './Layout/hero';
import Newsletter from './Layout/newsletter';
import Testimonials from './Layout/testimonials';

export default function Main({ mainToParent }: any) {
  const heroToParent = (childData: any) => {
    mainToParent(childData);
  };

  return <>Main</>;
}
