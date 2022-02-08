import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../shared/context/auth";

const LogoutPage = () => {
    const {setIsSignedIn, setProfile} = useAuth()
    const router = useRouter()

    useEffect(() => {
        setIsSignedIn(false)
        setProfile(null)

        // localStorage.removeItem("access_token")
        // localStorage.removeItem("refresh_token")
        // localStorage.removeItem("profile")
        ['access_token', 'refresh_token', 'profile'].forEach(key => {
            localStorage.removeItem(key)
        })

        router.push("/")
    },[])

    return <div>loading...</div>
}

export default LogoutPage