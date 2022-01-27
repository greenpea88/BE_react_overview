import React from "react";
import Link from "next/link";
import { useAuth } from "../shared/contexts/auth";

const ProfilePage = () => {
    const {profile, isLoggedIn} = useAuth()

    return (
        <div>
            <h1>profile</h1>
            <pre>{JSON.stringify({profile, isLoggedIn}, null, 2)}</pre>
            <Link href={"/profile/update"}>
                <button>go to profile page</button>
            </Link>
        </div>
    )

}

export default ProfilePage
