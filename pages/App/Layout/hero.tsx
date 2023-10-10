import VideoThumb from '@/public/images/hero-image.png';
import Link from 'next/link';
import Router from 'next/router';
import va from '@vercel/analytics';
import { useUser } from '@supabase/auth-helpers-react';

export default function Hero({ heroToParent }: any) {
  const user = useUser();

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none z-1">
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-text"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#2b2c2c" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#343b42" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 bg-transparent">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Desbloqueie o{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3689b9] via-[#343b42] to-[#3689b9] animate-text">
                potencial{' '}
              </span>
              de nossa API
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Conecte e dê a alunos técnicos oportunidades de trabalho e
                estagio sem esforço por meio de nossa API.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <button
                    onClick={() => {
                      va.track('Hero Start now');
                      user
                        ? Router.push('/App/Dashboard')
                        : heroToParent('signup');
                    }}
                    className="btn text-white font-semibold bg-[#3689b9] hover:bg-[#335e78] w-full mb-4 sm:w-auto sm:mb-0"
                  >
                    Começar agora
                  </button>
                </div>
                <div>
                  <button
                    className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                    onClick={() => {
                      va.track('Hero Docs');
                      window.open(
                        'https://app.theneo.io/dbug-me/techinitials-pt',
                        '_blank'
                      );
                    }}
                  >
                    Documentação
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Hero image */}
        </div>
      </div>
    </section>
  );
}
