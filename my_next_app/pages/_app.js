import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools"
import '../styles/globals.css'
import { AuthContext } from './shared/contexts/auth';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  // context로 사용할 것들의 기본값은 최상위에서 Local로 관리하면 된다.
  const [profile, setProfile] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <AuthContext.Provider
    value = {{
      profile,
      isLoggedIn,
      setIsLoggedIn,
      setProfile
    }}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </AuthContext.Provider>
  );
}

export default MyApp;
