const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block(0, Date.now(), {'sender':'unknown', 'receiver':'unknown','data':'unknown'}, "0")];
        this.pendingTransaction = [];
        this.diff = 5;
    }

    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransData(data) {
        this.pendingTransaction.push(data);
    }

    createBlock() {
        const block = new Block(this.chain.length, Date.now(), this.pendingTransaction);
        block.previousHash = this.getLastestBlock().hash;
        block.mineBlock(this.diff);
        this.chain.push(block);
        this.pendingTransaction = [];
    }

    getTransData() {
        return this.pendingTransaction;
    }

    getChain() {
        return this.chain;
    }
}

module.exports = Blockchain;