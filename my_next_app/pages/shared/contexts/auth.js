import { createContext, useContext } from "react";

export const AuthContext = createContext({
    // 기본값을 넣어둠 -> 적지 않아도 상관은 없다.
    isLoggedIn: false,
    profile: null,
    setIsLoggedIn: () => {},
    setProfile: () => {}
})

export const useAuth = () => useContext(AuthContext)