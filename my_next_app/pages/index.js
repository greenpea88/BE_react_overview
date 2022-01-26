import React from "react"
import Link from "next/link"

export default function Home() {
  return (
    <>
    <div>hello, world</div>
    <Link href="/hello">go to hello page</Link>
    </>
  )
}
