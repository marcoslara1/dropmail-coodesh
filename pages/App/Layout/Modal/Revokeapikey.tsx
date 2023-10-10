import { Transition, Dialog } from '@headlessui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { useState, Fragment, use } from 'react';
import axios from 'axios';

const Revokeapikey = ({ childToParent3, parentToChild2 }: any) => {
  const user = useUser();
  const data = parentToChild2?.data!;
  const profile_id = parentToChild2?.pId!;
  const [revokingApiKey, setRevokingApiKey] = useState(false);

  const revokeApiKey = async () => {
    if (!revokingApiKey) {
      setRevokingApiKey(true);
      try {
        var token = '';
        const tokenRes = await axios.post(
          'https://southamerica-east1-techinitials-87e2d.cloudfunctions.net/server/create/token',
          { uId: user?.id!, pId: profile_id, revoke: true }
        );
        if ((tokenRes.data.message = 'Ok')) {
          token = tokenRes.data.token;
          const res = await axios.post(
            'https://southamerica-east1-techinitials-87e2d.cloudfunctions.net/server/revoke/apiKey',
            {
              uId: user?.id!,
              pId: profile_id,
              authToken: token,
            }
          );
          if (res.data.message == 'Ok') location.reload();
          if (res.data.code == 'TLL') {
            alert(res.data.code);
            setRevokingApiKey(false);
            return;
          }
        } else {
          alert('Um erro ocorreu! Tente novamente mais tarde');
          setRevokingApiKey(false);
          return;
        }
      } catch (err: any) {
        if (err.response.status == 429) {
          alert(
            'Você so pode criar uma chave api a cada 10 minutos. Caso possua informações que sue chave foi vazada e esta no período de limite por favor revogue a chave e aguarde o periodo para criar novamente!'
          );
          setRevokingApiKey(false);
          return;
        } else if (err.response.data.code == 'TLL') {
          alert('O token para renovacao expirou! Tente novamente!');
          setRevokingApiKey(false);
          return;
        } else if (err.response.status == 403) {
          alert('Sua chave api esta revogada! Crie uma nova.');
          setRevokingApiKey(false);
          return;
        } else {
          alert('Ocorreu um erro. Se persistir entre em contato!');
          setRevokingApiKey(false);
          return;
        }
      }
    }
  };

  return (
    <>
      <Transition appear show={data ? true : false} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            if (!revokingApiKey) childToParent3(false);
          }}
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
                      Sua chave api esta prestes a ser revogada. Este processo
                      nao pode ser desfeito!
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-200"
                      onClick={() => {
                        if (!revokingApiKey) childToParent3(false);
                      }}
                    >
                      Cancelar!
                    </button>
                    <button
                      type="button"
                      disabled={revokingApiKey}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-200"
                      onClick={() => {
                        revokeApiKey();
                      }}
                    >
                      Revogar
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

export default Revokeapikey;
