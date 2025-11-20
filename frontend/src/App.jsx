import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [chain, setChain] = useState([]);
  const [data, setData] = useState('');

  const getChain = async () => {
    const res = await axios.get('https://blockchain-simulator-pqg6.onrender.com/chain');
    setChain(res.data);
  }
  
  const createBlock = async () => {
    await axios.post('https://blockchain-simulator-pqg6.onrender.com/add', { data });
    setData('');
    getChain();
  }

  useEffect(() => {
    getChain();
  });

  return ( 
    <div>
      <h1>Blockchain</h1>
      <input value={data} onChange={(e) => setData(e.target.value)} placeholder='block data'></input>
      <button onClick={createBlock}>add</button>
      <h2>Chain</h2>
      {chain.map((block) => (
        <div key={block.hash}>
          <p>Index : {block.index}</p>
          <p>Data : {JSON.stringify(block.data)}</p>
          <p>Hash : {block.hash}</p>
          <p>Prev : {block.previousHash}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default App
