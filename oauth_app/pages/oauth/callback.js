import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../../shared/context/auth";

const CallBackPage = () => {
    // auth server로부터 code를 받아온 이후의 처리 진행
    const router = useRouter();
    const {setIsSignedIn, setProfile} = useAuth();
    const [error, setError] = useState(null);

    useEffect( () => {
        (async () => {
            const {code} = router.query;
            if (code) {
                //code를 정상적으로 받아올 경우
                try {
                    // code를 이용해서 token들을 받아옴
                    const resp = await axios.post("/api/oauth/token",
                    {
                        grant_type: "authorization_code",
                        code,
                    });

                    const {access_token, refresh_token} = resp.data;
                    localStorage.setItem("access_token") = access_token;
                    localStorage.setItem("refresh_token") = refresh_token;

                    // 사용자에 대한 정보를 보내주지 않기 때문에 한 번더 요청을 해서 받아와야 함
                    const profileResp = await axios.get(
                        process.env.NEXT_PUBLIC_OAUTH_USER_INFO_ENDPOINT,
                        {
                            headers: {
                                authorization: `Bearer ${access_token}`
                            },
                        }
                    );
                    const decodedProfile = jwtDecode(profileResp.data);
                    const profile = {"email": decodedProfile.email};

                    localStorage.setItem("profile") = profile;
                    setIsSignedIn(true);
                    setProfile(profile);

                    router.push("/");

                } catch (err) {
                    setError("server error")
                }
            }
        })
    }, [router])

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Loading....</div>
}