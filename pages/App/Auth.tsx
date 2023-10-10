import { useEffect, useState } from 'react';
import Resetpassword from './Auth/Resetpassword';
import Signup from './Auth/Signup';
import Signin from './Auth/Signin';

const Auth = ({ childToParent1, parentToChild }: any) => {
  const data = parentToChild?.data!;
  const [reset, setReset] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [option, setOption] = useState('');

  useEffect(() => {
    if (data == 'signup') setSignUp(true);
    if (option == 'reset') {
      setReset(true);
      setSignUp(false);
    }
    if (option == 'signup') {
      setReset(false);
      setSignUp(true);
    }
    if (option == 'signin') {
      setReset(false);
      setSignUp(false);
    }
    if (option == 'close') {
      childToParent1(false);
      setSignUp(false);
      setReset(false);
    }
  }, [childToParent1, data, option]);

  const childToParent = (childdata: any) => {
    setOption(childdata);
  };
  const childToParent2 = (childdata: any) => {
    setOption(childdata);
  };
  const childToParent3 = (childdata: any) => {
    setOption(childdata);
  };
  return (
    <>
      {reset ? (
        <Resetpassword childToParent={childToParent} />
      ) : signup ? (
        <Signup childToParent2={childToParent2} />
      ) : (
        <Signin childToParent3={childToParent3} />
      )}
    </>
  );
};

export default Auth;
