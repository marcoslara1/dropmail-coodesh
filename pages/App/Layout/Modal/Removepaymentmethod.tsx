import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../utils/Database.types';
import axios from 'axios';
import Router from 'next/router';

export default function Removepaymentmethod({
  childToParent,
  parentToChild,
  paymentMethod,
}: any) {
  const user = useUser();
  const data = parentToChild;

  const [disableButton, setDisableButton] = useState(false);
  const [errorNotification, setErrorNotification] = useState(false);
  const [successNotification, setSuccessNotification] = useState(false);

  const Detachpayment = async () => {
    setDisableButton(true);
    if (paymentMethod) {
      try {
        const res = await axios.post(
          'https://southamerica-east1-techinitials-87e2d.cloudfunctions.net/server/payments/detach-payment-methods',
          {
            uId: user?.id!,
            paymentMethod: paymentMethod,
          }
        );

        if (res.status == 200) {
          setSuccessNotification(true);
          setTimeout(() => {
            location.reload();
          }, 4000);
        }

        if (res.data.message == 'notOwner') {
          setErrorNotification(true);
          alert('Voce nao e o dono deste cartao!');
          return;
        }

        if (res.status == 401 || res.status != 200) {
          setErrorNotification(true);
          alert('Ocorreu um erro. Se persistir entre em contato!');
          setTimeout(() => {
            location.reload();
          }, 4000);
        }
      } catch (error) {
        setErrorNotification;
        alert('Ocorreu um erro. Se persistir entre em contato!');
      }
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-950 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-100"
                  >
                    Deseja mesmo remover este metodo de pagamento?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-100">
                      Este procedimento nao pode ser desfeito. Deseja mesmo
                      continuar?
                    </p>
                  </div>
                  {successNotification && (
                    <div
                      className="flex p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                      role="alert"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 inline w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">Sucesso!</span> Cartao foi
                        removido com sucesso.
                      </div>
                    </div>
                  )}
                  {errorNotification && (
                    <div
                      className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 inline w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">Ocorreu um erro!</span>{' '}
                        Tente novamente.
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => childToParent(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="inline-flex ml-4 justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        Detachpayment();
                      }}
                      disabled={disableButton}
                    >
                      Remover
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
}
