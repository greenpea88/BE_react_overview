import axios from "axios";
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../../shared/context/auth";

const CallBackPage = () => {
    const router = useRouter();
    const {setIsSignedIn, setProfile} = useAuth();
    const [error, setError] = useState(null);

    useEffect( () => {
        (async () => {
            const {code} = router.query;
            if (code) {
                // auth server로부터 code를 정상적으로 받아올 경우
                try {
                    const resp = await axios.post("/api/oauth/token",
                    {
                        grant_type: "authorization_code",
                        code,
                    });

                    const {access_token, refresh_token} = resp.data;
                    localStorage.setItem("access_token") = access_token;
                    localStorage.setItem("refresh_token") = refresh_token;

                    //사용자에 대한 정보를 보내주지 않기 때문에 한 번더 요청을 해서 받아와야 함
                    // const profileResp = await axios.get(
                    //     ,
                    //     {
                    //         headers: {
                    //             authorization: `Bearer ${access_token}`
                    //         },
                    //     }
                    // );
                    // setIsSignedIn(true);
                    // setProfile()

                } catch (err) {
                    setError("server error")
                }
            }
        })
    }, [router])
}