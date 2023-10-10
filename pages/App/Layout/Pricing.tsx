import { CheckIcon } from '@heroicons/react/20/solid';
import Router from 'next/router';

const includedFeatures = [
  'Sem limite de requisicao',
  'Respostas rapidas',
  'Quase todas as linguagens de programacao',
  'Sem limite de cadastro',
];

const Pricing = () => {
  return (
    <div id="pricing" className="bg-transparent w-fit">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:flex lg:max-w-none bg-[#2c343c]">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-100">
              Pay as you go
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-300">
              Em nossa API, não há limites de uso mensal ou diário; você é
              cobrado somente pelo que utilizar. Além disso, se você não tiver
              alunos para cadastrar, não haverá nenhum custo envolvido! Acesse a
              pagina de{' '}
              <button
                className="text-blue-500"
                onClick={() => Router.push('/Pricing')}
              >
                precos
              </button>{' '}
              e entenda!
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-blue-400">
                O que esta incluso
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-300 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-blue-400"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-300 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Para escolas
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    R$0,10
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    BRL/por requisição
                  </span>
                </p>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Valores so se aplicam a certas informacoes. Acesse a{' '}
                  <button
                    onClick={() =>
                      window.open(
                        'https://app.theneo.io/dbug-me/techinitials-pt/v1-atual/escola/limitacoes',
                        '_blank'
                      )
                    }
                    className="p-0 m-0 text-blue-700"
                  >
                    documentacao
                  </button>
                </p>
                <div className="border border-solid border-gray-700 opacity-70 my-5"></div>
                <p className="text-base font-semibold text-gray-600">
                  Para sites de empregos
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    R$0,06
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    BRL/por requisição
                  </span>
                </p>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Acesse a{' '}
                  <button
                    onClick={() =>
                      window.open(
                        'https://app.theneo.io/dbug-me/techinitials-pt/v1-atual/plataforma/limitacoes-2',
                        '_blank'
                      )
                    }
                    className="p-0 m-0 text-blue-700"
                  >
                    documentacao
                  </button>{' '}
                  e entenda melhor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
