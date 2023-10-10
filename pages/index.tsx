import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppConfig } from '@/utils/AppConfig';
import { Meta } from '../components/Meta';
import Auth from './App/Auth';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Router from 'next/router';
import Main from './App/Main';

export default function Home() {
  const [data, setData] = useState('');
  const [data1, setData1] = useState<Boolean | String>();
  const [signin, setSignIn] = useState(false);

  useEffect(() => {
    if (data == 'signin' && !signin) {
      setSignIn(true);
    }
    if (data == 'signup' && !signin) {
      setSignIn(true);
      setData1('signup');
    }
    if (data1 == false) {
      setSignIn(false);
      setData1(undefined);
      setData('');
    }
  }, [data, data1, signin]);

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  const authData = (authdata: any) => {
    setData(authdata);
  };

  const childToParent1 = (childdata1: any) => {
    setData1(childdata1);
  };

  useEffect(() => {
    const data = new URLSearchParams(window.location.hash.substring(1));
    const error = data.get('error_code');
    const description = data.get('error_description');
    if (data.get('error') == 'unauthorized_client') {
      Router.push(
        `/unauthorized?error_code=` +
          error +
          `&error_description=` +
          description
      );
    }
  });

  const mainToParent = (childData: any) => {
    setData(childData);
  };

  return (
    <>
      {!signin && <Header authData={authData} />}
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {!signin ? (
        <>
          <Main mainToParent={mainToParent} />
          <Footer />
        </>
      ) : (
        <Auth childToParent1={childToParent1} parentToChild={{ data: data1 }} />
      )}
    </>
  );
}
