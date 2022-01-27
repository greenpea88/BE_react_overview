import Link from "next/link"

const BaseLayout = ({ children}) => {
    return (
        // 사용할 layout의 내용을 작성해주면 된다.
        <div>
            <ul>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href={"/profile"}>profile</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href={"/todos"}>todos</Link>
                </li>
            </ul>
            {children}
        </div>
    )
}

export default BaseLayout