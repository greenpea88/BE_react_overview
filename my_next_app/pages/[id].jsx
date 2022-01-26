import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function indexId(){
    const router = useRouter();
    const {id: indexId} = router.query;

    return (
        <>
            <div>{indexId}</div>
            <Link href={("/")}>back to index page</Link>
        </>
    );
};
