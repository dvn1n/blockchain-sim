import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [chain, setChain] = useState([]);
  const [pendingTransaction, setPendingTransaction] = useState([]);
  const [senderData, setSenderData] = useState('');
  const [receiverData, setReceiverData] = useState('');
  const [data, setData] = useState('');

  const getChain = async () => {
    const res = await axios.get('https://blockchain-simulator-pqg6.onrender.com/chain');
    setChain(res.data);
  }
  
  const createBlock = async () => {
    await axios.post('https://blockchain-simulator-pqg6.onrender.com/add', { data });
    setPendingTransaction([]);
    getChain();
  }

  const createTransData = async () => {
    const tx = {sender: senderData, receiver: receiverData, data};
    const res = await axios.post('https://blockchain-simulator-pqg6.onrender.com/transData', tx);
    setSenderData('');
    setReceiverData('');
    setData('');
    setPendingTransaction(res.data);
  }

  useEffect(() => {
    getChain();
  }, [chain]);

  return ( 
    <div>
      <h1>Blockchain</h1>
      <h2>Add your transaction data</h2>
      <input value={senderData} onChange={(e) => setSenderData(e.target.value)} placeholder='sender'></input>
      <input value={receiverData} onChange={(e) => setReceiverData(e.target.value)} placeholder='receiver'></input>
      <input value={data} onChange={(e) => setData(e.target.value)} placeholder='data'></input>
      <button onClick={createTransData}>add transaction data</button>
      <h2>Transaction data</h2>
      {pendingTransaction.map((tx, idx) => (
        <div key={idx}>
          <p>Sender : {tx.sender}</p>
          <p>Receiver : {tx.receiver}</p>
          <p>Data : {tx.data}</p>
          <hr />
        </div>
      ))}
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
