import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


const Todo = () => {
    const router = useRouter();
    const {id: todoId} = router.query;
    // default 값을 null로 설정
    const [todo, setTodo] = useState(null);
    
    // await는 항상 async 내부에서만 사용이 가능함
    useEffect(async () => {
        //async await는 then을 사용하지 않는 문법!!
        const resp = await axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
        setTodo(resp.data)
    }, [todoId]);

    return (
        <>
            <pre>{JSON.stringify(todo, null, 2)}</pre>
            <hr/>
            <Link href={"/todos"}>back to todo list</Link>
        </>
    );
}

export default Todo;
