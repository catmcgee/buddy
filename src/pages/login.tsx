import React from 'react';
import Header from '../components/Header';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import useLogin from '@/lib/auth/useLogin';

function LoginPage() {
    const address = useAddress();
    const { mutate: requestLogin } = useLogin()

    if (!address) {
        return (<ConnectWallet/>)
    }
  return (
<button onClick={() => requestLogin()}>Log in</button>
  );
}

export default LoginPage;
