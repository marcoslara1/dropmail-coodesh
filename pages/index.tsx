import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppConfig } from '@/utils/AppConfig';
import { Meta } from '../components/Meta';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Router from 'next/router';
import Main from './App/Main';

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Main />
    </>
  );
}
