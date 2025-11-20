const express = require('express');
const cors = require('cors');

const Block = require('./Block');
const Blockchain = require('./Blockchain');

const app = express();
app.use(express.json());
app.use(cors());

const chain = new Blockchain();

app.get('/chain', (req, res) => {
    res.json(chain.getChain());
});

app.post('/add', (req, res) => {
    const {data} = req.body;
    chain.createBlock(new Block(chain.chain.length, Date.now(), data));
    res.json(chain.getChain());
});

app.listen(3000, () => console.log('backend on 3000'));