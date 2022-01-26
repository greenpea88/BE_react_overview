import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function indexId(){
    // return (
    //     <>
    //         <div>this is id page</div>
    //         <Link href={("/")}>back to index page</Link>
    //     </>
    // );
    const router = useRouter();
    const {id: indexId} = router.query;

    return (
        <>
        {console.log('hello', router)}
            <div>{indexId}</div>
            <Link href={("/")}>back to index page</Link>
        </>
    );
};
