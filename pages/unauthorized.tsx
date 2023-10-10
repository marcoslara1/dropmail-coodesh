import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Router from 'next/router';
import Loading from './App/Loading';

export default function Unauthorized() {
  const data = useSearchParams();
  const error = data.get('error_code');
  const message = data.get('error_description');
  if ((error && message == '') || null) {
    Router.push('/');
  }
  setTimeout(() => {
    Router.push('/');
  }, 3000);
  return (
    <>
      <main className="grid bg-gray-900 min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-blue-600">{error}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl">
            Não autorizado!
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Desculpe, ocorreu um erro com a solicitação! O link que você tentou
            acessar é válido? Erro: {message}
          </p>
          Redirecionando...
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Loading />
          </div>
        </div>
      </main>
    </>
  );
}
