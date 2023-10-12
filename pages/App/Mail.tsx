import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

type ModalProps = {
  hideMail: (data: boolean) => void;
  showMail: boolean;
  mailData: MailData;
};

type MailData = {
  toAddrOrig: string | null | undefined;
  toAddr: string | null | undefined;
  text: string | null | undefined;
  receivedAt: string | null | undefined;
  rawSize: number | null | undefined;
  raw: string | null | undefined;
  id: string | null | undefined;
  html: string | null | undefined;
  headerSubject: string | null | undefined;
  headerFrom: string | null | undefined;
  fromAddr: string | null | undefined;
  downloadUrl: string | null | undefined;
  decodeStatus: string | null | undefined;
};

export default function MyModal({ hideMail, showMail, mailData }: ModalProps) {
  const handleClose = () => {
    hideMail(false);
  };

  return (
    <>
      <Transition appear show={showMail ? true : false} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {mailData?.headerSubject ? (
                      mailData?.headerSubject
                    ) : (
                      <>{`<SEM TITULO>`}</>
                    )}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 whitespace-pre-line">
                      {mailData?.text ? mailData?.text : <>{`<SEM CORPO>`}</>}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleClose()}
                    >
                      Fechar
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
