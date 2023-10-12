import Link from 'next/link';
import Router from 'next/router';

export default function Notfound() {
  return (
    <>
      <main className="grid bg-gray-900 min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-blue-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl">
            Oops... Página não encontrada
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-500">
            Desculpe, não conseguimos encontrar a página que buscava.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Voltar para o início
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
