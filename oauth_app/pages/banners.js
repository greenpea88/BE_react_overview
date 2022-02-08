import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const BannerListPage = () => {
    const [banners, setBanners] = useState([])

    useEffect(() => {
        //useEffect에서는 async-await 구문을 사용할 수 없기 때문에 내부에서 async-await 함수를 만들어 사용하거나 promiss를 사용하도록 함
        const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT
        axios.get(`${API_ENDPOINT}/showroom/v1/banners`)
        .then((resp) => setBanners(resp.data))
    },[])

    return (
        <div>
            {banners.map((banner) => 
                <pre>{JSON.stringify(banner, null, 2)}</pre>
            )}
        </div>
    )
}

export default BannerListPage
