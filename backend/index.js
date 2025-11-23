const express = require('express');
const path = require('path');
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
    chain.createBlock();
    res.json(chain.getChain());
});

app.post('/transData', (req, res) => {
    const tx = req.body;
    chain.createTransData(tx);
    res.json(chain.getTransData());
})

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`backend on ${PORT}`));