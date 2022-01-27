import Link from "next/link"
import { useAuth } from "../shared/contexts/auth"

const UpdateProfilePage = () => {
    const {profile, setProfile, setIsLoggedIn} = useAuth()

    const toggleProfile = () => {
        if (profile) {
            setProfile(null)
            setIsLoggedIn(false)
        } else {
            setProfile("Jhon")
            setIsLoggedIn(true)
        }
    }

    return (
        <div>
            <Link href={"/profile"}>
                <button>go to profile page</button>
            </Link>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
            <button onClick={toggleProfile}>click to toggle</button>
        </div>
    )
}

export default UpdateProfilePage