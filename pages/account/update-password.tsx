import { Database } from '@/utils/Database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const metadata = {
  title: 'Resetar senha',
  description: 'Resetar senha do usuario techinitials',
};

const Updatepassword = () => {
  const supabase = createClientComponentClient<Database>({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
  });
  const user = useUser();
  const [authError, setAuthError] = useState<any>();
  const [errorOcurred, setErrorOcurred] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [password, setPassword] = useState('');
  const [weakPassword, setWeakPassword] = useState(false);
  const [isOk, setIsOk] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSession = useCallback(async () => {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) Router.push('/');

    return;
  }, [supabase.auth]);

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
    handleSession();
    const data = new URLSearchParams(window.location.hash.substring(1));
    const error = data.get('error_code');
    const description = data.get('error_description');
    if (data.get('error') == 'unauthorized_client') {
      Router.push(
        `/unauthorized?error_code=` +
          error +
          `&error_description=` +
          description
      );
    }
    // if (user) {
    //   console.log(user);
    //   console.log(user.recovery_sent_at);
    //   const currentDate = new Date().getTime();
    //   const recoverySent = new Date(user.invited_at!).getTime();
    //   console.log(Math.abs(currentDate - recoverySent));
    //   if (Math.abs(currentDate - recoverySent) >= 30000) {
    //     Router.push(
    //       `/unauthorized?error_code=` +
    //         401 +
    //         `&error_description=` +
    //         'You can not reset password without requesting for a reset first!'
    //     );
    //   }
    // }
  }, [confirmPassword, handleSession, password, user]);

  const reset = async (e: any) => {
    e.preventDefault();
    if (isOk && weakPassword) {
      if (typeof window != 'undefined') {
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData) as any;
        const password = form_values['password'];
        if (password) {
          const { error } = await supabase.auth.updateUser({
            password: password,
          });
          if (error) {
            setErrorOcurred(true);
            setAuthError(error.message);
            if (error.status == 429)
              alert(
                'Voce tentou resetar sua senha recentemente! Tente novamente mais tarde!'
              );
          } else {
            setErrorOcurred(false);
            Router.push('/App/Dashboard');
          }
        } else {
          alert('password ou senha vazios ou incorretos.');
        }
      }
    } else {
      alert('Senhas nao iguais ou muito faca!');
      return;
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#2b2c2c] to-[#2c3c42] h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20 relative">
            <h1 className="h1 mb-4">Vamos la resetar sua senha</h1>
            <p className="text-xl text-gray-300">Digite sua nova senha.</p>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={(e) => reset(e)}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-200 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Senha <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input w-full text-gray-800"
                    placeholder="Digite sua nova senha"
                    required
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
                  />
                </div>
              </div>
              {!isOk && (
                <p className="mt-2 text-sm text-red-500">
                  <span className="font-medium">Oops!</span> Senhas não
                  coicidem!
                </p>
              )}
              {errorOcurred && (
                <span className="text-sm text-red-500">
                  <span className="font-medium">Oops!</span> Ocorreu um erro no
                  hora de fazer o reset de senha! {authError}
                </span>
              )}
              <div className="flex flex-wrap -mx-3 mt-6 text-center">
                <div className="grid w-full px-3">
                  {!resetSent && (
                    <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-3">
                      Resetar
                    </button>
                  )}
                  <button
                    onClick={() => Router.push('/App/Dashboard')}
                    type="button"
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-3"
                  >
                    Volar para o Dashboard
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Updatepassword;
