import { Transition, Dialog } from '@headlessui/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import { useState, Fragment, use } from 'react';
import axios from 'axios';
import { Database } from '@/utils/Database.types';

const Verifyprofile = ({ childToParent, parentToChild }: any) => {
  const supabase = createClientComponentClient<Database>({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
  });

  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const data = parentToChild;
  const [disable, setDisable] = useState(false);

  const sendVerification = async () => {
    setDisable(true);
    try {
      const res = await axios.post(
        'https://southamerica-east1-techinitials-87e2d.cloudfunctions.net/server/verify/profile',
        { uId: user?.id!, email: user?.email! }
      );

      if (res.data.message == 'Ok') {
        alert('Sua solicitacao foi recebida com sucesso');
        childToParent(false);
        location.reload();
      } else {
        alert(`Um erro ocorreu com sua solicitacao! ${res.data.message}`);
        setDisable(false);
        return;
      }
    } catch (error) {
      alert('Ocorreu um erro. Se persistir entre em contato!');
      setDisable(false);
      return;
    }
  };

  return (
    <>
      <Transition appear show={data ? true : false} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => childToParent(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 text-gray-100 font-semibold"
                  >
                    Importante!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg text-gray-100">
                      O contato sera realizado atravez do email cadastrado!
                      Lembrando que toda uma pesquisa sera efetuada antes com o
                      email cadastrado.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      disabled={disable}
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-200"
                      onClick={() => {
                        sendVerification();
                      }}
                    >
                      Solicitar!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Verifyprofile;
