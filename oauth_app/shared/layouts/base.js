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
                    </>
                ) : (
                    <li>
                        <Link href={"/login"}>
                            <a>login</a>
                        </Link>
                    </li>
                )
            }
            </ul>
            {profile && <div>{profile.email}</div>}
            <hr/>
            <div>{children}</div>
        </div>
    )

}

export default BaseLayout