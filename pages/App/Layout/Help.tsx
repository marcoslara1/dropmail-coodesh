import { Popover, Transition } from '@headlessui/react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import { Fragment, use, useEffect, useState } from 'react';
import Loading from '../Loading';
import axios from 'axios';

const Help = ({ parentToChild3 }: any) => {
  const user = useUser();

  const [feedback, setFeedback] = useState<string | undefined>('');
  const [contact, setContact] = useState<string | undefined>('');
  const [contactType, setContactType] = useState('N');
  const [sendingRequest, setSendingRequest] = useState(false);

  const handleRequest = async (type: string) => {
    setSendingRequest(true);
    if (type == 'feedback' && feedback && feedback.length > 10) {
      const res = await axios.post(
        'https://southamerica-east1-techinitials-87e2d.cloudfunctions.net/server/contact',
        {
          uId: user?.id!,
          email: user?.email!,
          text: feedback,
          helpType: 'Feedback',
        }
      );

      if (res.data.message == 'NotVerified') {
        alert('Apenas Verificados podem enviar feedbacks!');
        setFeedback('');
        return;
      }
      if (res.data.message == 'unhandled') {
        alert('Ocorreu um erro com sua solicitacao');
        setSendingRequest(false);
        setFeedback('');
        return;
      }
      if (res.data.message == 'Ok') {
        alert('Feedback enviado! Agradecemos muito!');
        setSendingRequest(false);
        setFeedback('');
        return;
      }
    } else if (type != 'contact') {
      alert('Feedback vasio ou invalido!');
      setSendingRequest(false);
      return;
    }
    if (
      type == 'contact' &&
      contact &&
      contact.length > 10 &&
      contactType != 'N'
    ) {
      const res = await axios.post(
        'https://southamerica-east1-techinitials-87e2d.cloudfunctions.net/server/contact',
        {
          uId: user?.id!,
          email: user?.email!,
          text: contact,
          helpType: contactType,
        }
      );

      if (res.data.message == 'NotVerified') {
        alert('Apenas Verificados podem enviar feedbacks!');
        return;
      }
      if (res.data.message == 'unhandled') {
        alert('Ocorreu um erro com sua solicitacao');
        setSendingRequest(false);
        setContact('');
        setContactType('N');
        return;
      }
      if (res.data.message == 'Ok') {
        alert('Contato enviado!');
        setSendingRequest(false);
        setContact('');
        setContactType('N');
        return;
      }
    } else {
      alert(
        'Contato vasio ou invalido ou voce nao escolheu a opcao de contato!'
      );
      setSendingRequest(false);
      return;
    }
  };

  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <>
          <div className="flex gap-2 justify-between">
            <Popover className="relative">
              {({ open }) => (
                <>
                  {!open && setFeedback('')}
                  <Popover.Button className="btn bg-green-500 font-semibold hover:bg-green-400 h-fit">
                    Enviar feedback
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="z-10">
                      {parentToChild3 ? (
                        <div className="grid">
                          <div className="flex flex-wrap -mx-3 my-4">
                            {sendingRequest ? (
                              <Loading />
                            ) : (
                              <div className="px-3 grid">
                                Minimo 10 e maximo 400 caracteres
                                <textarea
                                  id="feedback"
                                  maxLength={400}
                                  onChange={(e) => setFeedback(e.target.value)}
                                  className="form-input w-full text-gray-800"
                                  placeholder="Digite seu feedback"
                                  required
                                />
                                <button
                                  onClick={() => {
                                    setContact(undefined);
                                    setContactType('N');
                                    handleRequest('feedback');
                                  }}
                                  className="btn bg-green-500 font-semibold hover:bg-green-400 h-fit w-fit mt-2"
                                >
                                  Enviar
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>Apenas verificados podem enviar feedbacks</>
                      )}
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="btn bg-gray-600 font-semibold hover:bg-gray-400 h-fit">
                    Entrar em contato
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="z-10">
                      {parentToChild3 ? (
                        <div className="grid">
                          <div className="flex flex-wrap -mx-3 my-4">
                            {sendingRequest ? (
                              <Loading />
                            ) : (
                              <div className="px-3 grid">
                                Minimo 10 e maximo 400 caracteres
                                <textarea
                                  id="contact"
                                  maxLength={400}
                                  onChange={(e) => setContact(e.target.value)}
                                  className="form-input w-full text-gray-800"
                                  placeholder="Digite seu feedback"
                                  required
                                  disabled={sendingRequest}
                                />
                                <label
                                  className="block text-gray-100 text-sm font-medium mb-1"
                                  htmlFor="contactType"
                                >
                                  Tipo de contato{' '}
                                  <span className="text-red-600">*</span>
                                </label>
                                <select
                                  id="contactType"
                                  onChange={(e) => {
                                    setContactType(e.target.value);
                                  }}
                                  className="form-input w-full text-gray-800"
                                  required
                                  disabled={sendingRequest}
                                >
                                  <option value="N">Escolha uma opcao</option>
                                  <option value="Support">Suporte</option>
                                  <option value="Contact">
                                    Contato (financeiro etc..)
                                  </option>
                                </select>
                                <button
                                  onClick={() => {
                                    setFeedback(undefined);
                                    handleRequest('contact');
                                  }}
                                  className="btn bg-green-500 font-semibold hover:bg-green-400 h-fit w-fit mt-2"
                                >
                                  Enviar
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>Apenas verificados podem enviar feedbacks</>
                      )}
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <button
              onClick={() => window.open('/Terms&Privacy')}
              className="btn bg-blue-200 text-black font-semibold hover:bg-blue-400 h-fit"
            >
              Termos & Privacidade
            </button>
            <button
              onClick={() => window.open('/Controllerterms')}
              className="btn bg-yellow-200 text-black font-semibold hover:bg-yellow-400 h-fit"
            >
              LGPD
            </button>
          </div>
          <div></div>
        </>
      )}
    </>
  );
};

export default Help;
