import React, { useEffect, useState } from 'react';
import Hello from './Hello';

function App() {
  const [name, setName] = useState("Jhon");
  const setJane = () => {
    setName("Jane")
  }
  
  useEffect(() => {
    console.log("component mount")
  },[name]);

  return (
    <div>
      <div>{name}</div>
      <button onClick={setJane}>change to Jane</button>
      <Hello name={name} setName={setName}/>
    </div>
  );
}

export default App;

