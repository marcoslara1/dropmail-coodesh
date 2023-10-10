import { useCallback, useContext, useEffect, useState } from 'react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '../../utils/Database.types';
import Loading from './Loading';

export default function VerifyEmail() {
  const supabase = createClientComponentClient<Database>();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const { push } = useRouter();

  useEffect(() => {
    if (user) {
      if (user.user_metadata.email_verified) {
        push('/');
      }
    }
  }, [push, user]);

  const [resend, setResend] = useState(false);

  let savedCountdown: string | null;

  // Load the countdown value from localStorage on component mount
  useEffect(() => {
    savedCountdown = localStorage.getItem('countdown');
    if (savedCountdown) {
      setCountdown(parseInt(savedCountdown, 10));
      setResend(true);
    } else {
      setResend(false);
    }
  }, []);

  const [countdown, setCountdown] = useState(
    savedCountdown! ? parseInt(savedCountdown, 10) : 0
  );

  // Save the countdown value to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('countdown', countdown.toString());
  }, [countdown]);

  useEffect(() => {
    if (countdown > 0) {
      const timerInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else {
      setResend(false);
    }
  }, [countdown]);

  const resendEmail = async () => {
    await supabase.auth
      .resend({
        type: 'signup',
        email: user?.email!,
      })
      .then(() => {
        setResend(true);
        setCountdown(60);
      })
      .catch((error: Error) => {
        alert('Erro ao enviar email de confirmação');
        return;
      });
  };
  return (
    <>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Loading />
          <span className="sr-only">Loading...</span>
          <div className="grid mt-5 text-center" role="status">
            Verifique seu Email
            <button
              className="mt-5 text-center text-gray-500 hover:cursor-pointer"
              onClick={resendEmail}
              disabled={resend}
            >
              Reenviar email de confirmação
            </button>
            {resend && countdown}
          </div>
        </div>
      </section>
    </>
  );
}
