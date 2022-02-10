import axios from "axios"
import qs from "qs"

export default async (req, res) => {
    // token을 받아오기

    const {grant_type} = req.body

    if (grant_type === "password"){

        const OAUTH_TOKEN_ENDPOINT = process.env.NEXT_PUBLIC_OAUTH_PASSWORD_TOKEN_ENDPOINT
        const OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_OAUTH_PASSWORD_CLIENT_ID
        const OAUTH_CLIENT_SECRET = process.env.NEXT_PUBLIC_OAUTH_PASSWORD_CLIENT_SECRET
        const OAUTH_SCOPE = process.env.NEXT_PUBLIC_OAUTH_PASSWORD_SCOPE
        const {username, password} = req.body

        // basic 인증으로 보내기
        const basicHeader = Buffer.from(
            `${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`
        ).toString("base64")
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            Authorization: `Basic ${basicHeader}`
        }
        // oauth는 주로 form 방식으로 요청을 보냄 >> qs(queyr string)을 사용
        const resp = await axios.post(
            OAUTH_TOKEN_ENDPOINT,
            qs.stringify({
                grant_type,
                username,
                password,
                scope: OAUTH_SCOPE
            }),
            {
                headers
            }
        );

        res.status(200).json(resp.data)
    } else if (grant_type === "authorization_code") {
        const OAUTH_TOKEN_ENDPOINT = process.env.NEXT_PUBLIC_OAUTH_AUTH_TOKEN_ENDPOINT
        const OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_OAUTH_AUTH_CLIENT_ID
        const OAUTH_CLIENT_SECRET = process.env.NEXT_PUBLIC_OAUTH_AUTH_CLIENT_SECRET
        const OAUTH_REDIRECT_URI = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI
        const {code} = req.body;

        // basic 인증으로 보내기
        const basicHeader = Buffer.from(
            `${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`
        ).toString("base64")
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            Authorization: `Basic ${basicHeader}`
        }
        try {
            const resp = await axios.post(
                OAUTH_TOKEN_ENDPOINT,
                qs.stringify({
                    grant_type,
                    code,
                    redirect_uri: OAUTH_REDIRECT_URI
                }),
                {
                    headers
                }
            );
        
            res.status(200).json(resp.data);
        } catch (err){
            res.status(400).json({err});
        }
    } else if (grant_type === "refresh_token") {
        const {refresh_token} = req.body;
        const OAUTH_TOKEN_ENDPOINT = process.env.NEXT_PUBLIC_OAUTH_PASSWORD_TOKEN_ENDPOINT
        const OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_OAUTH_PASSWORD_CLIENT_ID
        const OAUTH_CLIENT_SECRET = process.env.NEXT_PUBLIC_OAUTH_PASSWORD_CLIENT_SECRET

        // basic 인증으로 보내기
        const basicHeader = Buffer.from(
            `${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`
        ).toString("base64")
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            Authorization: `Basic ${basicHeader}`
        };

        const resp = await axios.post(
            OAUTH_TOKEN_ENDPOINT,
            qs.stringify({
                grant_type,
                refresh_token,
            }),
            {
                headers
            }
        );
        res.status(200).json(resp.data);
    } else {
        res.status(400).json({});
    }

}