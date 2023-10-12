import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Loading from './Loading';
import Mail from './Mail';
import axios from 'axios';

let timerInterval: NodeJS.Timeout;

type MailData = {
  toAddrOrig: string | null;
  toAddr: string | null;
  text: string | null;
  receivedAt: string | null;
  rawSize: number | null;
  raw: string | null;
  id: string | null;
  html: string | null;
  headerSubject: string | null;
  headerFrom: string | null;
  fromAddr: string | null;
  downloadUrl: string | null;
  decodeStatus: string | null;
};

type Notification = {
  headerSubject: string | null;
  text: string | null;
  url: string;
};

export default function Main() {
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [counter, setCounter] = useState(15);
  const [enableModal, setEnableModal] = useState(false);
  const [disableClick, setDisableClick] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [mailSelected, setMailSelected] = useState(0);
  const [mobile, setMobile] = useState(false);

  const sessionRef = useRef<string | null>();
  const emailRef = useRef<string | null>();
  const mailList = useRef<[MailData]>();

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

  const handleNotificatinons = async (data: Notification) => {
    if (
      navigator.userAgent.match(/Macintosh/i) ||
      navigator.userAgent.match(/Windows/i)
    ) {
      if (!Notification) {
        console.log('Notificações não disponíveis.');
        return;
      }
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
        return;
      } else {
        try {
          await axios.post('/api/notifications', data);
          return;
        } catch (error) {
          console.log(error);
          return;
        }
      }
    } else {
      setMobile(true);
    }
  };

  const enableNotificatinons = () => {
    if (
      navigator.userAgent.match(/Macintosh/i) ||
      navigator.userAgent.match(/Windows/i)
    ) {
      if (!Notification) {
        alert('Notificações não disponíveis.');
        return;
      }
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
        return;
      }
    } else {
      setMobile(true);
    }
  };

  const handleRefresh = useCallback(async () => {
    const session = {
      id: localStorage.getItem('session'),
      expire: localStorage.getItem('expire'),
      address: localStorage.getItem('address'),
    };
    if (
      (session.id != null || session.id != '') &&
      (session.address != null || session.address != '') &&
      (session.expire != null || session.expire != '')
    ) {
      const expire = new Date(session.expire!);
      if (expire < currentDate) {
        alert('Sua sessao expirou! Um novo email sera gerado!');
        localStorage.setItem('session', '');
        localStorage.setItem('expire', '');
        localStorage.setItem('address', '');
        location.reload();
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

          const response = await axios.post(endpoint, query);
          if (response.status != 200) {
            alert(
              'Um erro ocorreu ao buscar seus emails. Talvez você tenha solicitado muitas requisições. Se o problema persistir por favor entre em contato!'
            );
            setLoaded(true);
            return;
          }
          if (response.data && response.data.data.session.mails.length > 0) {
            const currentLength = mailList.current?.length;
            mailList.current = response.data.data.session.mails;
            if (
              document.hidden &&
              currentLength != mailList.current?.length &&
              mailList.current != undefined
            ) {
              handleNotificatinons({
                text: mailList.current[0].text,
                headerSubject: mailList.current[0].headerSubject,
                url: location.host,
              });
            }
          }
          setLoaded(true);
          return;
        } catch (error) {
          console.log(error);
          alert(
            'Um erro ocorreu ao localizar seus emails! Talvez você tenha solicitado muitas requisições.'
          );
          setLoaded(true);
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
        setLoaded(true);
        setTimeout(() => {
          sessionRef.current = session.id;
          emailRef.current = session.address;
          handleRefresh();
        }, 100);
        return;
      }
    }
    try {
      const response = await axios.post(endpoint, {
        query:
          'mutation {introduceSession {id, expiresAt, addresses {address}}}',
      });
      if (response.status != 200) {
        alert(
          'Ocorreu um erro! Talvez você tenha solicitado muitas requisições. Tente recarregar a pagina!'
        );
        console.log('error');
        return;
      } else {
        console.log(response);
        if (response.data.data) {
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
    } catch (error) {
      console.log(error);
      alert(
        'Ocorreu um erro ao gerar o email. Talvez você tenha solicitado muitas requisições. Se persistir por favor entre em contato!'
      );
      setLoaded(true);
      return;
    }
  }, [currentDate, endpoint, handleRefresh]);

  useEffect(() => {
    generateEmail();
  }, []);

  useEffect(() => {
    if (!loaded) startCountdown(15);
  }, []);

  useEffect(() => {
    if (
      navigator.userAgent.match(/Macintosh/i) ||
      navigator.userAgent.match(/Windows/i)
    ) {
      setMobile(false);
    } else {
      setMobile(true);
    }
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
        <div className="max-w-2xl md:max-w-7xl mx-auto px-4 sm:px-6">
          <div className="">
            <div className="grid pt-5 mb-5">
              <span className="text-center justify-center">
                Seu email temporário
              </span>
              <div
                onMouseOver={() => {
                  emailRef.current && setShowCopy(true);
                }}
                onMouseLeave={() => {
                  emailRef.current && setShowCopy(false);
                }}
                onClick={() => {
                  if (emailRef.current) {
                    navigator.clipboard.writeText(emailRef.current);
                    setCopied(true);
                  }
                }}
                className={`${
                  emailRef.current && 'cursor-pointer'
                } w-fit mx-auto text-center grid relative`}
              >
                <h1
                  className={`${
                    copied ? 'text-indigo-600' : 'text-blue-500'
                  } md:text-gray-100 md:text-4xl font-extrabold leading-tight tracking-tighter text-2xl flex`}
                >
                  {emailRef.current ? emailRef.current : <Loading />}
                  <svg
                    fill="none"
                    viewBox="0 0 15 15"
                    height="1em"
                    width="1em"
                    className={`w-6 h-6 ${
                      emailRef.current ? 'contents' : 'hidden'
                    }`}
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
                <Image
                  width={96}
                  height={64}
                  src="/copy.png"
                  alt="copy"
                  priority
                />
              )}
              {showCopy && copied && (
                <Image
                  width={96}
                  height={64}
                  src="/copied.png"
                  alt="copy"
                  priority
                />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
              <div className="md:col-span-1 flex justify-between w-full bg-gray-500 text-gray-100 p-2 rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:border-r md:border-solid">
                <span className="flex text-xl items-center">
                  Inbox
                  {!mobile && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 ml-2 cursor-pointer"
                      onClick={() => {
                        enableNotificatinons();
                      }}
                    >
                      <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                      <path
                        fillRule="evenodd"
                        d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                <div className="flex items-center">
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
                    className="flex cursor-pointer"
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
              {mailList.current ? (
                <>
                  <div className="md:col-span-1 grid bg-gray-600 h-full md:h-full">
                    <div>
                      {mailList.current?.map((mail: MailData, i) => (
                        <>
                          <div
                            onClick={() => {
                              !disableClick && setOpenEmail(true);
                              setMailSelected(i);
                            }}
                            className="grid h-fit border-y border-solid p-2 cursor-pointer"
                            key={i}
                          >
                            <span className="text-blue-300 uppercase font-bold overflow-hidden truncate w-5/6">
                              {mail.fromAddr}
                            </span>
                            <span className="overflow-hidden truncate w-5/6">
                              {mail.headerSubject}
                            </span>
                            <span className="overflow-hidden truncate w-5/6">
                              {mail.text}
                            </span>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                  {openEmail && enableModal && (
                    <Mail
                      showMail={openEmail}
                      hideMail={hideMail}
                      mailData={mailList.current[mailSelected]}
                    />
                  )}
                  <div className="md:col-span-2 hidden md:grid bg-gray-100 h-[400px] md:h-[500px] border-l border-solid">
                    <div className="p-10 overflow-auto">
                      <span className="text-black text-2xl">
                        {mailList.current[mailSelected].headerSubject}
                      </span>
                      <p className="text-black text-xl w-[90%] whitespace-pre-line text-ellipsis overflow-x-hidden hover:overflow-x-visible">
                        {mailList.current[mailSelected].text}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-gray-100 col-span-3 text-gray-900 text-center p-2">
                    Nenhum email encontrado
                  </div>
                </>
              )}
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
