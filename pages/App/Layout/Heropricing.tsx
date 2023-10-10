import { useUser } from '@supabase/auth-helpers-react';
import va from '@vercel/analytics';
import Router from 'next/router';

const Heropricing = () => {
  const user = useUser();
  return (
    <section id="top" className="relative overflow-hidden h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 bg-transparent">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-left pb-12 md:pb-16">
            <h1
              className="text-gray-100 text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Pricing
            </h1>
            <div className="max-w-3xl">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Simples e facil de entender e usar. Pague apenas pelo uso
              </p>
              <div
                className="flex gap-5"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <button
                  onClick={() => {
                    va.track('Pricing hero start');
                    user ? Router.push('/App/Dashboard') : Router.push('/');
                  }}
                  className="btn text-white hover:text-black font-semibold bg-transparent hover:bg-white w-fit mb-4 sm:w-auto sm:mb-0 border-solid border-gray-100 hover:border-black"
                >
                  Começar a usar
                </button>
                <button
                  className="text-white w-fit sm:w-auto sm:ml-4 hover:underline"
                  onClick={() => {
                    Router.push('#pricing');
                  }}
                >
                  Mais
                </button>
              </div>
            </div>
          </div>
          {/* Hero image */}
        </div>
      </div>
    </section>
  );
};

export default Heropricing;
