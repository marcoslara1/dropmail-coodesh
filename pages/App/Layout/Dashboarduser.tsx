import { Transition } from '@headlessui/react';
import Router from 'next/router';
import { Popover } from '@headlessui/react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Loading from '../Loading';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/utils/Database.types';
import { useUser } from '@supabase/auth-helpers-react';
import Signout from './Modal/Signout';

export const revalidate = 600;

const Dashboarduser = ({ childToParent }: any) => {
  const supabase = createClientComponentClient<Database>({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
  });

  const handleSession = useCallback(async () => {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) Router.push('/');

    return;
  }, [supabase.auth]);

  const user = useUser();

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [profileId, setProfileId] = useState<Number | null>();
  const [name, setName] = useState<String | null>('');
  const [data, setData] = useState<Boolean>(false);

  const getInfo = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(
          'profile_id, businessname, type, verificationrequested, verified'
        )
        .eq('user_id', user?.id!)
        .single();

      if (error && status !== 403) {
        alert('Ocorreu um erro. Se persistir entre em contato!');
        setLoading(false);
        return;
      }

      if (data) {
        setProfileId(data.profile_id);
        setName(data.businessname);
        setLoaded(true);
        setLoading(false);
        childToParent(data);
      }
    } catch (error) {
      alert('Ocorreu um erro. Se persistir entre em contato!');
      setLoading(false);
      return;
    }
  }, [childToParent, supabase, user?.id]);

  useEffect(() => {
    handleSession();
    if (user && !loaded) getInfo();
    // if (!user && loading)
    //     setTimeout(() => {
    //         if (!user && loading) Router.push('/')
    //     }, 1000)
  }, [getInfo, handleSession, loaded, loading, user]);

  const childToParent1 = (childdata: Boolean) => {
    setData(childdata);
  };

  const parentToChild = () => {
    setData(true);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {data && (
            <Signout childToParent={childToParent1} parentToChild={data} />
          )}
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                ${open ? '' : 'opacity-60'}
                group w-8 h-8 inline-flex mr-2 items-center px-2 rounded-full bg-transparent border text-base bg-gradient-to-b from-[#3689b9] to-[#2b2c2c] font-medium transition-all delay-100 ease-in-out text-white hover:opacity-100`}
                ></Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute md:left-0 -left-10 z-10 mt-3 -translate-x-1/2 transform">
                    <div className="grid bg-gray-700 p-5 rounded-xl">
                      <ul className="flex grow gap-2 justify-center text-center flex-wrap items-center">
                        <li>
                          <button
                            onClick={() =>
                              window.open(
                                'https://app.theneo.io/dbug-me/techinitials-pt',
                                '_blank'
                              )
                            }
                            className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                          >
                            <span>Documentacao</span>
                            <svg
                              className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                              viewBox="0 0 12 12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                                fillRule="nonzero"
                              />
                            </svg>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => Router.push('/')}
                            className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                          >
                            <span>Inicio</span>
                            <svg
                              className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                              viewBox="0 0 12 12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                                fillRule="nonzero"
                              />
                            </svg>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              Router.push('mailto:contact@techinitials.dbug.me')
                            }
                            className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                          >
                            <span>Ajuda</span>
                            <svg
                              className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                              viewBox="0 0 12 12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                                fillRule="nonzero"
                              />
                            </svg>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              supabase.auth.signOut();
                              Router.push('/');
                            }}
                            className="font-medium text-gray-200 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                          >
                            Sair
                          </button>
                        </li>
                      </ul>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </>
      )}
    </>
  );
};

export default Dashboarduser;
