export const metadata = {
  title: 'Sign In - Simple',
  description: 'Page description',
};

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Router from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { Database } from '@/utils/Database.types';

const Signin = ({ childToParent3 }: any) => {
  const supabase = createClientComponentClient<Database>({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
  });
  const user = useUser();

  const [authError, setAuthError] = useState<any>();
  const [errorOcurred, setErrorOcurred] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const login = async (e: any) => {
    if (typeof window != 'undefined') {
      e.preventDefault();
      var formData = new FormData(e.target);
      const form_values = Object.fromEntries(formData) as any;
      const email = form_values['email'];
      const password = form_values['password'];
      if (email && password) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          if (data.user) {
            Router.push('/App/Dashboard');
          }
          if (error) {
            setErrorOcurred(true);
            setAuthError(error.message);
          }
        } catch (error) {
          setErrorOcurred(true);
          alert('Ocorreu um erro!');
        }
      } else {
        alert('Email ou senha vazios ou incorretos.');
      }
    }
  };

  useEffect(() => {
    if (authError == 'Email not confirmed') Router.push('/App/Verifyemail');
    if (authError == 'Invalid login credentials')
      setAuthError('Usuario ou senha incorretos!');
    if (user) {
      Router.push('/');
      location.reload();
    }
  }, [authError, user]);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) {
      alert('Ocorreu um erro. Se persistir entre em contato!');
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#2b2c2c] to-[#2c3c42] h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-10 pb-12 md:pt-20 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20 grid relative">
            <button
              className="w-fit bg-gray-700 rounded-md absolute -top-5 -right-2 md:-top-5 md:-right-5"
              onClick={() => childToParent3('close')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h1 className="h1">Bem-vindo de volta! Que bom velo novamente.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form
              onSubmit={(e) => {
                login(e);
              }}
            >
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-100 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="form-input w-full text-gray-800"
                    placeholder="Digite seu email"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label
                      className="block text-gray-100 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => childToParent3('reset')}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Problemas no login?
                    </button>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="password"
                    className="form-input w-full text-gray-800"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
              </div>
              {errorOcurred && (
                <span className="text-sm text-red-500 mt-1">
                  <span className="font-medium">Oops!</span> Ocorreu um erro no
                  hora de fazer o login! {authError}
                </span>
              )}
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="flex items-center my-6">
              <div
                className="border-t border-gray-300 grow mr-3"
                aria-hidden="true"
              ></div>
              <div className="text-gray-600 italic">Or</div>
              <div
                className="border-t border-gray-300 grow ml-3"
                aria-hidden="true"
              ></div>
            </div>
            {/* <form onSubmit={(e) => handleSignIn(e)}>
               <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <button className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                    <svg
                      className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                    </svg>
                    <span className="flex-auto pl-16 pr-8 -ml-16">
                      Continue with GitHub
                    </span>
                  </button>
                </div>
              </div> 
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <button className="btn px-0 text-white bg-gradient-to-tl from-yellow-800 to-green-800 hover:bg-red-700 w-full relative flex items-center">
                    <svg
                      className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                    </svg>
                    <span className="flex-auto pl-16 pr-8 -ml-16">
                      Continue with Google
                    </span>
                  </button>
                </div>
              </div>
            </form> */}
            <div className="text-gray-600 text-center mt-6">
              Nao tem uma conta?{' '}
              <button
                onClick={() => childToParent3('signup')}
                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
              >
                Criar uma
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
