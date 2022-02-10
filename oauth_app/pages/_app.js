import { useEffect, useState } from 'react'
import { AuthContext } from '../shared/context/auth'
import BaseLayout from '../shared/layouts/base'
import '../styles/globals.css'
import '../lib/interceptors';

function MyApp({ Component, pageProps }) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    try {
      window.API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
      const profile = JSON.parse(localStorage.getItem("profile"))
      if (profile){
        setIsSignedIn(true)
        setProfile(profile)
      }
    }catch(err){

    }
  }, [])

  return (
  <AuthContext.Provider value={{
    isSignedIn,
    profile,
    setIsSignedIn,
    setProfile,
  }}>
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  </AuthContext.Provider>
)
}

export default MyApp
