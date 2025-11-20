const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const Block = require('./Block');
const Blockchain = require('./Blockchain');
const app = express();
const chain = new Blockchain();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/chain', (req, res) => {
    res.json(chain.getChain());
});

app.post('/add', (req, res) => {
    const {data} = req.body;
    chain.createBlock(new Block(chain.chain.length, Date.now(), data));
    res.json(chain.getChain());
});

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => console.log(`backend on ${PORT}`));