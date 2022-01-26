import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const TodoPage = () => {
    // todo list를 받아서 todos에 저장
    const [todos, setTodos] = useState([])
    useEffect( async () => {
        const resp = await axios.get("https://jsonplaceholder.typicode.com/todos");
        setTodos(resp.data);
    },[]);
    return (
        <>
            <h1>Todos</h1>
            {todos.map((todo) => (
                <div>
                    <h3>
                        <Link href={`/todos/${todo.id}`}>
                            <a>
                                <small>#{todo.id} </small> {todo.title}
                            </a>
                        </Link>
                    </h3>
                    <p>userId: {todo.userId}</p>
                    <p>{todo.completed ? "completed" : "not completed yet"}</p>
                </div>
            ))}
        </>
    );
};

export default TodoPage;
