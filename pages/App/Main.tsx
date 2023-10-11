import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Loading from './Loading';
import { Dialog } from '@headlessui/react';
import Mail from './Mail';
import axios from 'axios';

let timerInterval: NodeJS.Timeout;

type MailData = {
  title: string;
  content: string;
};

export const revalidate = 600;

export default function Main() {
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [counter, setCounter] = useState(15);
  const [enableModal, setEnableModal] = useState(false);
  const [disableClick, setDisableClick] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const sessionRef = useRef<string | null>();
  const emailRef = useRef<string | null>();
  const mailList = useRef<[{}]>();

  const currentDate = new Date();

  const token = process.env.NEXT_PUBLIC_TOKEN!;
  const endpoint =
    'https://cors-anywhere.herokuapp.com/https://dropmail.me/api/graphql/'.concat(
      token
    );

  const startCountdown = (durationInSeconds: number) => {
    let timeLeft = durationInSeconds;

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        handleRefresh();
        clearInterval(timerInterval);
        startCountdown(15);
      } else {
        timeLeft--;
        setCounter(timeLeft);
      }
    }, 1000);
  };

  const handleRefresh = useCallback(async () => {
    const session = {
      id: localStorage.getItem('session'),
      expire: localStorage.getItem('expire'),
      address: localStorage.getItem('address'),
    };
    if (
      session.id != null &&
      session.address != null &&
      session.expire != null
    ) {
      console.log(session);
      const expire = new Date(session.expire);
      if (expire < currentDate) {
        alert('Sua sessao expirou! Um novo email sera gerado!');
        localStorage.clear();
      } else {
        try {
          const query = {
            query: `{
            session(id: "${session.id}") {
                mails{
                    rawSize,
                    fromAddr,
                    toAddr,
                    downloadUrl,
                    text,
                    headerSubject
                }
            }
        }`,
          };

          await axios.post(endpoint, query).then((response) => {
            console.log(response.data);
            if (response.status != 200) {
              alert(
                'Um erro ocorreu ao buscar seus emails. Se o problema persistir por favor entre em contato!'
              );
              return;
            }
            if (response.data && response.data.data.session.mails.length > 0) {
              for (let i = 0; i < response.data.data.session.mails.legth; i++) {
                mailList.current?.push(response.data.data.session.mails[i]);
              }
              return;
            }
          });
        } catch (error) {
          console.log(error);
          alert('Um erro ocorreu ao localizar seus emails');
          return;
        }
      }
    }
  }, [currentDate, endpoint]);

  const generateEmail = useCallback(async () => {
    const session = {
      id: localStorage.getItem('session'),
      expire: localStorage.getItem('expire'),
      address: localStorage.getItem('address'),
    };
    if (
      session.id != null &&
      session.address != null &&
      session.expire != null
    ) {
      const expire = new Date(session.expire);
      if (expire < currentDate) {
        alert('Sua sessao expirou! Um novo email sera gerado!');
        localStorage.clear();
      } else {
        setTimeout(() => {
          sessionRef.current = session.id;
          emailRef.current = session.address;
          setLoaded(true);
          handleRefresh();
        }, 100);
        return;
      }
    }
    try {
      await axios
        .post(endpoint, {
          query:
            'mutation {introduceSession {id, expiresAt, addresses {address}}}',
        })
        .then((response) => {
          if (response.status != 200) {
            alert('Ocorreu um erro! Tente recarregar a pagina!');
            return;
          } else {
            if (response.data.data) {
              console.log(response.data);
              localStorage.setItem(
                'session',
                response.data.data.introduceSession.id
              );
              localStorage.setItem(
                'address',
                response.data.data.introduceSession.addresses[0].address
              );
              localStorage.setItem(
                'expire',
                response.data.data.introduceSession.expiresAt
              );
              emailRef.current =
                response.data.data.introduceSession.addresses[0].address;
              setLoaded(true);
            }
          }
        });
    } catch (error) {
      console.log(error);
      alert(
        'Ocorreu um erro ao gerar o email. Se persistir por favor entre em contato!'
      );
      return;
    }
  }, [currentDate, endpoint, handleRefresh]);

  useEffect(() => {
    generateEmail();
  }, []);

  useEffect(() => {
    startCountdown(15);
  }, []);

  useEffect(() => {
    if (document != null || document != undefined) {
      const handleResize = () => {
        if (window.innerWidth < 770) {
          setEnableModal(true);
          setDisableClick(false);
        } else {
          setEnableModal(false);
          setDisableClick(true);
        }
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        setEnableModal(false);
      };
    }
  }, []);

  const hideMail = (data: boolean) => {
    setOpenEmail(data);
  };

  return (
    <>
      <section className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 h-screen m-0">
        <div className="max-w-2xl xl:max-w-7xl mx-auto px-4 sm:px-6">
          <div className="">
            <div className="grid pt-5 mb-5">
              <span className="text-center justify-center">
                Seu email temporario
              </span>
              <div
                onMouseOver={() => setShowCopy(true)}
                onMouseLeave={() => setShowCopy(false)}
                onClick={() => {
                  if (emailRef.current) {
                    navigator.clipboard.writeText(emailRef.current);
                    setCopied(true);
                  } else {
                    alert(
                      'Erro ao copiar. Se o problema persistir por favor entre em contato'
                    );
                    return;
                  }
                }}
                className="cursor-pointer w-fit mx-auto text-center grid relative"
              >
                <h1
                  className={`${
                    copied ? 'text-indigo-600' : 'text-blue-500'
                  } md:text-gray-100 h1 flex`}
                >
                  {emailRef.current ? emailRef.current : <Loading />}
                  <svg
                    fill="none"
                    viewBox="0 0 15 15"
                    height="1em"
                    width="1em"
                    className="w-6 h-6 md:hidden"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M1 9.5A1.5 1.5 0 002.5 11H4v-1H2.5a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h7a.5.5 0 01.5.5V4H5.5A1.5 1.5 0 004 5.5v7A1.5 1.5 0 005.5 14h7a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0012.5 4H11V2.5A1.5 1.5 0 009.5 1h-7A1.5 1.5 0 001 2.5v7zm4-4a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </h1>
              </div>
            </div>
            <div className="w-fit mx-auto text-center grid absolute -translate-x-[50%] left-[50%] -mt-3 z-10">
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
                <div className="flex">
                  <span className="contents md:hidden">
                    Atualizacao em {counter}
                  </span>
                  <span className="contents md:hidden">
                    <Loading />
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    onClick={() => {
                      handleRefresh();
                      startCountdown(15);
                    }}
                    className="w-8 h-8 md:hidden"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="md:flex col-span-2 w-full bg-gray-500 rounded-tr-xl hidden justify-end  ">
                <div className="align-middle flex p-2">
                  Atualizacao automatica em {counter}
                  <Loading />
                  <div
                    className="flex"
                    onClick={() => {
                      handleRefresh();
                      startCountdown(15);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 mx-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Atualizar
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 grid bg-gray-600 h-[400px] md:h-[700px]">
                <div
                  onClick={() => {
                    !disableClick && setOpenEmail(true);
                  }}
                  className="grid h-fit border-y border-solid"
                >
                  <span className="text-blue-300 uppercase font-bold ">
                    From
                  </span>
                  <span>Title</span>
                  <span className="overflow-hidden truncate w-5/6">
                    Contentasd adsudahu dhaiasdasdas dasdasd sudhapuhd apiud
                    hapsiud hauhd as
                  </span>
                </div>
              </div>
              {openEmail && enableModal && (
                <Mail showMail={openEmail} hideMail={hideMail} />
              )}
              <div className="md:col-span-2 hidden md:grid bg-gray-100 h-[500px] md:h-[700px] border-l border-solid">
                <div className="p-10 overflow-auto">
                  <span className="text-black text-2xl">Title</span>
                  <p className="text-black text-xl w-[90%] text-ellipsis overflow-x-hidden hover:overflow-x-visible">
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  </p>
                </div>
              </div>
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
