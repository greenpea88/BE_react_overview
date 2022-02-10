import React, { useEffect } from "react";
import qs from "querystring";

const AuthCodeLoginPage = () => {
    // authorization code를 받아오는 auth server로 보내는 역할을 수행함
    useEffect(() => {
        
        const OATUH_HOST = process.env.NEXT_PUBLIC_OAUTH_AUTHORIZATION_ENDPOINT;
        const client_id = process.env.NEXT_PUBLIC_OAUTH_AUTH_CLIENT_ID;
        // api의 callback 주소로 code를 받을 시 돌아옴
        const redirect_uri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI;
        const response_type = "code";
        const scope = process.env.NEXT_PUBLIC_OAUTH_AUTH_SCOPE;

        const AUTHORIZE_URI = `${OATUH_HOST}?${qs.stringify({
            client_id,
            redirect_uri,
            response_type,
            scope
        })}`; 
        
        // next.js api가 아닌 다른 page로 이동을 시킴 >> code를 받기 위한 auth server로의 이동
        // window -> client side에서만 실행되는 object = server side에는 window object가 존재하지 않음
        // window의 위치를 해당 URI로 보낸다~의 의미
        window.location.href = AUTHORIZE_URI;
    },[]);
    
    return <div>loading...</div>
};

export default AuthCodeLoginPage;