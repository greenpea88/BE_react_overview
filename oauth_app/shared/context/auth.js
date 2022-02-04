import { createContext, useContext } from "react";

export const AuthContext = createContext({
    //적어놓은 default 값이 적용되는 것은 아니지만 사용을 편리하게 하기 위해서 작성
    isSignedIn: false,
    profile: null,
    setIsSignedIn: () => {},
    setProfile: () => {},
})

//auth context를 사용하기 위한 hook 생성
export const useAuth = () => useContext(AuthContext)