import React, { useState } from "react"
import Link from "next/link"

export default function Home() {
  const [id, setId] = useState("input");

  return (
    <>
    <div>hello, world</div>
    <Link href="/hello">go to hello page</Link><br/>
    <input type="text" onChange={(e) => setId(e.target.value)}/>
    <Link href={`/${id}`}>
      <button>go to {id} page</button>
    </Link>
    </>
  )
}
