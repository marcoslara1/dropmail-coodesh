import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function Main({ mainToParent }: any) {
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <>
      <section className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 h-full md:h-screen m-0">
        <div className="max-w-2xl xl:max-w-5xl mx-auto px-4 sm:px-6">
          <div className="">
            <div className="grid pt-5 mb-5">
              <span className="text-center justify-center">
                Seu email temporario
              </span>
              <div
                onMouseOver={() => setShowCopy(true)}
                onMouseLeave={() => setShowCopy(false)}
                onClick={() => {
                  navigator.clipboard.writeText('xxx@xxx.cuu');
                  setCopied(true);
                }}
                className="cursor-pointer w-fit mx-auto text-center grid relative"
              >
                <h1 className="h1">xxx@xxx.cuu</h1>
              </div>
            </div>
            <div className="w-fit mx-auto text-center grid absolute -translate-x-[50%] left-[50%] -mt-3">
              {showCopy && !copied && (
                <Image width={96} height={64} src="/copy.png" alt="copy" />
              )}
              {showCopy && copied && (
                <Image width={96} height={64} src="/copied.png" alt="copy" />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
              <div className="md:col-span-1 flex justify-between w-full bg-gray-500 text-gray-100 p-2 rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:border-r md:border-solid">
                <span className=" text-xl">Inbox</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 md:hidden"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="md:flex col-span-2 w-full bg-gray-500 rounded-tr-xl hidden justify-end align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 m-0 p-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                    clipRule="evenodd"
                  />
                </svg>
                Atualizar
              </div>
              <div className="md:col-span-1 grid bg-gray-600 h-[500px]">
                <span>From</span>
                <span>Title</span>
                <span>Content</span>
              </div>
              <div className="md:col-span-2"></div>
            </div>
            <div className="max-w-sm mx-auto">
              <div className="flex items-center my-6">
                <div
                  className="border-t border-gray-300 grow mr-3"
                  aria-hidden="true"
                ></div>
                <div className="text-gray-600 italic">GITHUB</div>
                <div
                  className="border-t border-gray-300 grow ml-3"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
