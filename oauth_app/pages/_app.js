import { useState } from 'react'
import { AuthContext } from '../shared/context/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [profile, setProfile] = useState(null)

  return (
  <AuthContext.Provider value={{
    isSignedIn,
    profile,
    setIsSignedIn,
    setProfile,
  }}>
    <Component {...pageProps} />
  </AuthContext.Provider>
)
}

export default MyApp
