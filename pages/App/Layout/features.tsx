import { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Image from 'next/image';

export default function Features() {
  const [tab, setTab] = useState<number>(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section id="about" className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-[#0f1818] pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Explore a solução</h1>
            <p className="text-xl text-gray-600">
              Rápido pratico e sem complicação.
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Atendemos a todos</h3>
                <p className="text-xl text-gray-600">
                  Conectando seus tecnicos as maiores plataformas do mundo de
                  estagios e empregos.
                </p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 1
                      ? 'bg-gray-900 shadow-md border-[#3689b9] hover:shadow-lg'
                      : 'bg-gray-800 border-gray-100'
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Simples
                    </div>
                    <div className="text-gray-600">
                      Nenhum cadastro extra e necessário basta implementar a API
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-gray-900"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </a>
                <a
                  className={`flex items-center justify-between text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 2
                      ? 'bg-gray-900 shadow-md border-[#3689b9] hover:shadow-lg'
                      : 'bg-gray-800 border-gray-100'
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Resposta imediata
                    </div>
                    <div className="text-gray-600">
                      Respostas rapidas e imediatas
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-gray-900"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                    </svg>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 3
                      ? 'bg-gray-900 shadow-md border-[#3689b9] hover:shadow-lg'
                      : 'bg-gray-800 border-gray-100'
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Qualquer linguagem
                    </div>
                    <div className="text-gray-600">
                      Implemente em seus sistemas ou sites utilizando a
                      linguagem que for
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <span className="text-gray-900 font-bold text-sm">
                      {'</>'}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="transition-all">
                <div
                  className="relative flex flex-col text-center lg:text-right"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  {/* Item 1 */}
                  <Transition
                    show={tab === 1}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="md:max-w-none mx-auto rounded"
                        src="/post-example.png"
                        width={500}
                        height="462"
                        alt="Features bg"
                        priority
                      />
                      {/* <Image
                                                className="md:max-w-none absolute w-full left-0 transform animate-float"
                                                src={FeaturesElement}
                                                width={500}
                                                height="44"
                                                alt="Element"
                                                style={{ top: '30%' }}
                                            /> */}
                    </div>
                  </Transition>
                  {/* Item 2 */}
                  <Transition
                    show={tab === 2}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="md:max-w-none mx-auto rounded"
                        src="/apires.png"
                        width={500}
                        height="462"
                        alt="Features bg"
                        priority
                      />
                      <Image
                        className="md:max-w-none absolute w-2/3 left-5 transform animate-float"
                        src="/floating.png"
                        width={300}
                        height="44"
                        alt="Element"
                        style={{ top: '30%' }}
                        priority
                      />
                    </div>
                  </Transition>
                  {/* Item 3 */}
                  <Transition
                    show={tab === 3}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      {/* <Image
                                                className="md:max-w-none mx-auto rounded"
                                                src={FeaturesBg}
                                                width={500}
                                                height="462"
                                                alt="Features bg"
                                            /> */}
                      <div className="relative group h-[300px] w-[262px] md:h-[500px] md:w-[462px]">
                        <div className="absolute -z-1 -inset-0.5 bg-gradient-to-r from-[#3689b9] to-gray-100 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="md:max-w-none mx-auto rounded-xl bg-gray-900 h-[300px] w-[262px] md:h-[500px] md:w-[462px] z-100">
                          <Image
                            className="absolute w-[64px] md:w-[100px] transition top-24 right-20 animate-float shadow-lg shadow-yellow-800"
                            src="/js.png"
                            width={100}
                            height={100}
                            alt="Element"
                            priority
                          />
                          <Image
                            className="absolute w-[64px] md:w-[100px] top-10 left-10 transform animate-float blur-md"
                            src="/ruby.png"
                            width={100}
                            height={100}
                            alt="Element"
                            priority
                          />
                          <Image
                            className="absolute w-[64px] md:w-[100px] top-10 left-10 transform animate-float"
                            src="/ruby.png"
                            width={100}
                            height={100}
                            alt="Element"
                            priority
                          />
                          <Image
                            className="absolute w-[64px] md:w-[100px] transition top-8 right-12 animate-float blur-md opacity-60"
                            src="/go.png"
                            width={100}
                            height={100}
                            alt="Element"
                            priority
                          />
                          <Image
                            className="absolute w-[64px] md:w-[100px] transition top-8 right-12 animate-float"
                            src="/go.png"
                            width={100}
                            height={100}
                            alt="Element"
                            priority
                          />
                          <Image
                            className="absolute w-[64px] md:w-[100px] transition top-44 right-10 md:top-80 md:left-28 animate-float blur-md opacity-60"
                            src="/python.png"
                            width={100}
                            height={100}
                            alt="Element"
                            priority
                          />
                          <Image
                            className="absolute w-[64px] md:w-[100px] transition top-44 right-10 md:top-80 md:left-28 animate-float"
                            src="/python.png"
                            width={100}
                            height={100}
                            alt="Element"
                            priority
                          />
                          <Image
                            className="absolute w-[64px] md:w-[100px] transition top-64 right-16 md:top-72 md:right-16 animate-float shadow-lg blur-md"
                            src="/php.png"
                            width={100}
                            height={100}
                            alt="Element"
                            priority
                          />
                          <Image
                            className="absolute w-[64px] md:w-[100px] transition top-64 right-16 md:top-72 md:right-16 animate-float shadow-lg"
                            src="/php.png"
                            width={100}
                            height={100}
                            alt="Element"
                            priority
                          />
                          <Image
                            className="absolute w-[64px] md:w-[100px] transition top-48 left-4 md:top-44 md:left-16 animate-float shadow-lg blur-md"
                            src="/rus.png"
                            width={100}
                            height={100}
                            alt="Element"
                            priority
                          />
                          <Image
                            className="absolute w-[64px] md:w-[100px] transition top-48 left-4 md:top-44 md:left-16 animate-float shadow-lg "
                            src="/rus.png"
                            width={100}
                            height={100}
                            alt="Element"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
