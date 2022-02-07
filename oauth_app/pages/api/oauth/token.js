import axios from "axios"
import qs from "qs"

export default async (req, res) => {
    const {username, password} = req.body
    const OAUTH_TOKEN_ENDPOINT = process.env.NEXT_PUBLIC_OAUTH_TOKEN_ENDPOINT
    const OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID
    const OAUTH_CLIENT_SECRET = process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET
    const OAUTH_SCOPE = process.env.NEXT_PUBLIC_OAUTH_SCOPE

    // basic 인증으로 보내기
    const encode = Buffer.from(
        `${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`
    ).toString("base64")
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Authorization: `Basic ${encode}`
    }

    // oauth는 주로 form 방식으로 요청을 보냄 >> qs(queyr string)을 사용
    const resp = await axios.post(
        OAUTH_TOKEN_ENDPOINT,
        qs.stringify({
            grant_type: "password",
            username,
            password,
            scope: OAUTH_SCOPE
        }),
        {
            headers
        }
    )

    res.status(200).json(resp.data)
}