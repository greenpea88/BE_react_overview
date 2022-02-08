import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../shared/context/auth";

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {setIsSignedIn, setProfile} = useAuth()
    const router = useRouter()

    const handleSubmit = async() => {
        const res = await axios.post("/api/oauth/token", 
        {
            grant_type: "password",
            username, 
            password
        });
        const {access_token, id_token, refresh_token} = res.data

        const decodedIdToken = jwtDecode(id_token)
        const profile = {email: decodedIdToken.email}

        localStorage.setItem("access_token", access_token)
        localStorage.setItem("refresh_token", refresh_token)
        localStorage.setItem("profile", JSON.stringify(profile))

        setIsSignedIn(true)
        setProfile(profile)

        //화면의 전환이 이뤄지도록 함 >> 새로고침 되는 것이 아니라 정보를 가지고 있는 상태에서 화면만 바뀜
        router.push("/")
    }

    return (
        <div>
            <div>
                username :
                <input 
                type={"text"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                password : 
                <input
                type={"text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default LoginPage;
