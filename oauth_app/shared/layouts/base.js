import Link from "next/link"
import React from "react"
import { useAuth } from "../context/auth"

const BaseLayout = ({children}) => {
    const {isSignedIn, profile} = useAuth()

    return (
        <div>
            <ul>
                {isSignedIn ? (
                    <>
                        <li>
                            <Link href={"/logout"}>
                                <a>logout</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/banners"}>
                                <a>banner list</a>
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                         <li>
                             <Link href={"/login_password"}>
                                 <a>login (w/ password grant)</a>
                             </Link>
                         </li>
                         <li>
                             <Link href={"/login_auth_code"}>
                                 <a>login (w/ authorization code grant)</a>
                             </Link>
                         </li>
                    </>
                )
            }
            </ul>
            {profile && <div> email : {profile.email}</div>}
            <hr/>
            <div>{children}</div>
        </div>
    )

}

export default BaseLayout