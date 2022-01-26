import React from "react";
import Link from "next/link";

const HelloPage = () => {
    return(
        <React.Fragment>
            <div>this is hello page</div>
            <Link href={"/"}>go to index page</Link>
        </React.Fragment>
    );
};

export default HelloPage;