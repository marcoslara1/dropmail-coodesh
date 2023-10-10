export const metadata = {
  title: 'Sign Up - Simple',
  description: 'Page description',
};

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import Loading from '../Loading';
import { Database } from '@/utils/Database.types';

const Signup = ({ childToParent2 }: any) => {
  const supabase = createClientComponentClient<Database>({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
  });

  const [isOk, setIsOk] = useState(true);
  const [weakPassword, setWeakPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [type, setType] = useState('N');

  useEffect(() => {
    const strongPassword = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
    );

    if (confirmPassword != password) {
      setIsOk(false);
    } else {
      setIsOk(true);
    }
    if (password.match(strongPassword)) {
      setWeakPassword(true);
    } else {
      setWeakPassword(false);
    }
  }, [confirmPassword, password]);

  const createAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (weakPassword && !isOk) {
      alert('Senha fraca ou não iguais!');
      setIsSubmitted(false);
      return;
    }

    if (name.length > 45) {
      alert('Nome da empresa nao pode exceder 45 caracteres');
      setIsSubmitted(false);
      return;
    }
    if (
      email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) == null
    ) {
      alert('Email invalido!');
      setIsSubmitted(false);
      return;
    }
    if (
      email &&
      password &&
      type &&
      name &&
      email != null &&
      name != null &&
      type != null &&
      type != 'N'
    ) {
      try {
        var userId = '';
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (error?.status == 429) {
          alert(
            'Voce tentou criar sua conta muitas vezes. Tente novamente mais tarde.'
          );
          return;
        }

        if (error) {
          alert('Ocorreu um erro! Tente novamente.');
          return;
        }
        if (data) {
          try {
            await axios
              .post(
                'https://southamerica-east1-techinitials-87e2d.cloudfunctions.net/server/create/profile',
                {
                  uId: data.user?.id!,
                  email: email,
                  name: name,
                  type: type,
                }
              )
              .then((res) => {
                if (res.data.message == 'Ok') Router.push('/App/Verifyemail');
                setIsSubmitted(false);
              })
              .catch(async (error) => {
                await axios
                  .post(
                    'https://southamerica-east1-techinitials-87e2d.cloudfunctions.net/server/create/profile',
                    {
                      uId: data.user?.id!,
                      email: email,
                      name: name,
                      type: type,
                      retry: true,
                    }
                  )
                  .then((res) => {
                    if (res.data.message == 'Ok')
                      Router.push('/App/Verifyemail');
                  })
                  .catch(async (error1) => {
                    alert(
                      'Ocorreu um erro com sua requisicao tente novamente mais tarde.'
                    );
                    try {
                      await axios.post(
                        'https://southamerica-east1-techinitials-87e2d.cloudfunctions.net/server/cleanup/profile',
                        { uId: data.user?.id! }
                      );
                    } catch (error) {
                      alert('Ocorreu um erro. Se persistir entre em contato!');
                    }
                    setIsSubmitted(false);
                  });
              })
              .catch((error) => {
                alert('Ocorreu um erro. Se persistir entre em contato!');
                setIsSubmitted(false);
              });
          } catch (error) {
            alert('Ocorreu um erro. Se persistir entre em contato!');
            setIsSubmitted(false);
          }
        }
      } catch (error) {
        alert('Ocorreu um erro. Se persistir entre em contato!');
        setIsSubmitted(false);
      }
    } else {
      alert('Email, nome ou tipo de atividade vazios!');
      setIsSubmitted(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#2b2c2c] to-[#2c3c42] h-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-6 pb-6 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20 relative">
            <button
              className="w-fit bg-gray-700 rounded-md absolute -top-5 -right-2 md:-top-5 md:-right-5"
              onClick={() => childToParent2('close')}
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
            <h1 className="h1">Bem-vindo! E ótimo vê-lo aqui.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form
              onSubmit={(e) => {
                createAccount(e);
              }}
            >
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-100 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Nome da empresa <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="form-input w-full text-gray-800"
                    placeholder="Digite o nome da empresa"
                    required
                    disabled={isSubmitted}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-100 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input w-full text-gray-800"
                    placeholder="Digite o email"
                    required
                    disabled={isSubmitted}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-100 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Senha <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your password"
                    required
                    disabled={isSubmitted}
                  />
                </div>
              </div>
              {!weakPassword ? (
                <p className="mt-2 text-sm text-red-500">
                  <span className="font-medium">Oops!</span> Senha muito fraca!
                  Tente utilizar letras maiúsculas, minúsculas, números e
                  caracteres especiais!
                </p>
              ) : (
                <p className="mt-2 text-sm text-green-500">
                  <span className="font-medium">Senha</span> forte!
                </p>
              )}
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-100 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Confirme Senha <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your password"
                    required
                    disabled={isSubmitted}
                  />
                </div>
              </div>
              {!isOk && (
                <p className="mt-2 text-sm text-red-500">
                  <span className="font-medium">Oops!</span> Senhas não
                  coicidem!
                </p>
              )}
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-100 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Atividade <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="type"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    className="form-input w-full text-gray-800"
                    required
                    disabled={isSubmitted}
                  >
                    <option value="N">Escolha uma opcao</option>
                    <option value="S">Escola</option>
                    <option value="J">Plataforma de empregos</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  {isSubmitted ? (
                    <Loading />
                  ) : (
                    <button
                      disabled={isSubmitted}
                      className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                    >
                      Criar conta
                    </button>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center mt-3">
                Em criar sua conta voce aceita os{' '}
                <a className="underline" href="#0">
                  termos & condicoes
                </a>
                , e a nossa{' '}
                <a className="underline" href="#0">
                  politica de privacidade
                </a>
                .
              </div>
            </form>
            {/* <div className="flex items-center my-6">
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
                        <form>
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
                                    <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
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
              Already using Simple?{' '}
              <button
                onClick={() => childToParent2('signin')}
                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
