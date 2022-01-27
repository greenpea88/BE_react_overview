import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";

const TodoPage = () => {
    const getTodos = async () => {
        const resp = await axios.get("/api/todos")
        return resp.data
    }


    // query 요청 값으로부터 isLoaing과 data 값을 가져온다
    // useQuery의 첫번째 값 : param 
    const query = useQuery("todos", getTodos)

    return <pre>{JSON.stringify(query, null, 2)}</pre>

    // return (
    //     <>
    //         <h1>Todo List</h1>
    //         {isLoading? "loading...." : data.map((todo) => (
    //             <div>
    //                 <h3>
    //                     <Link href={`todos/${todo.id}`}>
    //                         <a><small>#{todo.id}</small> {todo.title}</a>
    //                     </Link>
    //                 </h3>
    //             </div>
    //         ))}
    //     </>
    // )
}

export default TodoPage

