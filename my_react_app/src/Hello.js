import React, { useEffect } from 'react';

function Hello({name, setName}){
    useEffect(() => { 
    },[]);
    const sayHello = () => {
        setName(`Hello ${name}`)
    }
    return (<div>
        <div>Name = {name}</div>
        <button onClick={sayHello}>say Hello to {name}</button>
    </div>
    );
}

export default Hello;
