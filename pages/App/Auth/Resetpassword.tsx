import { Database } from '@/utils/Database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export const metadata = {
  title: 'Resetar senha',
  description: 'Resetar senha do usuario techinitials',
};

const Resetpassword = ({ childToParent }: any) => {
  const supabase = createClientComponentClient<Database>({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
  });
  const [authError, setAuthError] = useState<any>();
  const [errorOcurred, setErrorOcurred] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const reset = async (e: any) => {
    if (typeof window != 'undefined') {
      e.preventDefault();
      var formData = new FormData(e.target);
      const form_values = Object.fromEntries(formData) as any;
      const email = form_values['email'];
      if (email) {
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${
              new URL(location.href).origin
            }/api/auth/callback?next=/account/update-password`,
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
            setResetSent(true);
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

  return (
    <section className="bg-gradient-to-b from-[#2b2c2c] to-[#2c3c42] h-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20 relative">
            <button
              className="w-fit bg-gray-700 rounded-md absolute -top-5 -right-2 md:-top-5 md:-right-5"
              onClick={() => childToParent('close')}
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
            <h1 className="h1 mb-4">Vamos te ajudar a se reerguer.</h1>
            <p className="text-xl text-gray-300">
              Digite o endereço de e-mail que você usou ao criar sua conta, e
              nós lhe enviaremos um link por e-mail para redefinir sua senha.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={(e) => reset(e)}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-200 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-input w-full text-gray-800"
                    placeholder="Digite seu email"
                    required
                  />
                </div>
              </div>
              {resetSent && (
                <span className="text-sm text-green-500">
                  <span className="font-medium">Ok!</span> Um email foi enviado
                  com instrucoes de reset!
                </span>
              )}
              {errorOcurred && (
                <span className="text-sm text-red-500">
                  <span className="font-medium">Oops!</span> Ocorreu um erro no
                  hora de fazer o reset de senha! {authError}
                </span>
              )}
              <div className="flex flex-wrap -mx-3 mt-6 text-center">
                <div className="w-full px-3">
                  {!resetSent && (
                    <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-3">
                      Enviar reset
                    </button>
                  )}
                  <span
                    onClick={() => childToParent('signin')}
                    className="text-blue-200 cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resetpassword;
