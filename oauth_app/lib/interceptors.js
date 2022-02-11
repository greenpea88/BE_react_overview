import axios from "axios";

if (typeof window !== "undefined") {
    // axios로 요청을 보내기 전 intercept
    axios.interceptors.request.use((cfg) => {
        if (cfg.url.startsWith(window.API_ENDPOINT)) {
            // request를 보낼 때 access token을 자동으로 붙이도록 함
            cfg.headers.authorization = `Bearer ${localStorage.getItem("access_token")}`;
        }

        return cfg;
    });


    // axios로부터 response를 받아 처리하기 전에 intercept
    axios.interceptors.response.use(
        (response) => {
            return response;
    }, (error) => {
        // res에서 error가 발생했을 경우 catch로 넘어가기 전에 처리하는 부분
        let errResponseStatus = null;
        const originalRequest = error.config;

        try {
            errResponseStatus = error.response.status;
        } catch (e){

        }

        if ((error.message === "Network Error" || errResponseStatus === 401) && !originalRequest.retry) {
            originalRequest.retry = true;
            const preRefreshToken = localStorage.getItem("refresh_token");
            if (preRefreshToken) {
                 return axios.post(
                     "/api/oauth/token",
                     {
                         grant_type: "refresh_token",
                         refresh_token: preRefreshToken
                     }).then((res) => {
                         console.log("res")
                         console.log(res.data);
                         const {access_token, refresh_token} = res.data;
                         localStorage.setItem("access_token", access_token);
                         localStorage.setItem("refresh_token", refresh_token);

                         originalRequest.headers.authorization = `Bearer ${access_token}`;
                         return axios(originalRequest);
                     }).catch(() => {
                         localStorage.removeItem("access_token");
                         localStorage.removeItem("refresh_token");
                         localStorage.removeItem("profile");
                         window.location.href = "/";

                         return false;
                     });
            }
            // 오류 발생 시 오류 내용 출력 후 요청 거절
            return Promise.reject(error);
        }
        // 오류 발생 시 오류 내용 출력 후 요청 거절
        return Promise.reject(error);
    });
}